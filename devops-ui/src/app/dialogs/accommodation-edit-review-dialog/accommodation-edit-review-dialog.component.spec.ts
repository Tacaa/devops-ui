import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationEditReviewDialogComponent } from './accommodation-edit-review-dialog.component';

describe('AccommodationEditReviewDialogComponent', () => {
  let component: AccommodationEditReviewDialogComponent;
  let fixture: ComponentFixture<AccommodationEditReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationEditReviewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationEditReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
