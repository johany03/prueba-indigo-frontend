import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layouts/public-layout/public-layout.component').then(m => m.PublicLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-page.component').then(m => m.DashboardPageComponent),
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/pages/products-list-page.component').then(m => m.ProductsListPageComponent),
      },
      {
        path: 'sales',
        loadComponent: () => import('./features/sales/pages/sales-list-page.component').then(m => m.SalesListPageComponent),
      },
      {
        path: 'reports',
        loadComponent: () => import('./features/reports/pages/reports-page.component').then(m => m.ReportsPageComponent),
      },
    ],
  },
  {
    path: 'auth',
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login-page.component').then(m => m.LoginPageComponent),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
