import { Component, inject } from '@angular/core';
import { Authform, TAuthForm } from '../../components/authform/authform';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [Authform],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister(formData: TAuthForm) {
    console.log('Register form submitted:', formData);
    this.authService.register(formData.username, formData.password).subscribe({
      next: () => {
        console.log('Registration successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
      },
    });
  }
}
