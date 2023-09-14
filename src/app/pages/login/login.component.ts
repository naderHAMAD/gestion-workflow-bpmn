import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  loginSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    this.errorMessage = ''; // Reset error message on form submit
    if (this.username === '' || this.password === '') {
      this.errorMessage = 'Please fill in all fields.';
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: this.errorMessage,
      });
      return;
    }
  
    this.loginSubscription = this.authService.login(this.username, this.password).subscribe(
      () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 1500
        });
  
        // Redirect based on user role
        const user = this.tokenStorageService.getUser();
        const roles = user.roles;
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/user-profile']);
        } else if (roles.includes('ROLE_USER')) {
          this.router.navigate(['/simple-user-profile']);
        } else if (roles.includes('ROLE_VALIDATOR')) {
          this.router.navigate(['/validator-profile']);
        } else {
          // Handle other roles or scenarios
          this.errorMessage = 'Invalid user role.';
        }
      },
      error => {
        this.errorMessage = 'Invalid credentials. Please try again !';
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.errorMessage,
        });
      }
    );
  }
}