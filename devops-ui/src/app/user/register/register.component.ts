import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserRegisterRequest, Role } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    street: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      const registerRequest: UserRegisterRequest = {
        username: formValues.username as string,
        password: formValues.password as string,
        firstname: formValues.first_name as string,
        lastname: formValues.last_name as string,
        email: formValues.email as string,
        role: Role.GUEST,
        address: {
          street: formValues.street as string,
          number: Number(formValues.number as string),
          city: formValues.city as string,
          country: formValues.country as string,
        },
      };

      this.authService.register(registerRequest);
    } else {
      console.log('Form is invalid');
    }
  }
}
