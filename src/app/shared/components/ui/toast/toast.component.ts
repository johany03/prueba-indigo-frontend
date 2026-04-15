import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Toast } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      @for (toast of notificationService.toasts(); track toast.id) {
        <div
          class="toast-item animate-slide-in"
          [class]="getToastClass(toast.type)"
          (click)="notificationService.remove(toast.id)"
        >
          <div class="flex items-center gap-3">
            <span class="text-lg">{{ getIcon(toast.type) }}</span>
            <p class="text-sm font-medium">{{ toast.message }}</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-item {
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      cursor: pointer;
      transition: all 300ms;
    }
    
    .toast-success {
      background-color: #10b981;
      color: white;
    }
    
    .toast-error {
      background-color: #ef4444;
      color: white;
    }
    
    .toast-warning {
      background-color: #f59e0b;
      color: white;
    }
    
    .toast-info {
      background-color: #3b82f6;
      color: white;
    }

    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
  `]
})
export class ToastComponent {
  notificationService = inject(NotificationService);

  getToastClass(type: Toast['type']): string {
    return 'toast-' + type;
  }

  getIcon(type: Toast['type']): string {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '!';
      case 'info': return 'i';
      default: return '';
    }
  }
}
