import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookHistoryResponse } from '../../../../api/models';
import { Rate } from '../rate/rate';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-borrowed-books-card',
  standalone: true,
  imports: [Rate, CommonModule],
  templateUrl: './borrowed-books-card.component.html',
  styleUrl: './borrowed-books-card.component.scss',
})
export class BorrowedBooksCardComponent {
  private _isReturnedList: boolean = false;
  public get isReturnedList(): boolean {
    return this._isReturnedList;
  }
  @Input()
  public set isReturnedList(value: boolean) {
    this._isReturnedList = value;
  }
  @Output() _return: EventEmitter<number>=new EventEmitter();
  returnBook(bookId: number | undefined) {
    this._return.emit(bookId);
  }

  private _historyElement: BookHistoryResponse = {};
  public get historyElement(): BookHistoryResponse {
    return this._historyElement;
  }
  @Input()
  public set historyElement(value: BookHistoryResponse) {
    this._historyElement = value;
  }
}
