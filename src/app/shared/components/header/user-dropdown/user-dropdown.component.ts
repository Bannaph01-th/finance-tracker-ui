import { Component, OnInit } from "@angular/core";
import { DropdownComponent } from "../../ui/dropdown/dropdown.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DropdownItemTwoComponent } from "../../ui/dropdown/dropdown-item/dropdown-item.component-two";
import { TokenStorageService } from "../../../services/api/common/token-storage-service";
import { UserStateService } from "../../../services/api/common/user-stage-service";

@Component({
  selector: "app-user-dropdown",
  templateUrl: "./user-dropdown.component.html",
  imports: [
    CommonModule,
    RouterModule,
    DropdownComponent,
    DropdownItemTwoComponent,
  ],
})
export class UserDropdownComponent implements OnInit {
  isOpen = false;
  name = "" ;
  email = "";

  constructor(
    private readonly _userState: UserStateService,
    private readonly _tokenStrorage: TokenStorageService) {}

  ngOnInit(): void {
      this._userState.user$.subscribe(user => {
        this.name = user?.full_name ?? '',
        this.email = user?.email ?? ''
      })
  }

  signOut(){
    this._tokenStrorage.clearToken();
    this._userState.clear();
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }
}
