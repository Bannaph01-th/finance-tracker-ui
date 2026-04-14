import { Routes } from '@angular/router';
import { EcommerceComponent } from './pages/dashboard/ecommerce/ecommerce.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';
import { ButtonsComponent } from './pages/ui-elements/buttons/buttons.component';
import { ImagesComponent } from './pages/ui-elements/images/images.component';
import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { CalenderComponent } from './pages/calender/calender.component';

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path: '',
        component: EcommerceComponent,
        pathMatch: 'full',
        title:
          'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'calendar',
        component:CalenderComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'profile',
        component:ProfileComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'form-elements',
        component:FormElementsComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'basic-tables',
        component:BasicTablesComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'blank',
        component:BlankComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      // support tickets
      {
        path:'invoice',
        component:InvoicesComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'line-chart',
        component:LineChartComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'bar-chart',
        component:BarChartComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'alerts',
        component:AlertsComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'avatars',
        component:AvatarElementComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'badge',
        component:BadgesComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'buttons',
        component:ButtonsComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'images',
        component:ImagesComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
      {
        path:'videos',
        component:VideosComponent,
        title:'Finance Tracker - UTCC SP346 2-68'
      },
    ]
  },
  // auth pages
  {
    path:'signin',
    component:SignInComponent,
    title:'Finance Tracker - Sign In'
  },
  {
    path:'signup',
    component:SignUpComponent,
    title:'Finance Tracker - Sign Up'
  },
  // error pages
  {
    path:'**',
    component:NotFoundComponent,
    title:'Finance Tracker - 404'
  },
];
