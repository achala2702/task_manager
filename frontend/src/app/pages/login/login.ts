import { Component, inject } from '@angular/core';
import { Authform, TAuthForm } from '../../components/authform/authform';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [Authform],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  onLogin(formData: TAuthForm) {
    console.log('Login form submitted:', formData);
    this.authService.login(formData.username, formData.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);

        this.snackBar.open(`Welcome back, ${response.username}!`, 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });

        localStorage.setItem('username', response.username);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.snackBar.open('Login failed. Please check your credentials.', 'Try Again', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
