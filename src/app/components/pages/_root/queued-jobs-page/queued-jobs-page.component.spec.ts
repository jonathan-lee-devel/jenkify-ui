import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueuedJobsPageComponent } from './queued-jobs-page.component';

describe('QueuedJobsPageComponent', () => {
  let component: QueuedJobsPageComponent;
  let fixture: ComponentFixture<QueuedJobsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueuedJobsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QueuedJobsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
