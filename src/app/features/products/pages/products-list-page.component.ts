import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { Product } from '../../../core/models';

@Component({
  selector: 'app-products-list-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Productos</h2>
        <button (click)="openForm()"
                class="px-4 py-2 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors">
          + Nuevo producto
        </button>
      </div>

      <div class="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          [(ngModel)]="searchQuery"
          (ngModelChange)="onSearch()"
          placeholder="Buscar productos..."
          class="flex-1 h-10 px-3 rounded-lg border border-gray-300 bg-white"
        />
      </div>

      <div class="bg-white rounded-xl shadow-card overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              @for (product of products(); track product.id) {
                <tr class="hover:bg-gray-50">
                  <td class="px-4 py-3">
                    <img [src]="product.imageUrl" [alt]="product.name"
                         class="w-12 h-12 object-cover rounded-lg"/>
                  </td>
                  <td class="px-4 py-3">
                    <div class="font-medium text-gray-900">{{ product.name }}</div>
                    <div class="text-xs text-gray-400">ID: {{ product.id }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <span class="font-semibold text-primary-500">{{ product.price | currency }}</span>
                  </td>
                  <td class="px-4 py-3">
                    <span class="px-2 py-1 text-xs font-medium rounded-full"
                          [class.bg-green-100]="product.stock > 10"
                          [class.text-green-700]="product.stock > 10"
                          [class.bg-yellow-100]="product.stock <= 10 && product.stock > 0"
                          [class.text-yellow-700]="product.stock <= 10 && product.stock > 0"
                          [class.bg-red-100]="product.stock === 0"
                          [class.text-red-700]="product.stock === 0">
                      {{ product.stock }} uds
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex gap-2">
                      <button (click)="editProduct(product)" 
                              class="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200">
                        Editar
                      </button>
                      <button (click)="confirmDelete(product)" 
                              class="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg border border-red-200">
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="px-4 py-12 text-center text-gray-500">
                    No se encontraron productos
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        
        @if (totalPages() > 1) {
          <div class="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
            <div class="text-sm text-gray-500">
              Mostrando {{ (currentPage() - 1) * pageSize + 1 }} - {{ Math.min(currentPage() * pageSize, totalItems()) }} de {{ totalItems() }}
            </div>
            <div class="flex gap-2">
              <button (click)="goToPage(currentPage() - 1)" 
                      [disabled]="currentPage() === 1"
                      class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
                Anterior
              </button>
              @for (page of getPageNumbers(); track page) {
                <button (click)="goToPage(page)" 
                        [class.bg-primary-500]="page === currentPage()"
                        [class.text-white]="page === currentPage()"
                        class="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100">
                  {{ page }}
                </button>
              }
              <button (click)="goToPage(currentPage() + 1)" 
                      [disabled]="currentPage() === totalPages()"
                      class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100">
                Siguiente
              </button>
            </div>
          </div>
        }
      </div>

      <div class="text-sm text-gray-500">
        Total: {{ totalItems() }} productos
      </div>

      @if (showForm) {
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" (click)="closeForm()">
          <div class="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto" (click)="$event.stopPropagation()">
            <div class="p-5 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h3 class="text-lg font-semibold text-gray-900">
                {{ editingProduct ? 'Editar producto' : 'Nuevo producto' }}
              </h3>
              <button (click)="closeForm()" class="p-1 hover:bg-gray-100 rounded">X</button>
            </div>
            <form (ngSubmit)="saveProduct()" class="p-5 space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input type="text" [(ngModel)]="formData.name" name="name" required
                       class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white"/>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                  <input type="number" [(ngModel)]="formData.price" name="price" step="0.01" required min="0"
                         class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white"/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input type="number" [(ngModel)]="formData.stock" name="stock" required min="0"
                         class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white"/>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
                <input type="url" [(ngModel)]="formData.imageUrl" name="imageUrl" placeholder="https://..."
                       class="w-full h-10 px-3 rounded-lg border border-gray-300 bg-white"/>
                <p class="text-xs text-gray-500 mt-1">Ingresa una URL de imagen o deja vacio para usar una imagen por defecto</p>
              </div>
              @if (formData.imageUrl) {
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Vista previa</label>
                  <img [src]="formData.imageUrl" alt="Preview" class="w-32 h-32 object-cover rounded-lg border border-gray-300"/>
                </div>
              }
              <div class="flex gap-3 pt-4">
                <button type="button" (click)="closeForm()" class="flex-1 py-2 bg-gray-100 rounded-lg hover:bg-gray-200">Cancelar</button>
                <button type="submit" class="flex-1 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `
})
export class ProductsListPageComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  totalItems = signal(0);
  totalPages = signal(1);
  currentPage = signal(1);
  pageSize = 10;
  
  searchQuery = '';
  showForm = false;
  editingProduct: Product | null = null;
  
  Math = Math;

  formData = {
    name: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  };

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts({
      search: this.searchQuery || undefined,
      page: this.currentPage(),
      pageSize: this.pageSize
    }).subscribe((response: any) => {
      this.products.set(response.data);
      this.totalItems.set(response.totalRecords);
      this.totalPages.set(response.totalPages);
    });
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.loadProducts();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      this.loadProducts();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const total = this.totalPages();
    const current = this.currentPage();
    
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

  openForm(): void {
    this.editingProduct = null;
    this.formData = {
      name: '',
      price: 0,
      stock: 0,
      imageUrl: ''
    };
    this.showForm = true;
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.formData = {
      name: product.name,
      price: product.price,
      stock: product.stock,
      imageUrl: product.imageUrl || ''
    };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.editingProduct = null;
  }

  saveProduct(): void {
    if (!this.formData.name || this.formData.price <= 0) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct.id, this.formData).subscribe({
        next: () => {
          this.closeForm();
          this.loadProducts();
        },
        error: (err) => console.error('Error:', err)
      });
    } else {
      this.productService.createProduct(this.formData).subscribe({
        next: () => {
          this.closeForm();
          this.totalPages.set(1);
          this.currentPage.set(1);
          this.loadProducts();
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  confirmDelete(product: Product): void {
    if (confirm('Eliminar "' + product.name + '"?')) {
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          this.loadProducts();
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
