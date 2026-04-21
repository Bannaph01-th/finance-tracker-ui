import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { UserInfoCardComponent } from '../../shared/components/user-profile/user-info-card/user-info-card.component';
import { ModalComponent } from '../../shared/components/ui/modal/modal.component';

type CategoryType = 'income' | 'expense';
type ModalType = 'category' | 'delete';

interface CategoryItem {
  id: number;
  name: string;
  type: CategoryType;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    PageBreadcrumbComponent,
    UserInfoCardComponent,
    ModalComponent
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  isOpen = false;
  modalType: ModalType = 'category';

  categoryName = '';
  categoryType: CategoryType = 'expense';

  deleteMode = false;
  deleteId: number | null = null;

  categories: CategoryItem[] = [
    { id: 1, name: 'เงินเดือน', type: 'income' },
    { id: 2, name: 'โบนัส', type: 'income' },
    { id: 3, name: 'อาหาร', type: 'expense' },
    { id: 4, name: 'เดินทาง', type: 'expense' },
    { id: 5, name: 'ค่าเช่า', type: 'expense' }
  ];

  get sortedCategories(): CategoryItem[] {
    return [...this.categories].sort((a, b) => {
      if (a.type === b.type) return a.id - b.id;
      return a.type === 'income' ? -1 : 1;
    });
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

  addCategory() {
    if (!this.categoryName.trim()) return;

    this.categories.unshift({
      id: Date.now(),
      name: this.categoryName,
      type: this.categoryType
    });

    this.categoryName = '';
    this.categoryType = 'expense';

    this.closeModal();
  }

  confirmDelete() {
    this.categories = this.categories.filter(
      item => item.id !== this.deleteId
    );

    this.closeModal();
  }
}