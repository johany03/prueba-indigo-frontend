import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError, firstValueFrom } from 'rxjs';
import { User, LoginDto } from '../models';
import { StorageService } from '../services/storage.service';
import { NotificationService } from '../services/notification.service';
import { API_BASE_URL, API_ENDPOINTS } from '../constants/api.constants';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly storage = inject(StorageService);
  private readonly router = inject(Router);
  private readonly notifications = inject(NotificationService);
  private readonly http = inject(HttpClient);
  private readonly STORAGE_KEY = 'auth';

  private _user = signal<User | null>(null);
  private _token = signal<string | null>(null);
  private _isLoading = signal(false);
  private _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly token = this._token.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly isAuthenticated = computed(() => !!this._token());
  readonly userName = computed(() => this._user()?.username ?? 'Usuario');
  readonly userFullName = computed(() => this._user()?.username ?? 'Usuario');
  readonly userRole = computed(() => this._user()?.role ?? 'User');

  constructor() {
    this.loadFromStorage();
  }

  async login(credentials: LoginDto): Promise<boolean> {
    this._isLoading.set(true);
    this._error.set(null);

    try {
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(
          `${API_BASE_URL}${API_ENDPOINTS.AUTH_LOGIN}`,
          credentials
        ).pipe(
          catchError(err => throwError(() => new Error(
            err.error?.message || 'Error de conexion'
          )))
        )
      );

      const user: User = {
        id: '1',
        username: credentials.username,
        role: 'Admin',
      };

      this._user.set(user);
      this._token.set(response.token);
      this.persistToStorage();
      this.notifications.success('Bienvenido, ' + credentials.username + '!');
      return true;
    } catch (error: any) {
      this._error.set(error.message || 'Credenciales invalidas');
      return false;
    } finally {
      this._isLoading.set(false);
    }
  }

  logout(): void {
    this._user.set(null);
    this._token.set(null);
    this.storage.remove(this.STORAGE_KEY);
    this.router.navigate(['/auth/login']);
    this.notifications.info('Sesion cerrada');
  }

  private loadFromStorage(): void {
    const stored = this.storage.get<{ user: User; token: string }>(this.STORAGE_KEY);
    if (stored) {
      this._user.set(stored.user);
      this._token.set(stored.token);
    }
  }

  private persistToStorage(): void {
    const user = this._user();
    const token = this._token();
    if (user && token) {
      this.storage.set(this.STORAGE_KEY, { user, token });
    }
  }
}
