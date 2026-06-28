import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { getBooksByOwner } from '../../../../api/functions';
import { PageResponseBookResponse } from '../../../../api/models';
import { TokenService } from '../../../../api/token/token-service';
import { LoaderService } from '../../../../common/loader/loader-serviec';
import { NotificationService } from '../../../../common/Toast/notification-service';
import { AddBookComponent } from '../../componnents/add-book/add-book.component';
import { BookCard } from '../../componnents/book-card/book-card';
import { LoaderComponnent } from '../../../../common/loader/loader-componnent/loader-componnent';

@Component({
  selector: 'app-my-owned-books',
  standalone: true,
  imports: [CommonModule, BookCard, LoaderComponnent],
  templateUrl: './my-owned-books.component.html',
  styleUrl: './my-owned-books.component.scss',
})
export class MyOwnedBooksComponent implements OnInit {
  page = 0;
  size = 4;
  booksResponse: PageResponseBookResponse = { content: [] };
  currentUserName = '';

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private api: ApiConfiguration,
    private loader: LoaderService,
    private toast: NotificationService,
    private tokenService: TokenService,
  ) {}

  ngOnInit(): void {
    this.currentUserName = this.tokenService.getUsernameFromToken() ?? '';
    this.loadMyBooks();
  }

  openAddBookDialog(): void {
    this.dialog
      .open(AddBookComponent, {
        width: '560px',
        maxWidth: '95vw',
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.loadMyBooks();
        }
      });
  }

  closeDialog(){
    this.dialog.closeAll()
  }

  loadMyBooks(): void {
    this.loader.show();

    getBooksByOwner(this.http, this.api.rootUrl, {
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (res) => {
        this.booksResponse = res.body ?? { content: [] };
        this.loader.hide();
      },
      error: (err) => {
        this.loader.hide();
        this.toast.show(
          err?.error?.error || 'Unable to load your books.',
          'error',
        );
      },
    });
  }

  pervPage() {
    if (this.page <= 0) {
      return;
    }
    this.page = this.page - 1;
    this.loadMyBooks();
  }

  nextPage() {
    if (this.page >= (this.booksResponse.totalPages ?? 1) - 1) {
      return;
    }
    this.page = this.page + 1;
    this.loadMyBooks();
  }

  isLastPage(): boolean {
    return this.page === (this.booksResponse.totalPages ?? 1) - 1;
  }

  goToPage(index: number) {
    if (index === this.page) {
      return;
    }
    this.page = index;
    this.loadMyBooks();
  }
}
