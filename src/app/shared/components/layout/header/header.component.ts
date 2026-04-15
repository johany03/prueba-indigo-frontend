import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../core/stores/auth.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div class="flex items-center gap-4">
        <h1 class="text-lg font-medium text-gray-900">
          {{ getPageTitle() }}
        </h1>
      </div>

      <div class="flex items-center gap-4">
        <div class="relative">
          <button (click)="toggleUserMenu()"
                  class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span class="text-white text-sm font-medium">
                {{ authStore.userName().charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="hidden md:block text-left">
              <p class="text-sm font-medium text-gray-900">
                {{ authStore.userFullName() }}
              </p>
            </div>
          </button>

          @if (showUserMenu) {
            <div class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              <button (click)="logout()"
                      class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                Cerrar sesion
              </button>
            </div>
          }
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  authStore = inject(AuthStore);
  router = inject(Router);

  showUserMenu = false;

  getPageTitle(): string {
    const url = this.router.url;
    if (url.includes('dashboard')) return 'Dashboard';
    if (url.includes('products')) return 'Productos';
    if (url.includes('sales')) return 'Ventas';
    if (url.includes('reports')) return 'Reportes';
    if (url.includes('auth')) return 'Autenticacion';
    return '';
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.showUserMenu = false;
    this.authStore.logout();
  }
}
