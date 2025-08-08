import { Component } from '@angular/core';
import { UserGetResponseDto } from '../../dtos/user-get-response.dto';
import { ThemeService } from '../../../shared/services/theme.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone:false,
})
export class UserListComponent {

  list: UserGetResponseDto[] = [];
  selected: UserGetResponseDto | null = null;
  selectedIdToDelete: string | null = null;

  showRegisterModal = false;
  showUpdateModal = false;

  showConfirmDialog = false;
  loading = true;

  constructor(
    public themeService: ThemeService,
    private _userService: UserService,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this._userService.list().subscribe({
      next: (response) => {
        this.list = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  openCreateModal(): void {
    this.selected = null;
    this.showRegisterModal = true;
  }

  openEditModal(dto: UserGetResponseDto): void {
    this.selected = { ...dto };
    this.showUpdateModal = true;
  }

  handleRegisterModalClose(result: boolean): void {
    this.showRegisterModal = false;
    if (result) {
      this.loadUsers();
    }
  }

   handleUpdateModalClose(result: boolean): void {
    this.showUpdateModal = false;
    if (result) {
      this.loadUsers();
    }
  }

  confirmDelete(id: string): void {
    this.selectedIdToDelete = id;
    this.showConfirmDialog = true;
  }

  deleteUser(): void {
    if (this.selectedIdToDelete) {
      this._userService.delete(this.selectedIdToDelete).subscribe({
        next: () => {
          this.loadUsers();
          this.showConfirmDialog = false;
        },
        error: () => {
          this.showConfirmDialog = false;
        }
      });
    }
  }
}