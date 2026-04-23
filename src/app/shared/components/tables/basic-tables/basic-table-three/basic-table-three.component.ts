import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ButtonComponent } from "../../../ui/button/button.component";
import { TableDropdownComponent } from "../../../common/table-dropdown/table-dropdown.component";
import { BadgeComponent } from "../../../ui/badge/badge.component";
import {
  AllUser,
  User,
  UserPayload,
} from "../../../../services/interfaces/user.interface";
import { UserService } from "../../../../services/api/user.service";
import { LabelComponent } from "../../../form/label/label.component";
import { InputFieldComponent } from "../../../form/input/input-field.component";
import { FormsModule } from "@angular/forms";
import { ModalComponent } from "../../../ui/modal/modal.component";
import { RedirectCommand, ɵEmptyOutletComponent } from "@angular/router";

@Component({
  selector: "app-basic-table-three",
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
    LabelComponent,
    FormsModule,
    InputFieldComponent,
    ModalComponent,
    ɵEmptyOutletComponent,
  ],
  templateUrl: "./basic-table-three.component.html",
  styles: ``,
})
export class BasicTableThreeComponent implements OnInit {
  User: User[] = [];

  modalType: "delete" | "add" = "add";

  isOpen = false;

  isloading = false;
  onUserDelete = "";

  searchName = "";
  searchEmail = "";

  fullname = "";
  email = "";
  password = "";

  currentPage = 1;
  itemsPerPage = 6;
  totalPages = 1;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getuser();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  async getuser(page: number = 1) {
    this.isloading = true;
    try {
      const res = await this.userService.load(
        page,
        this.itemsPerPage,
        this.searchName || undefined,
        this.searchEmail || undefined,
      );
      if (!res?.status) {
        console.log("error to load user");
        return;
      }
      this.User = res?.resultData?.users ?? [];
      this.totalPages = res?.resultData?.total_pages ?? 1;
      this.currentPage = res?.resultData?.page ?? 1;
    } catch (e) {
      console.log(e);
    } finally {
      this.isloading = false;
    }
  }

  onserch() {
    this.getuser(1);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.getuser(page);
  }

  async confirmDelete() {
    if (this.onUserDelete === null) {
      console.log("no have user");
      this.onUserDelete = "";
      return;
    }

    try {
      const res = await this.userService.deleteUser(this.onUserDelete);

      if (!res?.status) {
        console.log("cant delete user");
        return;
      }

      this.onUserDelete = "";
      this.isOpen = false;
      this.getuser();
    } catch (e: any) {
      console.log(e);
    }
  }

  async addUser(): Promise<User | null> {
    const payload: UserPayload = {
      full_name: this.fullname,
      password_hash: this.password,
      email: this.email,
    };
    try {
      const res = await this.userService.createUser(payload);
      this.getuser();
      this.fullname = '';
      this.password = '';
      this.email = '';


      this.closeModal()
      return res?.resultData ?? null;
    } catch (e: any) {
      console.log(e);
      return null;
    }
  }

  onOpen(type: "delete" | "add", userId?: string): void {
    this.modalType = type;
    this.onUserDelete = userId ?? "";
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
