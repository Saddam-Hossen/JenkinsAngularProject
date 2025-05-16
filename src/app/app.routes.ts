import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    pathMatch: 'full', // very important
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./sidebar/sidebar.component').then((m) => m.SidebarComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
