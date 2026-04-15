import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();

  success(message: string, duration = 3000): void {
    this.addToast('success', message, duration);
  }

  error(message: string, duration = 5000): void {
    this.addToast('error', message, duration);
  }

  warning(message: string, duration = 4000): void {
    this.addToast('warning', message, duration);
  }

  info(message: string, duration = 3000): void {
    this.addToast('info', message, duration);
  }

  remove(id: string): void {
    this._toasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  private addToast(type: Toast['type'], message: string, duration: number): void {
    const id = crypto.randomUUID();
    const toast: Toast = { id, type, message, duration };
    
    this._toasts.update(toasts => [...toasts, toast]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }
}
