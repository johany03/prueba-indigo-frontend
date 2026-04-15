import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SalesReportResponse } from '../../../core/models/sale.model';
import { API_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';

@Injectable({ providedIn: 'root' })
export class ReportService {
  private http = inject(HttpClient);

  getSalesReport(
    page: number,
    pageSize: number,
    startDate: Date,
    endDate: Date
  ): Observable<SalesReportResponse> {
    const params = new HttpParams()
      .set('page', page)
      .set('pageSize', pageSize)
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    return this.http.get<SalesReportResponse>(
      `${API_BASE_URL}${API_ENDPOINTS.REPORTS.SALES}`,
      { params }
    ).pipe(
      catchError(err => {
        console.error('Error al cargar reportes', err);
        return throwError(() => err);
      })
    );
  }
}
