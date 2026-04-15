import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReportService } from '../services/report.service';
import { SaleReportItem } from '../../../core/models';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-900">Reportes</h2>

      <div class="bg-white rounded-xl p-4 shadow-card flex flex-wrap gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Desde</label>
          <input type="date" [(ngModel)]="startDate"
                 class="h-10 px-3 rounded-lg border border-gray-300 bg-white"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Hasta</label>
          <input type="date" [(ngModel)]="endDate"
                 class="h-10 px-3 rounded-lg border border-gray-300 bg-white"/>
        </div>
        <button (click)="loadReport()"
                class="h-10 px-6 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600">
          Filtrar
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Id</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (sale of sales(); track sale.saleId) {
                <tr class="hover:bg-gray-50">
                   <td class="px-4 py-3 text-sm text-gray-900">
                    {{ sale.saleId }}
                  </td>
                  <td class="px-4 py-3 text-sm text-gray-900">
                    {{ sale.saleDate | date:'dd/MM/yyyy HH:mm:ss' }}
                  </td>
                  <td class="px-4 py-3 text-right font-semibold text-gray-900">
                    {{ sale.total | currency }}
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="2" class="px-4 py-12 text-center text-gray-500">
                    No hay ventas en este periodo
                  </td>
                </tr>
              }
            </tbody>
            @if (sales().length > 0) {
              <tfoot class="bg-gray-50 border-t">
                <tr>
                  <td class="px-4 py-3 text-right font-semibold text-gray-700">Total general:</td>
                  <td class="px-4 py-3 text-right font-bold text-xl text-primary-500">
                    {{ getGrandTotal() | currency }}
                  </td>
                </tr>
              </tfoot>
            }
          </table>
        </div>

        @if (totalPages() > 1) {
          <div class="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <div class="text-sm text-gray-500">
              Mostrando {{ (currentPage - 1) * pageSize + 1 }} - {{ Math.min(currentPage * pageSize, totalRecords()) }}
              de {{ totalRecords() }}
            </div>
            <div class="flex gap-2">
              <button (click)="goToPage(currentPage - 1)"
                      [disabled]="currentPage === 1"
                      class="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100">
                Anterior
              </button>
              @for (page of getPageNumbers(); track page) {
                <button (click)="goToPage(page)"
                        [class.bg-primary-500]="page === currentPage"
                        [class.text-white]="page === currentPage"
                        class="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100">
                  {{ page }}
                </button>
              }
              <button (click)="goToPage(currentPage + 1)"
                      [disabled]="currentPage === totalPages()"
                      class="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100">
                Siguiente
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class ReportsPageComponent implements OnInit {
  private reportService = inject(ReportService);

  Math = Math;
  sales = signal<SaleReportItem[]>([]);
  totalRecords = signal(0);
  totalPages = signal(1);
  currentPage = 1;
  pageSize = 10;

  startDate = this.getDefaultStartDate();
  endDate = this.getDefaultEndDate();

  ngOnInit(): void {
    this.loadReport();
  }

  loadReport(): void {
    this.reportService.getSalesReport(
      this.currentPage,
      this.pageSize,
      new Date(this.startDate),
      new Date(this.endDate + 'T23:59:59')
    ).subscribe({
      next: (response) => {
        this.sales.set(response.data);
        this.totalRecords.set(response.totalRecords);
        this.totalPages.set(response.totalPages);
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.loadReport();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages();
    const current = this.currentPage;

    let start = Math.max(1, current - 2);
    let end = Math.min(total, start + 4);

    if (end - start < 4) {
      start = Math.max(1, end - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }

  getGrandTotal(): number {
    return this.sales().reduce((sum, sale) => sum + sale.total, 0);
  }

  private getDefaultStartDate(): string {
    const d = new Date();
    d.setDate(1);
    return d.toISOString().split('T')[0];
  }

  private getDefaultEndDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
