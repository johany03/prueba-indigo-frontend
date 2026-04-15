import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      <!-- Logo -->
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">SP</span>
          </div>
          <span class="font-heading font-semibold text-lg text-gray-900">
            Sistema PV
          </span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <a routerLink="/dashboard" routerLinkActive="active"
           class="nav-item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          <span>Dashboard</span>
        </a>

        <a routerLink="/products" routerLinkActive="active"
           class="nav-item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
          </svg>
          <span>Productos</span>
        </a>

        <a routerLink="/sales" routerLinkActive="active"
           class="nav-item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <span>Ventas</span>
        </a>

        <a routerLink="/reports" routerLinkActive="active"
           class="nav-item">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <span>Reportes</span>
        </a>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200">
        <div class="text-xs text-gray-500 text-center">
          Sistema de Productos y Ventas
          <br/>
          v1.0.0
        </div>
      </div>
    </aside>
  `,
  styles: [`
    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      border-radius: 0.5rem;
      color: #4b5563;
      transition: all 150ms;
    }
    
    .nav-item:hover {
      background-color: #f3f4f6;
      color: #111827;
    }
    
    .nav-item.active {
      background-color: rgb(239 246 255);
      color: #2563eb;
      font-weight: 500;
    }
  `]
})
export class SidebarComponent {}
