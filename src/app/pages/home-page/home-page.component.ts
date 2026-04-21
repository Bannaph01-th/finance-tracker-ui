import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '../../shared/components/ecommerce/ecommerce-metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '../../shared/components/ecommerce/monthly-sales-chart/monthly-sales-chart.component';
import { MonthlyTargetComponent } from '../../shared/components/ecommerce/monthly-target/monthly-target.component';
import { StatisticsChartComponent } from '../../shared/components/ecommerce/statics-chart/statics-chart.component';
import { DemographicCardComponent } from '../../shared/components/ecommerce/demographic-card/demographic-card.component';
import { RecentOrdersComponent } from '../../shared/components/ecommerce/recent-orders/recent-orders.component';
import { DecimalPipe } from '@angular/common';
import { NgApexchartsModule, ApexAxisChartSeries, ApexChart, ApexXAxis, ApexPlotOptions, ApexDataLabels, ApexStroke, ApexLegend, ApexYAxis, ApexGrid, ApexFill, ApexTooltip } from 'ng-apexcharts';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';

@Component({
  selector: 'app-home-page',
  imports: [
    // EcommerceMetricsComponent,
    FormsModule,
    NgApexchartsModule,
    ModalComponent,
    PageBreadcrumbComponent,
    // MonthlyTargetComponent,
    // StatisticsChartComponent,
    // DemographicCardComponent,
    // RecentOrdersComponent,
    // DecimalPipe
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  isOpen = false;
  modalType: 'plan' | 'finance-use' | 'list' | 'frog' = 'plan';

  financeLimit = 0;

  cards = [
    {
      name: 'Titanium MasterCard',
      number: 'xxxx',
      due: '20 JUN 19',
      amount: 2624.92,
      limit: 276900
    },
    {
      name: 'Visa Platinum',
      number: '1030',
      due: '12 JUN 19',
      amount: 3599,
      limit: 296401
    },
    {
      name: 'Beyond Platinum',
      number: '8242',
      due: '18 JUN 19',
      amount: 2625.82,
      limit: 183296
    },
    {
      name: 'Platinum',
      number: 'xxxx',
      due: '17 JUN 19',
      amount: 0,
      limit: 100000
    }
  ];

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

  openModal(type: 'plan' | 'finance-use' | 'list' | 'frog') {
    this.modalType = type;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
