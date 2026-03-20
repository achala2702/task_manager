import { Component, inject } from '@angular/core';
import { Authform, TAuthForm } from '../../components/authform/authform';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  imports: [Authform],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  onRegister(formData: TAuthForm) {
    console.log('Register form submitted:', formData);
    this.authService.register(formData.username, formData.password).subscribe({
      next: () => {
        console.log('Registration successful');
        this.snackBar.open('Registration Successful', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.snackBar.open(err, 'Try Again', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
