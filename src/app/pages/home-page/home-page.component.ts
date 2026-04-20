import { Component } from '@angular/core';
import { EcommerceMetricsComponent } from '../../shared/components/ecommerce/ecommerce-metrics/ecommerce-metrics.component';
import { MonthlySalesChartComponent } from '../../shared/components/ecommerce/monthly-sales-chart/monthly-sales-chart.component';
import { MonthlyTargetComponent } from '../../shared/components/ecommerce/monthly-target/monthly-target.component';
import { StatisticsChartComponent } from '../../shared/components/ecommerce/statics-chart/statics-chart.component';
import { DemographicCardComponent } from '../../shared/components/ecommerce/demographic-card/demographic-card.component';
import { RecentOrdersComponent } from '../../shared/components/ecommerce/recent-orders/recent-orders.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [
    // EcommerceMetricsComponent,
    MonthlySalesChartComponent,
    // MonthlyTargetComponent,
    // StatisticsChartComponent,
    // DemographicCardComponent,
    // RecentOrdersComponent,
    // DecimalPipe
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

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
}
