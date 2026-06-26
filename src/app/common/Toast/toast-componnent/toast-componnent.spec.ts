import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastComponnent } from './toast-componnent';

describe('ToastComponnent', () => {
  let component: ToastComponnent;
  let fixture: ComponentFixture<ToastComponnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponnent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponnent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
