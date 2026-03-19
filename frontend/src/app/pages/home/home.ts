import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { TaskService } from '../../services/task-service';
import { TaskModel } from '../../models/task-model';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { TaskForm, TaskFormData } from '../../components/task-form/task-form';
import { TaskCard } from '../../components/task-card/task-card';
import { single } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Header, TaskCard, MatAnchor, MatButtonModule, MatIconModule, TaskForm],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private taskService = inject(TaskService);

  tasks: TaskModel[] = [];
  errorMessage = signal<string | null>(null);
  isLoading = signal<boolean>(false);
  isTaskFormOpen = signal<boolean>(false);
  editingTask: TaskModel | null = null;

  openEditForm(task: TaskModel) {
    this.editingTask = task;
    this.isTaskFormOpen.set(true);
  }

  closeTaskForm() {
    this.isTaskFormOpen.set(false);
  }

  openAddForm() {
    this.editingTask = null;
    this.isTaskFormOpen.set(true);
  }

  loadTasks() {
    this.isLoading.set(true);
    this.taskService.getTasks().subscribe({
      next: (data: TaskModel[]) => {
        this.tasks = data;
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

  onDeleteRequest(taskId: number) {
    this.tasks = this.tasks.filter(task => task.taskId !== taskId);
  }

  onFormSubmitCreate(formData: TaskFormData) {
    this.taskService.createTask(formData).subscribe({
      next: () => {
        this.loadTasks();
        this.closeTaskForm();
      },
      error: (err) => {
        console.error('Create Failed', err);
      },
    });
  }
}