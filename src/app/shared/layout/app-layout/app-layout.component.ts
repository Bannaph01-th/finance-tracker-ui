import { Component, inject, OnInit } from "@angular/core";
import { SidebarService } from "../../services/sidebar.service";
import { CommonModule } from "@angular/common";
import { AppSidebarComponent } from "../app-sidebar/app-sidebar.component";
import { BackdropComponent } from "../backdrop/backdrop.component";
import { RouterModule } from "@angular/router";
import { AppHeaderComponent } from "../app-header/app-header.component";
import { ModalComponent } from "../../components/ui/modal/modal.component";

import { Router, RouterOutlet } from "@angular/router";
import { AsyncPipe, NgClass } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { UserService } from "../../services/api/user.service";
import { UserStateService } from "../../services/api/common/user-stage-service";
import { User } from "../../services/interfaces/user.interface";

@Component({
  selector: "app-layout",
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AppHeaderComponent,
    AppSidebarComponent,
    BackdropComponent,
    ModalComponent,
    RouterOutlet,
    AsyncPipe,
    NgClass,
  ],
  templateUrl: "./app-layout.component.html",
})
export class AppLayoutComponent implements OnInit {
  readonly isExpanded$;
  readonly isHovered$;
  readonly isMobileOpen$;

  readonly router = inject(Router);

  isOpen = false;
  userProfile: User | undefined;
  savingLimit = false;
  financeLimit = 0;

  constructor(
    public sidebarService: SidebarService,
    private readonly _userService: UserService,
    private readonly userState: UserStateService,
  ) {
    this.isExpanded$ = this.sidebarService.isExpanded$;
    this.isHovered$ = this.sidebarService.isHovered$;
    this.isMobileOpen$ = this.sidebarService.isMobileOpen$;
  }

  ngOnInit() {
    this.fetchUserProfile();

    this.userState.user$.subscribe((user) => {
      this.userProfile = user ?? undefined;
    });
  }

  async saveFinanceLimit(): Promise<void> {
    if (!this.userProfile?.user_id) return;

    this.savingLimit = true;
    
    const res = await this._userService.patchUserProfile(
      this.userProfile.user_id,
      {
        money_limit: Number(this.financeLimit),
      },
    );
    
    this.savingLimit = false;
    
    if (res) {
      await this.fetchUserProfile();
      this.closeModal();
    }
    this.financeLimit = 0;
  }

  async fetchUserProfile() {
    const res = await this._userService.getUserProfile();
    console.log("user profile: ", res);
    if (res?.resultData) {
      this.userState.setUser(res.resultData);

      this.financeLimit = Number(res.resultData?.money_limit || 0);
    }
  }

  get containerClasses() {
    return [
      "flex-1",
      "transition-all",
      "duration-300",
      "ease-in-out",
      this.isExpanded$ || this.isHovered$ ? "xl:ml-[290px]" : "xl:ml-[90px]",
      this.isMobileOpen$ ? "ml-0" : "",
    ];
  }

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
