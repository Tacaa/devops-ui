import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostEditReviewDialogComponent } from './host-edit-review-dialog.component';

describe('HostEditReviewDialogComponent', () => {
  let component: HostEditReviewDialogComponent;
  let fixture: ComponentFixture<HostEditReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostEditReviewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostEditReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
