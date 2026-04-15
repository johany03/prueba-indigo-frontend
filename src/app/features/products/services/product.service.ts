import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product, ProductFilters, ProductListResponse, CreateProductDto, UpdateProductDto } from '../../../core/models/product.model';
import { NotificationService } from '../../../core/services/notification.service';
import { API_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private notifications = inject(NotificationService);

  private _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  getProducts(filters?: ProductFilters): Observable<ProductListResponse> {
    const params = new HttpParams()
      .set('page', filters?.page ?? 1)
      .set('pageSize', filters?.pageSize ?? 10);

    return this.http.get<ProductListResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.LIST}`,
      { params }
    ).pipe(
      tap(response => this._products.set(response.data)),
      catchError(err => {
        this.notifications.error('Error al cargar productos');
        return throwError(() => err);
      })
    );
  }

  loadAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.LIST}?page=1&pageSize=1000`
    ).pipe(
      tap(products => this._products.set(products)),
      catchError(() => of([]))
    );
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.GET_BY_ID(id)}`
    ).pipe(
      catchError(err => throwError(() => new Error('Producto no encontrado')))
    );
  }

  createProduct(dto: CreateProductDto): Observable<Product> {
    return this.http.post<Product>(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.CREATE}`,
      dto
    ).pipe(
      tap(() => this.notifications.success('Producto creado')),
      catchError(err => {
        this.notifications.error('Error al crear producto');
        return throwError(() => err);
      })
    );
  }

  updateProduct(id: string, dto: UpdateProductDto): Observable<Product> {
    return this.http.put<Product>(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.UPDATE(id)}`,
      dto
    ).pipe(
      tap(() => this.notifications.success('Producto actualizado')),
      catchError(err => {
        this.notifications.error('Error al actualizar producto');
        return throwError(() => err);
      })
    );
  }

  deleteProduct(id: string): Observable<void> {
    return this.http.delete<void>(
      `${API_BASE_URL}${API_ENDPOINTS.PRODUCTS.DELETE(id)}`
    ).pipe(
      tap(() => this.notifications.success('Producto eliminado')),
      catchError(err => {
        this.notifications.error('Error al eliminar producto');
        return throwError(() => err);
      })
    );
  }

  updateStock(id: string, quantity: number): void {
    this._products.update(list =>
      list.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + quantity) } : p)
    );
  }
}
