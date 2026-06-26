import { Routes } from '@angular/router';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.Register),
  },
  {
    path: 'activate-account',
    loadComponent: () =>
      import('./pages/activate-account/activate-account').then(
        (m) => m.ActivateAccount,
      ),
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./modules/book/book-module').then((m) => m.BookModule),
  },
 ];
