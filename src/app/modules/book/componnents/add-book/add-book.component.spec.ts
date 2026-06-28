import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { AddBookComponent } from './add-book.component';

describe('AddBookComponent', () => {
  let component: AddBookComponent;
  let fixture: ComponentFixture<AddBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBookComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
