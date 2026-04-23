import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../services/api/transactions.service';
import { MonthPickerComponent } from '../../form/month-picker/month-picker.component';
import { ModalComponent } from '../../ui/modal/modal.component';

@Component({
  selector: 'app-finance-table',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    ModalComponent,
    MonthPickerComponent,
  ],
  templateUrl: './finance-table.component.html',
})
export class FinanceTableComponent {

  constructor(
    private transactionService: TransactionService
  ) {}

  @Output() openModal = new EventEmitter<void>();

  isOpenDelete = false;
  deleteRows: any[] = [];
  deleting = false;

  selectedMonth = this.getCurrentMonth();

  transactions: any[] = [];
  groupedRows: any[] = [];

  incomeCategories: string[] = [];
  expenseCategories: string[] = [];

  async ngOnInit(): Promise<void> {
    await this.loadTransactions();
  }

  get totalIncomeAll(): number {
    return this.transactions
      .filter((x: any) => x.category_info?.type === 'income')
      .reduce((sum: number, x: any) => sum + Number(x.amount || 0), 0);
  }

  get totalExpenseAll(): number {
    return this.transactions
      .filter((x: any) => x.category_info?.type === 'expense')
      .reduce((sum: number, x: any) => sum + Number(x.amount || 0), 0);
  }

  get netTotal(): number {
    return this.totalIncomeAll - this.totalExpenseAll;
  }

  get absNetTotal(): number {
    return Math.abs(this.netTotal);
  }

  async handleMonthChange(event: {
    selectedDates: Date[];
    dateStr: string;
    instance: any;
  }) {
    this.selectedMonth = event.dateStr;
    console.log('YYYY-MM:', this.selectedMonth);
    
    await this.loadTransactions();
  }

  async loadTransactions(): Promise<void> {
    const res = await this.transactionService.loadTransactions({
      year_month: this.selectedMonth
    });

    this.transactions =
      res?.resultData?.transactions ??
      [];

    this.buildTable();
  }

  buildTable(): void {
    this.incomeCategories = [
      ...new Set(
        this.transactions
          .filter((x: any) => x.category_info?.type === 'income')
          .map((x: any) => x.category_info?.name)
      )
    ];

    this.expenseCategories = [
      ...new Set(
        this.transactions
          .filter((x: any) => x.category_info?.type === 'expense')
          .map((x: any) => x.category_info?.name)
      )
    ];

    const map = new Map<string, any>();

    for (const item of this.transactions) {
      const date = this.formatDate(item.transaction_date);

      if (!map.has(date)) {
        map.set(date, {
          date,
          rows: []
        });
      }

      const row = map.get(date);

      row.rows.push({
        note: item.note || '-',
        category: item.category_info?.name || '-',
        type: item.category_info?.type,
        amount: Number(item.amount || 0),
        transaction_id: item.transaction_id
      });
    }

    this.groupedRows = Array.from(map.values()).sort(
      (a: any, b: any) =>
        this.parseDate(a.date).getTime() -
        this.parseDate(b.date).getTime()
    );
  }

  parseDate(value: string): Date {
    const [day, month, year] = value.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  getTotalIncome(category: string): number {
    return this.transactions
      .filter(
        (x: any) =>
          x.category_info?.type === 'income' &&
          x.category_info?.name === category
      )
      .reduce((sum: number, x: any) => sum + Number(x.amount || 0), 0);
  }

  getTotalExpense(category: string): number {
    return this.transactions
      .filter(
        (x: any) =>
          x.category_info?.type === 'expense' &&
          x.category_info?.name === category
      )
      .reduce((sum: number, x: any) => sum + Number(x.amount || 0), 0);
  }

  openModalEmit(): void {
    this.openModal.emit();
  }

  getCurrentMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  }

  formatDate(date: string): string {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }

  openDeleteModal(group: any): void {
    this.deleteRows = [...group.rows].map((x: any) => ({
      transaction_id: x.transaction_id,
      amount: x.amount,
      note: x.note,
      transaction_date: this.toISODate(group.date),
      category_info: {
        name: x.category,
        type: x.type
      }
    }));

    this.isOpenDelete = true;
  }

  toISODate(date: string): string {
    const [day, month, year] = date.split('/');

    return `${year}-${month}-${day}`;
  }

  closeDeleteModal(): void {
    this.isOpenDelete = false;
    this.deleteRows = [];
  }

  async deleteTransaction(item: any): Promise<void> {
    const ok = confirm(
      `ต้องการลบรายการ ${item.category_info?.name} (${item.note || '-'}) จำนวน ${Number(item.amount).toLocaleString()} บาท ใช่ไหม`
    );

    if (!ok) return;

    this.deleting = true;

    await this.transactionService.deleteTransaction(
      item.transaction_id
    );

    this.deleting = false;

    this.closeDeleteModal();

    await this.loadTransactions();
  }

}