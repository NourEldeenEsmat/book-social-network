import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiConfiguration } from '../../../../api/api-configuration';
import {
  PageResponseBookHistoryResponse,
  PageResponseBookResponse,
} from '../../../../api/models';
import { LoaderService } from '../../../../common/loader/loader-serviec';
import { NotificationService } from '../../../../common/Toast/notification-service';
import { LoaderComponnent } from '../../../../common/loader/loader-componnent/loader-componnent';
import { BookCard } from '../../componnents/book-card/book-card';
import { getBorrowedBooks, returnBook } from '../../../../api/functions';
import { CommonModule } from '@angular/common';
import { BorrowedBooksCardComponent } from '../../componnents/borrowed-books-card/borrowed-books-card.component';

@Component({
  selector: 'app-borrowed-books',
  standalone: true,
  imports: [LoaderComponnent, CommonModule, BorrowedBooksCardComponent],
  templateUrl: './borrowed-books.component.html',
  styleUrl: './borrowed-books.component.scss',
})
export class BorrowedBooksComponent {
  returnABook(bookId: number) {
    this.loader.show();
    returnBook(this.http, this.api.rootUrl, { 'book-id': bookId }).subscribe({
      next: (res) => {
        this.loader.hide();
        this.toast.show('returned successfuly', 'success');
      },
      error: (err) => {
        this.loader.hide();
        this.toast.show(err.error.error);
      },
    });
    this.findBorrowedBooks()
  }
  constructor(
    private http: HttpClient,
    private api: ApiConfiguration,
    private loader: LoaderService,
    private toast: NotificationService,
  ) {}

  ngOnInit(): void {
    this.findBorrowedBooks();
  }

  page: number = 0;
  size: number = 5;
  loading = false;
  errorMessage = '';
  history: PageResponseBookHistoryResponse = { content: [] };
  isBorrowed: boolean = false;

  pervPage() {
    if (this.page <= 0) {
      return;
    }
    this.page = this.page - 1;
    this.findBorrowedBooks();
  }

  nextPage() {
    if (this.page >= (this.history.totalPages ?? 1) - 1) {
      return;
    }
    this.page = this.page + 1;
    this.findBorrowedBooks();
  }

  isLastPage(): boolean {
    return this.page === (this.history.totalPages ?? 1) - 1;
  }

  goToPage(index: number) {
    if (index === this.page) {
      return;
    }
    this.page = index;
    this.findBorrowedBooks();
  }

  findBorrowedBooks() {
    this.loader.show();
    getBorrowedBooks(this.http, this.api.rootUrl, {
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (res) => {
        this.history = res.body;
        this.loader.hide();
      },
      error: (err) => {
        this.toast.show(err.error.error);
      },
    });
  }
}
