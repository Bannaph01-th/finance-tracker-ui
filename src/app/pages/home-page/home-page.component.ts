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
      name: 'Sales',
      data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
    },
  ];
  public chart: ApexChart = {
    fontFamily: 'Outfit, sans-serif',
    type: 'bar',
    height: 180,
    toolbar: { show: false },
  };
  public xaxis: ApexXAxis = {
    categories: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    axisBorder: { show: false },
    axisTicks: { show: false },
  };
  public plotOptions: ApexPlotOptions = {
    bar: {
      horizontal: false,
      columnWidth: '39%',
      borderRadius: 5,
      borderRadiusApplication: 'end',
    },
  };
  public dataLabels: ApexDataLabels = { enabled: false };
  public stroke: ApexStroke = {
    show: true,
    width: 4,
    colors: ['transparent'],
  };
  public legend: ApexLegend = {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Outfit',
  };
  public yaxis: ApexYAxis = { title: { text: undefined } };
  public grid: ApexGrid = { yaxis: { lines: { show: true } } };
  public fill: ApexFill = { opacity: 1 };
  public tooltip: ApexTooltip = {
    x: { show: false },
    y: { formatter: (val: number) => `${val}` },
  };
  public colors: string[] = ['#465fff'];

  openModal(type: 'plan' | 'finance-use' | 'list' | 'frog') {
    this.modalType = type;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
