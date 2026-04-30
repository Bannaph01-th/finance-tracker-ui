import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { FormElementsComponent } from "./pages/forms/form-elements/form-elements.component";
import { BasicTablesComponent } from "./pages/tables/basic-tables/basic-tables.component";
import { BlankComponent } from "./pages/blank/blank.component";
import { NotFoundComponent } from "./pages/other-page/not-found/not-found.component";
import { AppLayoutComponent } from "./shared/layout/app-layout/app-layout.component";
import { LineChartComponent } from "./pages/charts/line-chart/line-chart.component";
import { BarChartComponent } from "./pages/charts/bar-chart/bar-chart.component";
import { AlertsComponent } from "./pages/ui-elements/alerts/alerts.component";
import { AvatarElementComponent } from "./pages/ui-elements/avatar-element/avatar-element.component";
import { ButtonsComponent } from "./pages/ui-elements/buttons/buttons.component";
import { SignInComponent } from "./pages/auth-pages/sign-in/sign-in.component";
import { authGuard } from "./shared/services/guards/guards";
import { SummaryTableComponent } from "./pages/summary-table/summary-table.component";
import { FinanceCalenderComponent } from "./pages/finance-calender/finance-calender.component";
import { UserManagementComponent } from "./pages/admin/user-management/user-management.component";
import { AdminDashboardComponent } from "./pages/admin/admin-dashboard/admin-dashboard.component";
import { HomePageComponent } from "./pages/home-page/home-page.component";

export const routes: Routes = [
  {
    path: "",
    component: AppLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "home-page",
        component: HomePageComponent,
        pathMatch: "full",
        title: "Finance Tracker Home Page",
        canActivate: [authGuard],
      },
      {
        path: "finance-table",
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
        path: "buttons",
        component: ButtonsComponent,
        title: "Angular Buttons Dashboard",
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
  {
    path: "**",
    component: NotFoundComponent,
    canActivate: [authGuard],
    title:
      "Finance Tracker NotFound",
  },
];
