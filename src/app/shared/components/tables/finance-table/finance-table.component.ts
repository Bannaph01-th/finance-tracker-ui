import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
// import { TableDropdownComponent } from '../../common/table-dropdown/table-dropdown.component';
// import { BadgeComponent } from '../../ui/badge/badge.component';
// import { DatePickerComponent } from '../../form/date-picker/date-picker.component';
import { MonthPickerComponent } from '../../form/month-picker/month-picker.component';

interface Transaction {
  image: string;
  action: string;
  date: string;
  amount: string;
  category: string;
  status: "Success" | "Pending" | "Failed";
}

@Component({
  selector: 'app-finance-table',
  imports: [
    CommonModule,
    MonthPickerComponent,
    // TableDropdownComponent,
    // BadgeComponent,
  ],
  templateUrl: './finance-table.component.html',
  styles: ``
})
export class FinanceTableComponent {

  // Type definition for the transaction data

  @Output() openModal = new EventEmitter<void>();

  selectedMonth = this.getCurrentYearMonth();

  transactionData: Transaction[] = [
    {
      image: "/images/brand/brand-08.svg", // Path or URL for the image
      action: "Bought PYPL", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-07.svg", // Path or URL for the image
      action: "Bought AAPL", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Pending",
    },
    {
      image: "/images/brand/brand-15.svg", // Path or URL for the image
      action: "Sell KKST", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-02.svg", // Path or URL for the image
      action: "Bought FB", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-10.svg", // Path or URL for the image
      action: "Sell AMZN", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Failed",
    },
    {
      image: "/images/brand/brand-08.svg", // Path or URL for the image
      action: "Bought PYPL", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-07.svg", // Path or URL for the image
      action: "Bought AAPL", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Pending",
    },
    {
      image: "/images/brand/brand-15.svg", // Path or URL for the image
      action: "Sell KKST", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-02.svg", // Path or URL for the image
      action: "Bought FB", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-10.svg", // Path or URL for the image
      action: "Sell AMZN", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Failed",
    },
    {
      image: "/images/brand/brand-08.svg", // Path or URL for the image
      action: "Bought PYPL", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-07.svg", // Path or URL for the image
      action: "Bought AAPL", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Pending",
    },
    {
      image: "/images/brand/brand-15.svg", // Path or URL for the image
      action: "Sell KKST", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-02.svg", // Path or URL for the image
      action: "Bought FB", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Success",
    },
    {
      image: "/images/brand/brand-10.svg", // Path or URL for the image
      action: "Sell AMZN", // Action description
      date: "Nov 23, 01:00 PM", // Date and time of the transaction
      amount: "$2,567.88", // Transaction amount
      category: "Finance", // Category of the transaction
      status: "Failed",
    },
  ]

  currentPage = 1;
  itemsPerPage = 5;

  get totalPages(): number {
    return Math.ceil(this.transactionData.length / this.itemsPerPage);
  }

  get currentItems(): Transaction[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.transactionData.slice(start, start + this.itemsPerPage);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleViewMore(item: Transaction) {
    // logic here
    console.log('View More:', item);
  }

  handleDelete(item: Transaction) {
    // logic here
    console.log('Delete:', item);
  }

  getBadgeColor(status: string): 'success' | 'warning' | 'error' {
    if (status === 'Success') return 'success';
    if (status === 'Pending') return 'warning';
    return 'error';
  }

  transactions: any[] = [];

  incomeCategories: string[] = [];
  expenseCategories: string[] = [];

  groupedRows: any[] = [];

  ngOnInit(): void {
    this.loadMockData();
    this.buildTable();
  }

  loadMockData() {
    // mock from backend join result
    this.transactions = [
      {
        transaction_date: '2024-01-05T00:00:00Z',
        amount: 3000,
        note: '',
        category_info: {
          name: 'ค่าใช้จ่ายอื่นๆ',
          type: 'expense',
        },
        item_name: 'ค่าเช่าร้าน',
      },

      {
        transaction_date: '2024-01-06T00:00:00Z',
        amount: 2600,
        note: 'ซื้อหลายอย่าง',
        category_info: {
          name: 'ขายหน้าร้าน',
          type: 'income',
        },
        item_name: 'ขายน้ำปั่น',
      },
      {
        transaction_date: '2024-01-06T00:00:00Z',
        amount: 500,
        note: 'ซื้อหลายอย่าง',
        category_info: {
          name: 'ซื้อสินค้า',
          type: 'expense',
        },
        item_name: 'ซื้อแตงโม',
      },
      {
        transaction_date: '2024-01-06T00:00:00Z',
        amount: 300,
        category_info: {
          name: 'ซื้อสินค้า',
          type: 'expense',
        },
        item_name: 'ซื้อสับปะรด',
      },

      {
        transaction_date: '2024-01-07T00:00:00Z',
        amount: 1700,
        category_info: {
          name: 'ขายหน้าร้าน',
          type: 'income',
        },
        item_name: 'ขายน้ำปั่น',
      },

      {
        transaction_date: '2024-01-13T00:00:00Z',
        amount: 2200,
        category_info: {
          name: 'ขายหน้าบ้าน',
          type: 'income',
        },
        item_name: 'ขายน้ำปั่น',
      },
      {
        transaction_date: '2024-01-13T00:00:00Z',
        amount: 800,
        category_info: {
          name: 'ซื้อสินค้า',
          type: 'expense',
        },
        item_name: 'ซื้อสตรอว์เบอร์รี่สด',
      },
      {
        transaction_date: '2024-01-13T00:00:00Z',
        amount: 400,
        category_info: {
          name: 'ซื้อสินค้า',
          type: 'expense',
        },
        item_name: 'ซื้อกล้วยหอม',
      },
      {
        transaction_date: '2024-01-13T00:00:00Z',
        amount: 500,
        category_info: {
          name: 'ค่าใช้จ่ายอื่นๆ',
          type: 'expense',
        },
        item_name: 'ซื้อขม',
      },
    ];
  }

  buildTable() {
    // dynamic categories
    this.incomeCategories = [
      ...new Set(
        this.transactions
          .filter((x) => x.category_info.type === 'income')
          .map((x) => x.category_info.name)
      ),
    ];

    this.expenseCategories = [
      ...new Set(
        this.transactions
          .filter((x) => x.category_info.type === 'expense')
          .map((x) => x.category_info.name)
      ),
    ];

    const map: any = {};

    for (const trx of this.transactions) {
      const date = this.formatThaiDate(trx.transaction_date);

      if (!map[date]) {
        map[date] = {
          date,
          items: [],
          notes: [],
          incomeMap: {},
          expenseMap: {}
        };
      }

      map[date].items.push(trx.item_name);
      map[date].notes.push(trx.note || '-');

      const type = trx.category_info.type;
      const cat = trx.category_info.name;

      if (type === 'income') {
        if (!map[date].incomeMap[cat]) map[date].incomeMap[cat] = [];
        map[date].incomeMap[cat].push(trx.amount);
      } else {
        if (!map[date].expenseMap[cat]) map[date].expenseMap[cat] = [];
        map[date].expenseMap[cat].push(trx.amount);
      }
    }

    this.groupedRows = Object.values(map);
  }

  formatThaiDate(dateUtc: string): string {
    const d = new Date(dateUtc);

    const months = [
      'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
      'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
    ];

    return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear() + 543}`;
  }

  getTotalIncome(cat: string): number {
    return this.transactions
      .filter(
        (x) =>
          x.category_info.type === 'income' &&
          x.category_info.name === cat
      )
      .reduce((sum, x) => sum + x.amount, 0);
  }

  getTotalExpense(cat: string): number {
    return this.transactions
      .filter(
        (x) =>
          x.category_info.type === 'expense' &&
          x.category_info.name === cat
      )
      .reduce((sum, x) => sum + x.amount, 0);
  }

  openModalEmit() {
    this.openModal.emit();
  }

  private getCurrentYearMonth(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  }

  handleMonthChange(event: {
    selectedDates: Date[];
    dateStr: string;
    instance: any;
  }) {
    this.selectedMonth = event.dateStr;
    console.log('YYYY-MM:', this.selectedMonth);

    const payload = {
      year_month: this.selectedMonth
    };

    console.log(payload);
  }
}
