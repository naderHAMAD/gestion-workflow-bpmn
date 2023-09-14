import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

const ERROR_MESSAGES = {
  requiredFields: 'Please fill in all fields.',
  invalidEmail: 'Please enter a valid email address',
  weakPassword: 'Please enter a password with a minimum of 6 characters',
  registrationFailed: 'Registration failed',
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordStrength: string;

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.authService.register(this.username, this.email, this.password).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration Successful!',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: ERROR_MESSAGES.registrationFailed,
        });
      }
    );
  }

  validateForm(): boolean {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = ERROR_MESSAGES.requiredFields;
      this.showErrorAlert();
      return false;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = ERROR_MESSAGES.invalidEmail;
      this.showErrorAlert();
      return false;
    }

    if (!this.validatePasswordStrength()) {
      this.errorMessage = ERROR_MESSAGES.weakPassword;
      this.showErrorAlert();
      return false;
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  }

  validatePasswordStrength(): boolean {
    if (this.password.length < 6) {
      this.passwordStrength = 'weak';
      return false;
    } else if (this.password.length >= 6 && this.password.length <= 8) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'strong';
    }
    return true;
  }

  showErrorAlert(): void {
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: this.errorMessage,
      showConfirmButton: false,
    });
  }
}