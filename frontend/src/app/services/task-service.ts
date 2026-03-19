import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TaskModel } from '../models/task-model';
import { environment } from '../../environments/environment.development';
import { TaskFormData } from '../components/task-form/task-form';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/task`;

  getTasks() {
    return this.http.get<TaskModel[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  createTask(task: TaskFormData) {
    return this.http.post<TaskModel>(this.apiUrl, task).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(taskId: number, task: TaskFormData) {
    return this.http.put<TaskModel>(`${this.apiUrl}/${taskId}`, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => new Error('Failed to process request'));
  }
}