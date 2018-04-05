import { TestBed, inject } from '@angular/core/testing';

import { ScheduleService } from './schedule.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('ScheduleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleService, HttpClient],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([ScheduleService], (service: ScheduleService) => {
    expect(service).toBeTruthy();
  }));
});
