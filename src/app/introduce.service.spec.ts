import { TestBed, inject } from '@angular/core/testing';

import { IntroduceService } from './introduce.service';

describe('IntroduceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntroduceService]
    });
  });

  it('should be created', inject([IntroduceService], (service: IntroduceService) => {
    expect(service).toBeTruthy();
  }));
});
