import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NotificationService } from '../../../core/services/notification.service';
import { API_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class SaleService {
  private http = inject(HttpClient);
  private notifications = inject(NotificationService);

  createSale(items: { productId: string; quantity: number }[]): Observable<any> {
    return this.http.post(
      `${API_BASE_URL}${API_ENDPOINTS.SALES.CREATE}`,
      { items }
    ).pipe(
      tap(() => this.notifications.success('Venta registrada')),
      catchError(err => {
        this.notifications.error('Error al registrar venta');
        return throwError(() => err);
      })
    );
  }
}
