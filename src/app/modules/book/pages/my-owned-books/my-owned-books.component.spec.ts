import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOwnedBooksComponent } from './my-owned-books.component';

describe('MyOwnedBooksComponent', () => {
  let component: MyOwnedBooksComponent;
  let fixture: ComponentFixture<MyOwnedBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyOwnedBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyOwnedBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
