import { TestBed } from '@angular/core/testing';

import { GoogleAdDisplayService } from './google-ad-display.service';

describe('GoogleAdDisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleAdDisplayService = TestBed.get(GoogleAdDisplayService);
    expect(service).toBeTruthy();
  });
});
