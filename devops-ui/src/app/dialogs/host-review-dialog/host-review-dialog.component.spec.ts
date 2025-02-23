import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostReviewDialogComponent } from './host-review-dialog.component';

describe('HostReviewDialogComponent', () => {
  let component: HostReviewDialogComponent;
  let fixture: ComponentFixture<HostReviewDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostReviewDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostReviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
