import { Routes } from "@angular/router";
import { EcommerceComponent } from "./pages/dashboard/ecommerce/ecommerce.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { FormElementsComponent } from "./pages/forms/form-elements/form-elements.component";
import { BasicTablesComponent } from "./pages/tables/basic-tables/basic-tables.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { NotFoundComponent } from "./pages/other-page/not-found/not-found.component";
import { AppLayoutComponent } from "./shared/layout/app-layout/app-layout.component";
import { InvoicesComponent } from "./pages/invoices/invoices.component";
import { LineChartComponent } from "./pages/charts/line-chart/line-chart.component";
import { BarChartComponent } from "./pages/charts/bar-chart/bar-chart.component";
import { AlertsComponent } from "./pages/ui-elements/alerts/alerts.component";
import { AvatarElementComponent } from "./pages/ui-elements/avatar-element/avatar-element.component";
import { BadgesComponent } from "./pages/ui-elements/badges/badges.component";
import { ButtonsComponent } from "./pages/ui-elements/buttons/buttons.component";
import { ImagesComponent } from "./pages/ui-elements/images/images.component";
import { VideosComponent } from "./pages/ui-elements/videos/videos.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";
import { SignUpComponent } from "./pages/auth-pages/sign-up/sign-up.component";
import { CalenderComponent } from "./pages/calender/calender.component";
import { authGuard } from "./shared/services/guards/guards";
import { Layout } from "@amcharts/amcharts5";
import { SummaryTableComponent } from "./pages/summary-table/summary-table.component";
import { FinanceCalenderComponent } from "./pages/finance-calender/finance-calender.component";
import { UserManagementComponent } from "./pages/admin/user-management/user-management.component";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    children: [
      {
        path: "home-page",
        component: HomePageComponent,
        pathMatch: "full",
        title: "Finance Tracker Home Page",
        canActivate: [authGuard],
      },
      {
        path: "summary",
        component: SummaryTableComponent,
        title: "Finance Tracker Summary Page",
        canActivate: [authGuard],
      },
      {
        path: "calendar",
        component: FinanceCalenderComponent,
        title: "Finance Tracker Calender Page",
        canActivate: [authGuard],
      },
      {
        path: "profile",
        component: ProfileComponent,
        title: "Finance Tracker User Profile Page",
        canActivate: [authGuard],
      },
      {
        path: "admin",
        title: "Finance Tracker Admin Manager",
        children: [
          {
            path: "dashboard",
            component: AdminDashboardComponent,
            pathMatch: "full",
            canActivate: [authGuard],
          },
          {
            path: "users",
            component: UserManagementComponent,
            canActivate: [authGuard],
          },
          {
            path: "**",
            redirectTo: "/homePage"
          },
        ]
      },

      // template path
      // ==================

      {
        path: "form-elements",
        component: FormElementsComponent,
        title: "Angular Form Elements Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "basic-tables",
        component: BasicTablesComponent,
        title: "Angular Basic Tables Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "blank",
        component: BlankComponent,
        title: "Angular Blank Dashboard",
        canActivate: [authGuard],
      },
      // support tickets
      {
        path: "invoice",
        component: InvoicesComponent,
        title: "Angular Invoice Details Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "line-chart",
        component: LineChartComponent,
        title: "Angular Line Chart Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "bar-chart",
        component: BarChartComponent,
        title: "Angular Bar Chart Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "alerts",
        component: AlertsComponent,
        title: "Angular Alerts Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "avatars",
        component: AvatarElementComponent,
        title: "Angular Avatars Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "badge",
        component: BadgesComponent,
        title: "Angular Badges Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "buttons",
        component: ButtonsComponent,
        title: "Angular Buttons Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "images",
        component: ImagesComponent,
        title: "Angular Images Dashboard",
        canActivate: [authGuard],
      },
      {
        path: "videos",
        component: VideosComponent,
        title: "Angular Videos Dashboard",
        canActivate: [authGuard],
      },
    ],
  },

  // auth pages
  {
    path: "sign-in",
    component: SignInComponent,
    canActivate: [authGuard],
    title:
      "Finance Tracker Sign In Page",
  },
  // {
  //   path: "signup",
  //   component: SignUpComponent,
  //   canActivate: [authGuard],
  //   title:
  //     "Finance Tracker Sign Up Page",
  // },

  // error pages
  {
    path: "**",
    component: NotFoundComponent,
    canActivate: [authGuard],
    title:
      "Finance Tracker NotFound",
  },
];
