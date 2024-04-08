import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmQueuePageComponent } from './confirm-queue-page.component';

describe('ConfirmQueuePageComponent', () => {
  let component: ConfirmQueuePageComponent;
  let fixture: ComponentFixture<ConfirmQueuePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmQueuePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmQueuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
