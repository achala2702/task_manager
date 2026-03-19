import { Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { TaskService } from '../../services/task-service';
import { StatusType, TaskModel } from '../../models/task-model';
import { MatAnchor, MatButtonModule } from "@angular/material/button";
import { MatIconModule } from '@angular/material/icon';
import { TaskForm, TaskFormData } from '../../components/task-form/task-form';
import { TaskCard } from '../../components/task-card/task-card';

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
      next: (newTask) => {
        this.tasks.push(newTask);
        this.closeTaskForm();
      },
      error: (err) => {
        console.error('Create Failed', err);
      },
    });
  }

  onFormSubmitEdit({ taskId, task }: { taskId: number; task: TaskFormData }) {
    this.taskService.updateTask(taskId, task).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.taskId === taskId);
        if(index !== -1) {
          this.tasks[index] = updatedTask;
        }
        this.closeTaskForm();
      },
      error: (err) => {
        console.error('Update Failed', err);
        this.errorMessage.set('Failed to update task. Please try again.');
      },
    });
  }

  onStatusChange({ taskId, newStatus }: { taskId: number; newStatus: StatusType }) {
    this.taskService.updateStatus(taskId, newStatus).subscribe({
      next: () => {
        const task = this.tasks.find(t => t.taskId === taskId);
        if (task) {
          task.status = newStatus;
        }
      },
      error: (err) => {
        console.error('Status Update Failed', err);
        this.errorMessage.set('Failed to update status. Please try again.');
      },
    });
  }
}