import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';

export interface TUser {
  username: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/auth`;
  
  login(username: string, password: string) {
    return this.http.post<TUser>(`${this.apiUrl}/login`, { username, password }, {withCredentials: true}).pipe(catchError(this.handleError));
  }
  register(username: string, password: string) {
    return this.http.post<void>(`${this.apiUrl}/register`, { username, password }).pipe(catchError(this.handleError));
  }

  logout() {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}, {withCredentials: true}).pipe(catchError(this.handleError));
  }

    private handleError(error: any) {
      console.error('API error:', error);
      return throwError(() => new Error('Failed to process request'));
    }
}
