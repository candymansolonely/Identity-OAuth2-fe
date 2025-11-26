import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/auth/auth.component').then(m => m.AuthComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'login',
        loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
      },
    ]
  },
  {
    path: 'unauthorize',
    loadComponent: () => import('./components/unauthorize/unauthorize.component').then(m => m.UnauthorizeComponent)
  }
];
