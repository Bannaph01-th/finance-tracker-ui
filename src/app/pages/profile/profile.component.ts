import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PageBreadcrumbComponent } from "../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { UserInfoCardComponent } from "../../shared/components/user-profile/user-info-card/user-info-card.component";
import { ModalComponent } from "../../shared/components/ui/modal/modal.component";
import { TransactionService } from "../../shared/services/api/transactions.service";
import { CategoryService } from "../../shared/services/api/category.service";
import {
  Category,
  CategoryPayload,
} from "../../shared/services/interfaces/category.interface";
import { TransactionType } from "../../shared/services/interfaces/transaction.interface";

type ModalType = "category" | "delete";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    FormsModule,
    PageBreadcrumbComponent,
    UserInfoCardComponent,
    ModalComponent,
  ],
  templateUrl: "./profile.component.html",
})
export class ProfileComponent implements OnInit {
  isOpen = false;
  modalType: ModalType = "category";

  categoryName = "";
  categories: Category[] = [];
  categoryTypeId = 1;

  deleteMode = false;
  deleteId: string | null = null;

  transaction: TransactionType[] = [];

  constructor(
    private readonly _transactionType: TransactionService,
    private readonly _categoryService: CategoryService,
  ) {}

  get sortedCategories() {
    return [...this.categories].sort((a, b) => {
      if (a.type_name === b.type_name) {
        return a.type_id - b.type_id;
      }

      return a.type_name === "INCOME" ? -1 : 1;
    });
  }

  ngOnInit(): void {
    this.loadTransactionTypes();
    this.loadCategory();
  }

  async loadTransactionTypes() {
    const res = await this._transactionType.getType();

    if (res?.resultData?.transaction_types) {
    this.transaction = res.resultData.transaction_types.sort((a, b) => {
      if (a.transaction_type_name === b.transaction_type_name) return 0;
      return a.transaction_type_name === "INCOME" ? -1 : 1;
    });
  }
}

  async loadCategory() {
    const res = await this._categoryService.getAllCategory();

    this.categories = res?.resultData.categories ?? [];
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  openModal(type: ModalType, id?: string) {
    this.modalType = type;
    this.isOpen = true;

    if (id) {
      this.deleteId = id;
    }
  }

  closeModal() {
    this.isOpen = false;
    this.deleteId = null;
  }

  async addCategory() {
    if (!this.categoryName.trim()) return;

    const payload: CategoryPayload = {
      name: this.categoryName.trim(),
      type_id: this.categoryTypeId,
    };

    const res = await this._categoryService.create(payload);

    if (res?.status === 200) {
      this.categoryName = "";
      this.closeModal();
    }

    this.loadCategory();
  }

  async confirmDelete() {
    const id = this.deleteId;

    if (id === null) return;

    try {
      const res = await this._categoryService.delete(id);
      if (!res?.status) {
        console.log("delete failed");
        return;
      }
    } catch (e: any) {
      console.log(e);
    }
    this.categories = this.categories.filter(
      (item) => item.category_id !== this.deleteId,
    );

    this.deleteMode = !this.deleteMode;
    this.closeModal();
  }
}
