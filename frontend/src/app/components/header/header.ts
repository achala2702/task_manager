import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatAnchor, MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  username = localStorage.getItem('username');
  isLoggedIn = !!this.username;
  router = inject(Router);
  authService = inject(AuthService);

  handleLoginBtnClick() {
    if (this.isLoggedIn) {
      this.logout();
    } else {
     this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('username');
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logout successful');
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      },
    });
  }
}
