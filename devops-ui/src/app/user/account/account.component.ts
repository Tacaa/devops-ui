import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  isEditing = false;
  user: User | undefined;

  accountForm = new FormGroup({
    first_name: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    last_name: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    username: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    email: new FormControl({ value: '', disabled: true }, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.user = this.userService.getUserById(id);

      if (this.user) {
        this.accountForm.patchValue({
          first_name: this.user.firstName,
          last_name: this.user.lastName,
          username: this.user.username,
          email: `${this.user.username}@example.com`, // Example email generation
        });
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.isEditing ? this.accountForm.enable() : this.accountForm.disable();
  }

  onSubmit() {
    if (this.accountForm.valid && this.user) {
      const formValue = this.accountForm.value;

      if (!formValue.password) {
        delete formValue.password;
      }

      console.log('Updated account data:', formValue);
      this.toggleEdit(); // Disable fields after saving
    }
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteAccountDialog, {
      width: '300px',
      data: { message: 'Are you sure you want to delete the account?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Account deleted'); // Handle delete logic here
      } else {
        console.log('Deletion canceled');
      }
    });
  }
}

@Component({
  selector: 'app-delete-account-dialog',
  template: `
    <h2 mat-dialog-title>Are you sure?</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-button color="warn" (click)="confirmDelete()">Delete</button>
    </mat-dialog-actions>
  `,
})
export class DeleteAccountDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
  }
}
