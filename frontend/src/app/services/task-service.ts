import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { StatusType, TaskModel } from '../models/task-model';
import { environment } from '../../environments/environment.development';
import { TaskFormData } from '../components/task-form/task-form';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiBaseUrl}/task`;

  getTasks() {
    return this.http.get<TaskModel[]>(this.apiUrl, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  createTask(task: TaskFormData) {
    return this.http.post<TaskModel>(this.apiUrl, task, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  updateTask(taskId: number, task: TaskFormData) {
    return this.http
      .put<TaskModel>(`${this.apiUrl}/${taskId}`, task, {withCredentials: true})
      .pipe(catchError(this.handleError));
  }

  updateStatus(taskId: number, status: StatusType) {
    return this.http
      .patch<void>(`${this.apiUrl}/${taskId}/status`, { status }, {withCredentials: true})
      .pipe(catchError(this.handleError));
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`, {withCredentials: true}).pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API error:', error.error.errors);
    return throwError(() => new Error(error.error.errors || 'Failed to process request'));
  }
}
