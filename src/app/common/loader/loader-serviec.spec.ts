import { TestBed } from '@angular/core/testing';

import { LoaderServiec } from './loader-serviec';

describe('LoaderServiec', () => {
  let service: LoaderServiec;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderServiec);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
