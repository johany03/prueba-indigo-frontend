import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaleService } from '../services/sale.service';
import { ProductService } from '../../products/services/product.service';
import { Product } from '../../../core/models';

@Component({
  selector: 'app-sales-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <h2 class="text-2xl font-bold text-gray-900">Ventas</h2>

      <div class="bg-white rounded-xl p-4 shadow-card">
        <div class="flex flex-wrap gap-4 items-end">
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium text-gray-700 mb-1">Producto</label>
            <select [(ngModel)]="selectedProductId"
                    class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white">
              <option value="">Seleccionar producto...</option>
              @for (product of availableProducts(); track product.id) {
                <option [value]="product.id" [disabled]="product.stock === 0">
                  {{ product.name }} - {{ product.price | currency }} ({{ product.stock }} uds)
                  {{ product.stock === 0 ? '- Agotado' : '' }}
                </option>
              }
            </select>
          </div>
          <div class="w-32">
            <label class="block text-sm font-medium text-gray-700 mb-1">Cantidad</label>
            <input type="number" [(ngModel)]="selectedQuantity" min="1"
                   class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white"/>
          </div>
          <button (click)="addProduct()" [disabled]="!selectedProductId"
                  class="h-10 px-6 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 disabled:opacity-50">
            + Agregar
          </button>
        </div>
      </div>

      <div class="bg-white rounded-xl shadow-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Precio</th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                <th class="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (item of formItems(); track item.productId; let i = $index) {
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3 font-medium text-gray-900">{{ item.productName }}</td>
                  <td class="px-4 py-3 text-gray-600">{{ item.unitPrice | currency }}</td>
                  <td class="px-4 py-3 text-center">{{ item.quantity }}</td>
                  <td class="px-4 py-3 text-right font-semibold text-gray-900">
                    {{ item.unitPrice * item.quantity | currency }}
                  </td>
                  <td class="px-4 py-3 text-center">
                    <button (click)="removeItem(i)"
                            class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg">
                      Eliminar
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="px-4 py-12 text-center text-gray-500">
                    Agrega productos para registrar una venta
                  </td>
                </tr>
              }
            </tbody>
            @if (formItems().length > 0) {
              <tfoot class="bg-gray-50 border-t">
                <tr>
                  <td colspan="3" class="px-4 py-3 text-right font-semibold text-gray-700">Total:</td>
                  <td class="px-4 py-3 text-right font-bold text-xl text-primary-500">
                    {{ getTotal() | currency }}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            }
          </table>
        </div>

        @if (formItems().length > 0) {
          <div class="px-4 py-4 border-t border-gray-200 flex justify-end gap-3">
            <button (click)="clearForm()"
                    class="px-6 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200">
              Cancelar
            </button>
            <button (click)="saveSale()"
                    class="px-6 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600">
              Registrar Venta
            </button>
          </div>
        }
      </div>
    </div>
  `
})
export class SalesListPageComponent implements OnInit {
  private saleService = inject(SaleService);
  private productService = inject(ProductService);

  availableProducts = signal<Product[]>([]);
  formItems = signal<{
    productId: string;
    productName: string;
    unitPrice: number;
    quantity: number;
  }[]>([]);

  selectedProductId = '';
  selectedQuantity = 1;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe((response: any) => {
      this.availableProducts.set(response.data);
    });
  }

  addProduct(): void {
    const product = this.availableProducts().find(p => p.id === this.selectedProductId);
    if (!product) return;

    const existing = this.formItems().find(i => i.productId === product.id);
    if (existing) {
      this.formItems.update(items =>
        items.map(i => i.productId === product.id
          ? { ...i, quantity: i.quantity + this.selectedQuantity }
          : i
        )
      );
    } else {
      this.formItems.update(items => [...items, {
        productId: product.id,
        productName: product.name,
        unitPrice: product.price,
        quantity: this.selectedQuantity
      }]);
    }

    this.selectedProductId = '';
    this.selectedQuantity = 1;
  }

  removeItem(index: number): void {
    this.formItems.update(items => items.filter((_, i) => i !== index));
  }

  clearForm(): void {
    this.formItems.set([]);
  }

  getTotal(): number {
    return this.formItems().reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  saveSale(): void {
    const items = this.formItems().map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));

    this.saleService.createSale(items).subscribe({
      next: () => {
        this.formItems.set([]);
        this.loadProducts();
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
