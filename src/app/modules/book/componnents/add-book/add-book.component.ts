import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { findBookById, saveBook, updateCover } from '../../../../api/functions';
import { BookRequest } from '../../../../api/models/book-request';
import { LoaderService } from '../../../../common/loader/loader-serviec';
import { NotificationService } from '../../../../common/Toast/notification-service';
import { BookResponse } from '../../../../api/models/book-response';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.scss',
})
export class AddBookComponent {
  book: BookRequest = {
    id: undefined,
    title: '',
    authorName: '',
    isbn: '',
    synopsis: '',
    shareable: true,
  };
  submitting = false;
  selectedImage: any;
  id: number = 0;
  private _bookCover: string = '';
  bookResponse: BookResponse = {
    id: 0,
    title: '',
    authorName: '',
    isbn: '',
    synopsis: '',
    shareable: undefined,
  };

  public get bookCover(): string {
    return this._bookCover;
  }
  public set bookCover(value: string) {
    this._bookCover = 'data:image/jpg;base64,' + value;
  }

  constructor(
    private dialogRef: MatDialogRef<AddBookComponent>,
    private http: HttpClient,
    private api: ApiConfiguration,
    private loader: LoaderService,
    private toast: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number },
  ) {
    this.id = data.bookId;
    if (this.id != 0) {
      this.book.id = this.id;
      this.getBook();
    }
  }

  submit(): void {
    console.log(this.book);
    if (
      !this.book.title ||
      !this.book.authorName ||
      !this.book.isbn ||
      !this.book.synopsis
    ) {
      this.toast.show('Please fill in all required fields.', 'error');
      return;
    }

    this.submitting = true;
    this.loader.show();

    saveBook(this.http, this.api.rootUrl, { body: this.book }).subscribe({
      next: (res) => {
        const formData = new FormData();
        formData.append('file', this.selectedImage);
        updateCover(this.http, this.api.rootUrl, {
          'book-id': res.body,
          body: formData,
        }).subscribe({
          next: () => {
            this.loader.hide();
            if(this.id==0)
            this.toast.show('Book created successfully.', 'success');
          else
            this.toast.show('Book updated successfully.', 'success');
            this.dialogRef.close(true);
          },
          error: (err) => {
            this.loader.hide();
            this.submitting = false;
            this.toast.show(
              err?.error?.error + ' Unable to uploade cover.' ||
                'Unable to uploade cover.',
              'error',
            );
          },
        });
      },
      error: (err) => {
        this.loader.hide();
        this.submitting = false;
        this.toast.show(err?.error?.error || 'Unable to create book.', 'error');
      },
    });
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  previewImage(event: any): void {
    const input = event.target;
    const file = input.files[0];
    this.selectedImage = file;
    console.log(this.selectedImage);
    if (!file) {
      return;
    }
    const imageUrl = URL.createObjectURL(file);
    const coverImage = document.getElementById(
      'cover',
    ) as HTMLImageElement | null;
    if (coverImage) {
      coverImage.src = imageUrl;
      coverImage.alt = file.name;
      coverImage.onload = () => URL.revokeObjectURL(imageUrl);
    }
  }
  getBook() {
    this.loader.show();
    console.log(this.data.bookId);
    findBookById(this.http, this.api.rootUrl, {
      'book-id': this.data.bookId,
    }).subscribe({
      next: (res) => {
        this.bookResponse = res.body;
        this._bookCover = 'data:image/jpg;base64,' + this.bookResponse.cover;
        this.book.id = this.bookResponse.id;
        this.book.authorName = this.bookResponse.authorName!;
        this.book.synopsis = this.bookResponse.synopsis!;
        this.book.isbn = this.bookResponse.isbn!;
        this.book.shareable = this.bookResponse.shareable!;
        this.book.title = this.bookResponse.title!;
        this.loader.hide();
      },
      error: (err) => {
        this.loader.hide();
        this.toast.show(err, 'error');
      },
    });
  }
}
