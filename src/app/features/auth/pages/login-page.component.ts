import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthStore } from '../../../core/stores/auth.store';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <span class="text-white font-bold text-2xl">SP</span>
          </div>
          <h1 class="text-2xl font-bold text-gray-900">
            Sistema PV
          </h1>
          <p class="text-gray-500 mt-2">
            Inicia sesion en tu cuenta
          </p>
        </div>

        <div class="bg-white rounded-xl p-8 shadow-card">
          <form (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Usuario
              </label>
              <input
                type="text"
                [(ngModel)]="username"
                name="username"
                required
                class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-gray-900"
                placeholder="tu usuario"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">
                Contrasenia
              </label>
              <input
                type="password"
                [(ngModel)]="password"
                name="password"
                required
                class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white text-gray-900"
                placeholder="Tu contrasenia"
              />
            </div>

            @if (authStore.error()) {
              <div class="p-3 bg-red-100 text-red-600 text-sm rounded-lg">
                {{ authStore.error() }}
              </div>
            }

            <button
              type="submit"
              [disabled]="authStore.isLoading()"
              class="w-full h-11 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors disabled:opacity-50"
            >
              Iniciar sesion
            </button>
          </form>
        </div>
      </div>
    </div>
  `
})
export class LoginPageComponent {
  authStore = inject(AuthStore);
  router = inject(Router);
  route = inject(ActivatedRoute);
  username = '';
  password = '';

  constructor() {
    if (this.authStore.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  async onSubmit(): Promise<void> {
    const success = await this.authStore.login({ username: this.username, password: this.password });
    if (success) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
      this.router.navigateByUrl(returnUrl);
    }
  }
}
