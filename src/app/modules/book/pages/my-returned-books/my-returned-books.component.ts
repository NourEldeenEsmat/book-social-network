import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ApiConfiguration } from '../../../../api/api-configuration';
import {
  returnBook,
  getBorrowedBooks,
  getReturnedBooks,
} from '../../../../api/functions';
import { PageResponseBookHistoryResponse } from '../../../../api/models';
import { LoaderService } from '../../../../common/loader/loader-serviec';
import { NotificationService } from '../../../../common/Toast/notification-service';
import { BorrowedBooksCardComponent } from '../../componnents/borrowed-books-card/borrowed-books-card.component';
import { LoaderComponnent } from '../../../../common/loader/loader-componnent/loader-componnent';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-returned-books',
  standalone: true,
  imports: [BorrowedBooksCardComponent, LoaderComponnent, CommonModule],
  templateUrl: './my-returned-books.component.html',
  styleUrl: './my-returned-books.component.scss',
})
export class MyReturnedBooksComponent {
  constructor(
    private http: HttpClient,
    private api: ApiConfiguration,
    private loader: LoaderService,
    private toast: NotificationService,
  ) {}

  ngOnInit(): void {
    this.findReturnedBooks();
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
    this.findReturnedBooks();
  }

  nextPage() {
    if (this.page >= (this.history.totalPages ?? 1) - 1) {
      return;
    }
    this.page = this.page + 1;
    this.findReturnedBooks();
  }

  isLastPage(): boolean {
    return this.page === (this.history.totalPages ?? 1) - 1;
  }

  goToPage(index: number) {
    if (index === this.page) {
      return;
    }
    this.page = index;
    this.findReturnedBooks();
  }

  findReturnedBooks() {
    this.loader.show();
    getReturnedBooks(this.http, this.api.rootUrl, {
      page: this.page,
      size: this.size,
    }).subscribe({
      next: (res) => {
        this.history = res.body;
        this.loader.hide();
      },
      error: (err) => {
        this.toast.show(err.error.error, 'error');
        this.loader.hide();
      },
    });
  }
}
