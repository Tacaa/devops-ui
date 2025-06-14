import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Observable } from 'rxjs';
import {
  User,
  UserRegisterRequest,
  Role,
  UpdateUserDTO,
} from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  isEditing = false;
  user$: Observable<User> | undefined;
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
    id: new FormControl({ value: 0, disabled: true }, Validators.required),
    street: new FormControl({ value: '', disabled: true }, Validators.required),
    number: new FormControl({ value: 0, disabled: true }, Validators.required),
    city: new FormControl({ value: '', disabled: true }, Validators.required),
    country: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    password: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.authService.getUserId());
    console.log(id);

    this.user$ = this.userService.getUserById(id);
    this.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.accountForm.patchValue({
          first_name: user.firstName,
          last_name: user.lastName,
          username: user.username,
          email: user.email,
          id: user.address?.id,
          street: user.address?.street,
          number: user.address?.number,
          city: user.address?.city,
          country: user.address?.country,
        });
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.isEditing ? this.accountForm.enable() : this.accountForm.disable();
  }

  getRoleAsRole() {
    const role = this.authService.getUserRole() as string;
    if (role === 'GUEST') {
      return Role.GUEST;
    } else if (role === 'HOST') {
      return Role.HOST;
    } else return console.error('Error');
  }

  onSubmit() {
    if (this.accountForm.valid && this.user) {
      const formValue = this.accountForm.value;

      const updateRequest: UpdateUserDTO = {
        username: formValue.username as string,
        password: formValue.password as string,
        firstname: formValue.first_name as string,
        lastname: formValue.last_name as string,
        email: formValue.email as string,
        address: {
          id: formValue.id as number,
          street: formValue.street as string,
          number: Number(formValue.number as number),
          city: formValue.city as string,
          country: formValue.country as string,
        },
      };

      this.userService
        .updateUser(updateRequest, this.authService.getUserId() as number)
        .subscribe(
          () => {
            console.log('Account updated successfully');
            alert('Account updated successfully');
            this.toggleEdit(); // Disable fields after saving
          },
          (error) => {
            console.error('Error updating account', error);
            alert(error.error.message);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteAccountDialog, {
      width: '300px',
      data: { message: 'Are you sure you want to delete the account?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const deleteUser = this.authService.getUserId() as number;
        this.userService.deleteUser(deleteUser).subscribe({
          next: (response) => {
            console.log('User deleted successfully', response);
            this.authService.logout();
          },
          error: (error) => {
            console.error('Error deleting user', error);
            alert(`Cannot delete: ${error.error.message}!`);
          },
        });
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
