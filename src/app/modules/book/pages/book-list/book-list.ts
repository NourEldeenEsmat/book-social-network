import { PageResponseBookResponse } from '../../../../api/models';
import { borrowBook, getAllBooks } from '../../../../api/functions';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { BookCard } from '../../componnents/book-card/book-card';
import { StrictHttpResponse } from '../../../../api/strict-http-response';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../../../common/loader/loader-serviec';
import { NotificationService } from '../../../../common/Toast/notification-service';
import { LoaderComponnent } from "../../../../common/loader/loader-componnent/loader-componnent";

@Component({
  standalone: true,
  selector: 'app-book-list',
  imports: [CommonModule, BookCard, LoaderComponnent],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.scss'],
})
export class BookList implements OnInit {
  constructor(
    private http: HttpClient,
    private api: ApiConfiguration,
    private loader: LoaderService,
    private toast: NotificationService,
  ) {}

  ngOnInit(): void {
    this.findallBooks();
  }

  page: number = 0;
  size: number = 4;
  loading = false;
  errorMessage = '';
  booksResponse: PageResponseBookResponse = { content: [] };
  books!: Observable<StrictHttpResponse<PageResponseBookResponse>>;
  isBorrowed: boolean = false;

  borrowBook(bookId: number) {
    this.loader.show();
    this.isBorrowed=false
    borrowBook(this.http, this.api.rootUrl, { 'book-id': bookId }).subscribe({
      next: (res) => {
        console.log(res);
        this.errorMessage = 'borrowed';
        this.toast.show(this.errorMessage, 'success');
        this.loader.hide();
      },
      error: (err) => {
        console.error(err);
        this.isBorrowed = true;
        this.errorMessage = err.error.error;
        this.toast.show(this.errorMessage, "error");
        this.loader.hide();
      },
    });
  }

  pervPage() {
    if (this.page <= 0) {
      return;
    }
    this.page = this.page - 1;
    this.findallBooks();
  }

  nextPage() {
    if (this.page >= (this.booksResponse.totalPages ?? 1) - 1) {
      return;
    }
    this.page = this.page + 1;
    this.findallBooks();
  }

  isLastPage(): boolean {
    return this.page === (this.booksResponse.totalPages ?? 1) - 1;
  }

  goToPage(index: number) {
    if (index === this.page) {
      return;
    }
    this.page = index;
    this.findallBooks();
  }

  findallBooks() {
    this.loading = true;
    this.errorMessage = '';
    this.books = getAllBooks(this.http, this.api.rootUrl, {
      page: this.page,
      size: this.size,
    });
    this.books.subscribe({
      next: (res) => {
        this.booksResponse = res.body;
      },
    });
  }
}
