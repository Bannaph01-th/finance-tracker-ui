import { Component, OnInit } from "@angular/core";
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
  ApexTooltip,
} from "ng-apexcharts";
import { FormsModule } from "@angular/forms";
import { PageBreadcrumbComponent } from "../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { ModalComponent } from "../../shared/components/ui/modal/modal.component";

import { TransactionService } from "../../shared/services/api/transactions.service";
import { CategoryService } from "../../shared/services/api/category.service";
import { Category } from "../../shared/services/interfaces/category.interface";
import { Transaction } from "../../shared/services/interfaces/transaction.interface";
import { DatePipe, DecimalPipe } from "@angular/common";
import { UserService } from "../../shared/services/api/user.service";
import { DashboardService } from "../../shared/services/api/dashboard.service";
import { AgentMessageState } from "../../shared/services/api/common/agent-history-stage-service";
import { AgentMessageService } from "../../shared/services/api/agent.service";

@Component({
  selector: "app-home-page",
  standalone: true,
  imports: [
    FormsModule,
    NgApexchartsModule,
    ModalComponent,
    PageBreadcrumbComponent,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: "./home-page.component.html",
})
export class HomePageComponent implements OnInit {
  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService,
    private userService: UserService,
    private dashboardService: DashboardService,
    private agentState: AgentMessageState,
    private agentService: AgentMessageService,
  ) {}

  isOpen = false;
  loading = false;

  userProfile: any = null;
  savingLimit = false;

  modalType:
    | 'plan'
    | 'finance-use'
    | 'list'
    | 'frog'
    | 'frog-log'
    | 'frog-detail' = 'plan';

  agentLogs: any[] = [];
  selectedAgentLog: any = null;
  loadingLogs = false;

  financeLimit = 0;

  categories: Category[] = [];
  transactions: Transaction[] = [];

  agentPending = false;
  agentText = "";

  form = {
    transactions_id: "",
    user_id: "",
    category_id: "",
    amount: 0,
    note: "",
    transaction_date: "",
  };

  dashboardSummary: any = {
    balance: 0,
    money_limit: 0,
    income_this_month: 0,
    expense_this_month: 0,
    months: [],
    monthly_summary: [],
  };

  async ngOnInit(): Promise<void> {
    this.resetForm();

    this.agentState.agent$.subscribe((res) => {
      this.agentText = res?.message ?? "";
    });

    await Promise.all([
      this.loadCategories(),
      this.loadTransactions(),
      this.loadProfile(),
      this.loadDashboardSummary(),
    ]);
  }

  async suggestAi() {
    this.agentPending = true;
    this.agentText = "";

    try {
      const res = await this.agentService.getMessage();

      if (res?.resultData?.message) {
        this.agentText = res.resultData.message;
      } else {
        this.agentText = `
        <div class="text-center text-red-500 font-medium">
          🐸 กบไม่สบาย พูดไม่ออกแล้ว...
        </div>
      `;
      }
    } catch (e) {
      this.agentText = `
      <div class="text-center text-red-500 font-medium">
        🐸 ระบบขัดข้องชั่วคราว
      </div>
    `;
      console.log(e);
    } finally {
      this.agentPending = false;
    }
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

    const data = res?.resultData ?? res?.data ?? {};

    this.dashboardSummary = data;

    this.financeLimit = Number(data.money_limit || 0);

    this.series = data.monthly_summary ?? [];

    this.xaxis = {
      ...this.xaxis,
      categories: data.months ?? [],
    };
  }

  async loadAgentLogs(): Promise<void> {
    this.loadingLogs = true;

    const res = await this.agentService.getLogs();

    this.agentLogs =
      res?.resultData?.logs ??
      [];

    this.loadingLogs = false;
  }

  viewAgentLog(item: any): void {
    this.selectedAgentLog = item;
    this.modalType = 'frog-detail';
  }

  async saveFinanceLimit(): Promise<void> {
    if (!this.userProfile?.user_id) return;

    this.savingLimit = true;

    const res = await this.userService.patchUserProfile(
      this.userProfile.user_id,
      {
        money_limit: Number(this.financeLimit),
      },
    );

    this.savingLimit = false;

    if (res) {
      await this.loadProfile();
      this.closeModal();
    }
  }

  async openModal(
    type:
      | 'plan'
      | 'finance-use'
      | 'list'
      | 'frog'
      | 'frog-log'
      | 'frog-detail'
  ): Promise<void> {
    this.modalType = type;
    this.isOpen = true;

    if (type === 'frog-log') {
      await this.loadAgentLogs();
    }
  }

  closeModal(): void {
    this.isOpen = false;
  }

  async submitTransaction(): Promise<void> {
    if (!this.form.category_id) return;
    if (!this.form.amount || this.form.amount <= 0) return;

    const amount = Number(this.form.amount);

    const category = this.categories.find(
      (item: any) => item.category_id === this.form.category_id,
    );

    const typeId = Number(category?.type_id);

    if (typeId === 2 && this.financeLimit > 0) {
      const nextExpense =
        Number(this.dashboardSummary.expense_this_month || 0) + amount;

      if (nextExpense > this.financeLimit) {
        alert("รายจ่ายรายการนี้เกินวงเงินที่ตั้งไว้");
        return;
      }

      if (nextExpense >= this.financeLimit * 0.9) {
        alert("คำเตือน: รายจ่ายใกล้เต็มวงเงินแล้ว");
      }
    }

    if (typeId === 1 && this.financeLimit > 0) {
      if (amount > this.financeLimit * 3) {
        alert("รายรับรายการนี้สูงผิดปกติ กรุณาตรวจสอบจำนวนเงิน");
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
      transaction_date: this.form.transaction_date,
    };

    const res = await this.transactionService.createTransaction(payload);

    this.loading = false;

    if (res) {
      await Promise.all([this.loadTransactions(), this.loadDashboardSummary()]);

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
      user_id: "",
      category_id: "",
      amount: 0,
      note: "",
      transaction_date: this.today(),
    };
  }

  today(): string {
    return new Date().toISOString().split("T")[0];
  }

  get totalIncome(): number {
    return this.transactions
      .filter((item: any) => item.type === "income")
      .reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter((item: any) => item.type === "expense")
      .reduce((sum: number, item: any) => sum + Number(item.amount || 0), 0);
  }

  get balance(): number {
    return this.totalIncome - this.totalExpense;
  }

  get sortedTransactions() {
    return [...this.transactions].sort(
      (a: any, b: any) =>
        new Date(b.transaction_date).getTime() -
        new Date(a.transaction_date).getTime(),
    );
  }

  get latestTransactions() {
    return this.sortedTransactions.slice(0, 2);
  }

  get latestFiveTransactions() {
    return this.sortedTransactions.slice(0, 5);
  }

  formatMoney(value: number): string {
    return value.toLocaleString("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  public series: ApexAxisChartSeries = [
    {
      name: 'รายรับ',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    {
      name: 'รายจ่าย',
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];

  public chart: ApexChart = {
    type: "bar",
    height: 320,
    toolbar: {
      show: false,
    },
    fontFamily: "Outfit, sans-serif",
  };

  public xaxis: ApexXAxis = {
    categories: [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  };

  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: "75%",
      borderRadius: 3,
      borderRadiusApplication: "end",
    },
  };

  public dataLabels: ApexDataLabels = {
    enabled: false,
  };

  public stroke: ApexStroke = {
    show: true,
    width: 2,
    colors: ["transparent"],
  };

  public legend: ApexLegend = {
    show: true,
    position: "top",
    horizontalAlign: "left",
    fontSize: "14px",
  };

  public yaxis: ApexYAxis = {
    labels: {
      formatter: (val) => `฿${val.toLocaleString()}`,
    },
  };

  public grid: ApexGrid = {
    borderColor: "#e5e7eb",
    strokeDashArray: 4,
  };

  public fill: ApexFill = {
    opacity: 1,
  };

  public tooltip: ApexTooltip = {
    y: {
      formatter: (val: number) => `฿${val.toLocaleString()}`,
    },
  };

  public colors: string[] = ["#22c55e", "#ef4444"];
}
