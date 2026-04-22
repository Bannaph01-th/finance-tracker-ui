import { Component, OnInit } from '@angular/core';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke,
  ApexLegend,
  ApexYAxis,
  ApexGrid,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';
import { FormsModule } from '@angular/forms';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';

import { TransactionService } from '../../shared/services/api/transactions.service';
import { CategoryService } from '../../shared/services/api/category.service';
import { Category } from '../../shared/services/interfaces/category.interface';
import { Transaction } from '../../shared/services/interfaces/transaction.interface';
import { DatePipe, DecimalPipe } from '@angular/common';
import { UserService } from '../../shared/services/api/user.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    FormsModule,
    NgApexchartsModule,
    ModalComponent,
    PageBreadcrumbComponent,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private userService: UserService
  ) {}

  isOpen = false;
  loading = false;

  userProfile: any = null;
  savingLimit = false;

  modalType: 'plan' | 'finance-use' | 'list' | 'frog' = 'plan';

  financeLimit = 0;

  categories: Category[] = [];
  transactions: Transaction[] = [];

  form = {
    transactions_id: '',
    user_id: '',
    category_id: '',
    amount: 0,
    note: '',
    transaction_date: ''
  };

  async ngOnInit(): Promise<void> {
    this.resetForm();

    await Promise.all([
      this.loadCategories(),
      this.loadTransactions(),
      this.loadProfile()
    ]);
  }

  get incomeCategories() {
    return this.categories.filter((item) => item.type_id === 1);
  }

  get expenseCategories() {
    return this.categories.filter((item) => item.type_id === 2);
  }

  async loadCategories(): Promise<void> {
    const res = await this.categoryService.getAllCategory();
    this.categories = res?.resultData?.categories ?? [];
  }

  async loadTransactions(): Promise<void> {
    const res = await this.transactionService.loadTransactions();
    this.transactions = res?.resultData.transactions ?? [];
  }

  async loadProfile(): Promise<void> {
    const res = await this.userService.getUserProfile();

    this.userProfile = res?.resultData ?? null;

    this.financeLimit = Number(this.userProfile?.money_limit || 0);
  }

  async saveFinanceLimit(): Promise<void> {
    if (!this.userProfile?.user_id) return;

    this.savingLimit = true;

    const res = await this.userService.patchUserProfile(
      this.userProfile.user_id,
      {
        money_limit: Number(this.financeLimit)
      }
    );

    this.savingLimit = false;

    if (res) {
      await this.loadProfile();
      this.closeModal();
    }
  }

  openModal(type: 'plan' | 'finance-use' | 'list' | 'frog'): void {
    this.modalType = type;
    this.isOpen = true;

    if (type === 'finance-use') {
      this.resetForm();
    }
  }

  closeModal(): void {
    this.isOpen = false;
  }

  async submitTransaction(): Promise<void> {
    if (!this.form.category_id) return;
    if (!this.form.amount || this.form.amount <= 0) return;

    this.loading = true;

    const payload = {
      transactions_id: this.form.transactions_id,
      user_id: this.form.user_id,
      category_id: this.form.category_id,
      amount: Number(this.form.amount),
      note: this.form.note,
      transaction_date: this.form.transaction_date
    };

    const res = await this.transactionService.createTransaction(payload);

    this.loading = false;

    if (res) {
      await this.loadTransactions();
      this.closeModal();
    }
  }

  async deleteTransaction(id: string): Promise<void> {
    await this.transactionService.deleteTransaction(id);
    await this.loadTransactions();
  }

  resetForm(): void {
    this.form = {
      transactions_id: crypto.randomUUID(),
      user_id: '',
      category_id: '',
      amount: 0,
      note: '',
      transaction_date: this.today()
    };
  }

  today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get totalIncome(): number {
    return this.transactions
      .filter((item: any) => item.type === 'income')
      .reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter((item: any) => item.type === 'expense')
      .reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);
  }

  get balance(): number {
    return this.totalIncome - this.totalExpense;
  }

  get sortedTransactions() {
    return [...this.transactions].sort(
      (a: any, b: any) =>
        new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime()
    );
  }

  get latestTransactions() {
    return this.sortedTransactions.slice(0, 2);
  }

  get latestFiveTransactions() {
    return this.sortedTransactions.slice(0, 5);
  }

  formatMoney(value: number): string {
    return value.toLocaleString('th-TH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  public series: ApexAxisChartSeries = [
    {
      name: 'รายรับ',
      data: [18000, 22000, 19500, 25000, 21000, 24000, 26000, 23000, 24500, 27000, 25500, 29000]
    },
    {
      name: 'รายจ่าย',
      data: [12000, 15000, 14000, 18000, 16000, 17000, 19000, 16500, 17500, 20000, 18500, 21000]
    }
  ];

  public chart: ApexChart = {
    type: 'bar',
    height: 320,
    toolbar: {
      show: false
    },
    fontFamily: 'Outfit, sans-serif'
  };

  public xaxis: ApexXAxis = {
    categories: [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  };

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '75%',
      borderRadius: 3,
      borderRadiusApplication: 'end'
    }
  };

  public dataLabels: ApexDataLabels = {
    enabled: false
  };

  public stroke: ApexStroke = {
    show: true,
    width: 2,
    colors: ['transparent']
  };

  public legend: ApexLegend = {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontSize: '14px'
  };

  public yaxis: ApexYAxis = {
    labels: {
      formatter: (val) => `฿${val.toLocaleString()}`
    }
  };

  public grid: ApexGrid = {
    borderColor: '#e5e7eb',
    strokeDashArray: 4
  };

  public fill: ApexFill = {
    opacity: 1
  };

  public tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => `฿${val.toLocaleString()}`
    }
  };

  public colors: string[] = [
    '#22c55e',
    '#ef4444'
  ];
}