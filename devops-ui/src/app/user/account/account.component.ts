import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.service';

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
    private userService: UserService
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
    if (this.isEditing) {
      this.accountForm.enable();
    } else {
      this.accountForm.disable();
    }
  }

  onSubmit() {
    if (this.accountForm.valid && this.user) {
      const formValue = this.accountForm.value;

      // If the password field is empty, do not update it
      if (!formValue.password) {
        delete formValue.password;
      }

      console.log('Updated account data:', formValue);
      this.toggleEdit(); // Disable fields after saving
    }
  }
}
