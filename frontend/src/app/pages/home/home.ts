import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { TaskCard } from '../../components/task-card/task-card';
import { TaskService } from '../../services/task-service';
import { TaskModel } from '../../models/task-model';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [Header, TaskCard, MatAnchor, MatButtonModule, MatIconModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private taskService = inject(TaskService);

  tasks = signal<TaskModel[]>([]);
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);

  loadTasks() {
    this.isLoading.set(true);
    this.taskService.getTasks().subscribe({
      next: (data: TaskModel[]) => {
        console.log(data)
        this.tasks.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('API Error', err);
        this.isLoading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }
}
