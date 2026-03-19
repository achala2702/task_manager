import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskModel } from '../models/task-model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient)
  private apiUrl = 'http://localhost:8080/api/task'

  getTasks() {
    return this.http.get<TaskModel[]>(this.apiUrl)
  }
}
