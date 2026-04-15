import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthStore } from '../../../core/stores/auth.store';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="p-6 space-y-8">
      <div class="text-center">
        <h1 class="text-3xl font-bold text-gray-900">
          Bienvenido, {{ authStore.userName() }}
        </h1>
        <p class="text-gray-500 mt-2">{{ today | date:'EEEE, d MMMM yyyy' }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <a routerLink="/products" 
           class="group bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all border-2 border-transparent hover:border-primary-500">
          <div class="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Gestion de Productos</h3>
          <p class="text-sm text-gray-500">Administra tu catalogo de productos, controla el inventario y mantén actualizado tu stock.</p>
          <ul class="mt-3 text-xs text-gray-500 space-y-1">
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Crear, editar y eliminar productos
            </li>
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Control de stock y inventario
            </li>
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Busqueda y filtros avanzados
            </li>
          </ul>
        </a>

        <a routerLink="/sales" 
           class="group bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all border-2 border-transparent hover:border-primary-500">
          <div class="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Punto de Venta</h3>
          <p class="text-sm text-gray-500">Registra ventas, gestiona pedidos y controla el estado de cada transaccion.</p>
          <ul class="mt-3 text-xs text-gray-500 space-y-1">
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Nueva venta con multiples productos
            </li>
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Seguimiento de estado de pedidos
            </li>
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Actualizacion automatica de stock
            </li>
          </ul>
        </a>

        <a routerLink="/reports" 
           class="group bg-white p-6 rounded-xl shadow-card hover:shadow-lg transition-all border-2 border-transparent hover:border-primary-500">
          <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Reportes</h3>
          <p class="text-sm text-gray-500">Visualiza el rendimiento de tu negocio con graficos y estadisticas detalladas.</p>
          <ul class="mt-3 text-xs text-gray-500 space-y-1">
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Filtrado por rango de fechas
            </li>
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Historial de ventas completo
            </li>
            <li class="flex items-center gap-1">
              <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/></svg>
              Paginacion de resultados
            </li>
          </ul>
        </a>
      </div>

      <div class="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-8 text-white text-center">
        <h2 class="text-2xl font-bold mb-2">Sistema de Gestion Integral</h2>
        <p class="text-primary-100 max-w-2xl mx-auto">
          Administra productos, ventas y genera reportes de manera eficiente. 
          Todo tu negocio en un solo lugar.
        </p>
      </div>
    </div>
  `
})
export class DashboardPageComponent {
  authStore = inject(AuthStore);
  today = new Date();
}
