import { Component, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PageBreadcrumbComponent } from "../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { UserInfoCardComponent } from "../../shared/components/user-profile/user-info-card/user-info-card.component";
import { ModalComponent } from "../../shared/components/ui/modal/modal.component";
import { TransactionService } from "../../shared/services/api/transactions.service";
import { CategoryService } from "../../shared/services/api/category.service";
import { Category } from "../../shared/services/interfaces/category.interface";

type CategoryType = "income" | "expense";
type ModalType = "category" | "delete";

interface CategoryItem {
  id: number;
  name: string;
  type: CategoryType;
}

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

  deleteMode = false;
  deleteId: number | null = null;

  constructor(
    private readonly _transactionType: TransactionService,
    private readonly _categoryService: CategoryService,
  ) {}


  get sortedCategories() {
    return [...this.categories].sort((a, b) => {
      if (a.type_name === b.type_name) {
        return a.type_id - (b.type_id);
      }

      return a.type_name === "INCOME" ? -1 : 1;
    });
  }

  ngOnInit(): void {
      this.loadCategory()
  }

  // async loadTransactionTypes() {
  //   const res = await this._transactionType.getType();

  //   if (res?.resultData?.transaction_types) {
  //     this.transactionTypes = res.resultData.transaction_types;
  //   }
  // }

  async loadCategory() {
    const res = await this._categoryService.getAllCategory();

    this.categories = res?.resultData.categories ?? [];
  }

  toggleDeleteMode() {
    this.deleteMode = !this.deleteMode;
  }

  openModal(type: ModalType, id?: number) {
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

  // addCategory() {
  //   if (!this.categoryName.trim()) return;

  //   this.categories.unshift({
  //     id: Date.now(),
  //     name: this.categoryName,
  //     type: this.categoryType,
  //   });

  //   this.categoryName = "";
  //   this.categoryType = "expense";

  //   this.closeModal();
  // }

  // confirmDelete() {
  //   this.categories = this.categories.filter(
  //     (item) => item.id !== this.deleteId,
  //   );

  //   this.closeModal();
  // }
}
