import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedBooksCardComponent } from './borrowed-books-card.component';

describe('BorrowedBooksCardComponent', () => {
  let component: BorrowedBooksCardComponent;
  let fixture: ComponentFixture<BorrowedBooksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowedBooksCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BorrowedBooksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
