import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/layout/sidebar/sidebar.component';
import { HeaderComponent } from '../../shared/components/layout/header/header.component';
import { ToastComponent } from '../../shared/components/ui/toast/toast.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent, ToastComponent],
  template: `
    <div class="flex h-screen bg-gray-50">
      <app-sidebar />
      <div class="flex-1 flex flex-col overflow-hidden">
        <app-header />
        <main class="flex-1 overflow-y-auto">
          <router-outlet />
        </main>
      </div>
    </div>
    <app-toast />
  `
})
export class PublicLayoutComponent {}
