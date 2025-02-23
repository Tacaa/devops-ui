import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-host-review-dialog',
  templateUrl: './host-review-dialog.component.html',
  styleUrls: ['./host-review-dialog.component.css'],
})
export class HostReviewDialogComponent {
  review: number = 5;

  constructor(
    public dialogRef: MatDialogRef<HostReviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { hostId: number }
  ) {}

  submitReview(): void {
    this.dialogRef.close({
      review: this.review,
      hostId: this.data.hostId,
      reviewerId: 1,
    });
  }
}
