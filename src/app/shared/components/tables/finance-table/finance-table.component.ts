import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../services/api/transactions.service';
import { MonthPickerComponent } from '../../form/month-picker/month-picker.component';
import { TableDropdownComponent } from '../../common/table-dropdown/table-dropdown.component';

@Component({
  selector: 'app-finance-table',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    MonthPickerComponent,
    TableDropdownComponent
  ],
  templateUrl: './finance-table.component.html',
})
export class FinanceTableComponent {

  constructor(
    private transactionService: TransactionService
  ) {}

  @Output() openModal = new EventEmitter<void>();

  selectedMonth = this.getCurrentMonth();

  transactions: any[] = [];
  groupedRows: any[] = [];

  incomeCategories: string[] = [];
  expenseCategories: string[] = [];

  async ngOnInit(): Promise<void> {
    await this.loadTransactions();
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
          notes: [],
          incomeMap: {},
          expenseMap: {}
        });
      }

      const row = map.get(date);
      const cat = item.category_info?.name || '-';
      const type = item.category_info?.type;
      const amount = Number(item.amount || 0);

      row.notes.push(item.note || '-');

      if (type === 'income') {
        row.incomeMap[cat] ??= [];
        row.incomeMap[cat].push(amount);
      } else {
        row.expenseMap[cat] ??= [];
        row.expenseMap[cat].push(amount);
      }
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

}