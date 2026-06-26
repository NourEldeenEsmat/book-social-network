import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponnent } from './loader-componnent';

describe('LoaderComponnent', () => {
  let component: LoaderComponnent;
  let fixture: ComponentFixture<LoaderComponnent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderComponnent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoaderComponnent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
