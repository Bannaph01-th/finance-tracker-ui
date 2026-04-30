import { Routes } from "@angular/router";
import { ProfileComponent } from "./pages/profile/profile.component";
import { NotFoundComponent } from "./pages/other-page/not-found/not-found.component";
import { AppLayoutComponent } from "./shared/layout/app-layout/app-layout.component";
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
