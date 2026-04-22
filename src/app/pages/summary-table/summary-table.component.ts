import { Component, ViewChild, OnInit } from '@angular/core';
// import { ComponentCardComponent } from '../../shared/components/common/component-card/component-card.component';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { FinanceTableComponent } from '../../shared/components/tables/finance-table/finance-table.component';
import { LabelComponent } from '../../shared/components/form/label/label.component';
import { InputFieldComponent } from '../../shared/components/form/input/input-field.component';
import { SelectComponent } from '../../shared/components/form/select/select.component';
import { DatePickerComponent } from '../../shared/components/form/date-picker/date-picker.component';
import { TimePickerComponent } from '../../shared/components/form/time-picker/time-picker.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { Category } from '../../shared/services/interfaces/category.interface';
import { CategoryService } from '../../shared/services/api/category.service';
import { TransactionService } from '../../shared/services/api/transactions.service';
import { Transaction } from '../../shared/services/interfaces/transaction.interface';
import { UserService } from '../../shared/services/api/user.service';
import { DashboardService } from '../../shared/services/api/dashboard.service';

@Component({
  selector: 'app-summary-table-page',
  imports: [
    // ComponentCardComponent,
    FormsModule,
    PageBreadcrumbComponent,
    FinanceTableComponent,
    ModalComponent,
    // LabelComponent,
    // InputFieldComponent,
    // SelectComponent,
    // DatePickerComponent,
    // TimePickerComponent
  ],
  templateUrl: './summary-table.component.html',
  styles: ``
})
export class SummaryTableComponent implements OnInit {

  @ViewChild('financeTable')
  financeTable!: FinanceTableComponent;

  showPassword = false;
  isOpen = false;

  loading = false;

  options = [
    { value: 'marketing', label: 'Marketing' },
    { value: 'template', label: 'Template' },
    { value: 'development', label: 'Development' },
  ];
  selectedOption = '';
  dateValue: any;
  timeValue = '';
  cardNumber = '';

  categories: Category[] = [];
  transactions: Transaction[] = [];

  userProfile: any = null;
  savingLimit = false;
  financeLimit = 0;

  form = {
    transactions_id: '',
    user_id: '',
    category_id: '',
    amount: 0,
    note: '',
    transaction_date: ''
  };

  dashboardSummary: any = {
    balance: 0,
    money_limit: 0,
    income_this_month: 0,
    expense_this_month: 0,
    months: [],
    monthly_summary: []
  };

  constructor(
    private categoryService: CategoryService,
    private transactionService: TransactionService,
    private userService: UserService,
    private dashboardService: DashboardService
  ) {}

  async ngOnInit(): Promise<void> {
    this.resetForm();

    await Promise.all([
      this.loadCategories(),
      this.loadTransactions(),
      this.loadProfile(),
      this.loadDashboardSummary()
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

  async loadDashboardSummary(): Promise<void> {
    const res = await this.dashboardService.loadDashboardFinanceSummary();

    const data =
      res?.resultData ??
      res?.data ??
      {};

    this.dashboardSummary = data;

    this.financeLimit = Number(data.money_limit || 0);
  }

  async submitTransaction(): Promise<void> {
    if (!this.form.category_id) return;
    if (!this.form.amount || this.form.amount <= 0) return;

    const amount = Number(this.form.amount);

    const category = this.categories.find(
      (item: any) => item.category_id === this.form.category_id
    );

    const typeId = Number(category?.type_id);

    if (typeId === 2 && this.financeLimit > 0) {
      const nextExpense =
        Number(this.dashboardSummary.expense_this_month || 0) + amount;

      if (nextExpense > this.financeLimit) {
        alert('รายจ่ายรายการนี้เกินวงเงินที่ตั้งไว้');
        return;
      }

      if (nextExpense >= this.financeLimit * 0.9) {
        alert('คำเตือน: รายจ่ายใกล้เต็มวงเงินแล้ว');
      }
    }

    if (typeId === 1 && this.financeLimit > 0) {
      if (amount > this.financeLimit * 3) {
        alert('รายรับรายการนี้สูงผิดปกติ กรุณาตรวจสอบจำนวนเงิน');
        return;
      }
    }

    this.loading = true;

    const payload = {
      transactions_id: this.form.transactions_id,
      user_id: this.form.user_id,
      category_id: this.form.category_id,
      amount,
      note: this.form.note,
      transaction_date: this.form.transaction_date
    };

    const res = await this.transactionService.createTransaction(payload);

    this.loading = false;

    if (res) {
      await Promise.all([
        this.loadTransactions(),
        this.loadDashboardSummary()
      ]);

      this.closeModal();

      await this.financeTable.loadTransactions();
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

  handleSelectChange(value: string) {
    this.selectedOption = value;
    console.log('Selected value:', value);
  }

  handleDateChange(event: any) {
    this.dateValue = event;
    console.log('Date changed:', event);
  }

  handleTimeChange(event: any) {
    this.timeValue = event.target.value;
    console.log(this.timeValue);
  }

  onTimeSelected(time: string) {
    console.log('Picked time:', time); // e.g. "10:45"
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
