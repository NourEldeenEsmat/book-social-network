import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { Rate } from '../rate/rate';
import {
  BookResponse,
  FeedbackRequest,
  FeedbackResponse,
} from '../../../../api/models';
import {
  findBookById,
  getFeedbacksByBookId,
  postFeedback,
} from '../../../../api/functions';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration } from '../../../../api/api-configuration';
import { LoaderComponnent } from '../../../../common/loader/loader-componnent/loader-componnent';
import { NotificationService } from '../../../../common/Toast/notification-service';
import { LoaderService } from '../../../../common/loader/loader-serviec';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListRange } from '@angular/cdk/collections';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [Rate, LoaderComponnent, MatDialogModule, FormsModule, CommonModule],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss',
})
export class BookDetailsComponent implements OnInit {
  ngOnInit(): void {
    this.getBook();
  }

  constructor(
    private dialogRef: MatDialogRef<BookDetailsComponent>,
    private http: HttpClient,
    private api: ApiConfiguration,
    private loader: LoaderService,
    private toast: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: { bookId: number },
  ) {
    console.log(data);
  }

  comments: Array<FeedbackResponse> = [];
  rateInput: number = 0;
  commentVisable: boolean = false;
  bookResponse: BookResponse = {};
  private _bookCover: string = '';
  feedback: FeedbackRequest = {
    bookId: 0,
    comment: '',
    note: 0,
  };

  public get bookCover(): string {
    return this._bookCover;
  }
  public set bookCover(value: string) {
    this._bookCover = 'data:image/jpg;base64,' + value;
  }
  private _bookId: number = 0;
  public get bookId(): number {
    return this._bookId;
  }
  @Input()
  public set bookId(value: number) {
    this._bookId = this.data.bookId || value;
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
        this.loader.hide();
      },
      error: (err) => {
        this.loader.hide();
        this.toast.show(err, 'error');
      },
    });
  }

  onComment() {
    this.commentVisable = !this.commentVisable;
    this.getComments();
  }

  submitFeedBack() {
    this.loader.show();
    this.feedback.bookId = this.data.bookId;
    this.feedback.note = this.rateInput;
    console.log(this.feedback.bookId);
    postFeedback(this.http, this.api.rootUrl, {
      body: this.feedback,
    }).subscribe({
      next: (res) => {
        this.loader.hide();
        this.toast.show('submited with id: ' + res.body, 'success');
        this.getComments();
      },
      error: (err) => {
        this.loader.hide();
        if (err.error.validationErrors == 200)
          this.toast.show('Error : please fill rate', 'error', 5000);
        else if (err.error.validationErrors == 203)
          this.toast.show('Error : please fill comment', 'error', 5000);
        else if ((err.error.validationErrors == 200, 203))
          this.toast.show(
            'Error : please fill rate and comment',
            'error',
            5000,
          );
        else this.toast.show('Error :' + err.error.error, 'error', 5000);
      },
    });
  }

  getComments() {
    this.loader.show();
    getFeedbacksByBookId(this.http, this.api.rootUrl, {
      'book-id': this.data.bookId,
    }).subscribe({
      next: (res) => {
        this.comments = res.body.content!;
        console.log(res);
        this.loader.hide();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  closeDialog() {
    this.dialogRef.close(false);
  }
  
}
