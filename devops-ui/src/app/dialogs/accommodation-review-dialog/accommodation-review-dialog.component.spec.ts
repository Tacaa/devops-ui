import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewDialogComponent } from './accommodation-review-dialog.component';

describe('AccommodationReviewDialogComponent', () => {
  let component: AccommodationReviewDialogComponent;
  let fixture: ComponentFixture<AccommodationReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccommodationReviewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
