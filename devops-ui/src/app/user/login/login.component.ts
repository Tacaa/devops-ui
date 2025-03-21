import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('isabellathompson', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.get('username')?.value as string,
        this.loginForm.get('password')?.value as string
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
