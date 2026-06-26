import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Main } from './pages/main/main';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main').then((m) => m.Main),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/book-list/book-list').then((m) => m.BookList),
      },
      // {path:'my-waiting-list', loadComponent: () => import('./pages/my-waiting-list/my-waiting-list').then((m) => m.MyWaitingList)},
      {
        path: 'my-returned-books',
        loadComponent: () =>
          import('./pages/my-returned-books/my-returned-books.component').then(
            (m) => m.MyReturnedBooksComponent,
          ),
      },
      {
        path: 'borrowed-books',
        loadComponent: () =>
          import('./pages/borrowed-books/borrowed-books.component').then(
            (m) => m.BorrowedBooksComponent,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookRoutingModule {}
