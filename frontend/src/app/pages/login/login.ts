import { Component, inject } from '@angular/core';
import { Authform, TAuthForm } from '../../components/authform/authform';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [Authform],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  authService = inject(AuthService);
  router = inject(Router);

  onLogin(formData: TAuthForm) {
    console.log('Login form submitted:', formData);
    this.authService.login(formData.username, formData.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        localStorage.setItem('username', response.username);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login error:', err);
      },
    });
    
  }
}
