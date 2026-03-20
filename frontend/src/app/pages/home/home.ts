import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { TaskService } from '../../services/task-service';
import { StatusType, TaskModel } from '../../models/task-model';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskForm, TaskFormData } from '../../components/task-form/task-form';
import { TaskCard } from '../../components/task-card/task-card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-home',
  imports: [Header, TaskCard, MatAnchor, MatButtonModule, MatIconModule, TaskForm, MatSelectModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private taskService = inject(TaskService);
  private snackBar = inject(MatSnackBar);

  tasks = signal<TaskModel[]>([]);
  isLoading = signal<boolean>(false);
  isTaskFormOpen = signal<boolean>(false);
  editingTask: TaskModel | null = null;
  currentFilter = signal<StatusType | 'ALL'>('ALL');

  filteredTasks = computed(() => {
    const filter = this.currentFilter();
    console.log(filter);
    const currentTasks = this.tasks();
    if (filter === 'ALL') {
      return currentTasks;
    }
    return currentTasks.filter((task: TaskModel) => task.status === filter);
  });

  setFilter(filter: StatusType | 'ALL') {
    this.currentFilter.set(filter);
  }

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

  onDeleteRequest(taskId: number) {
    this.tasks.set(this.tasks().filter((task) => task.taskId !== taskId));
  }

  onFormSubmitCreate(formData: TaskFormData) {
    this.taskService.createTask(formData).subscribe({
      next: (newTask) => {
        this.tasks.set([newTask, ...this.tasks()]);
        this.closeTaskForm();
        this.snackBar.open(`Task created successfully!`, 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        console.error('Create Failed', err);
        this.snackBar.open('Failed to create task. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  onFormSubmitEdit({ taskId, task }: { taskId: number; task: TaskFormData }) {
    this.taskService.updateTask(taskId, task).subscribe({
      next: (updatedTask) => {
        const current = this.tasks();
        const index = current.findIndex((task) => task.taskId === taskId);
        if (index !== -1) {
          current[index] = updatedTask;
          this.tasks.set([...current]);
        }
        this.closeTaskForm();

        this.snackBar.open(`Task updated successfully!`, 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      },
      error: (err) => {
        console.error('Update Failed', err);
        this.snackBar.open('Failed to update task. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }

  onStatusChange({ taskId, newStatus }: { taskId: number; newStatus: StatusType }) {
    this.taskService.updateStatus(taskId, newStatus).subscribe({
      next: () => {
        const task = this.tasks().find((t) => t.taskId === taskId);
        if (task) {
          task.status = newStatus;
          this.currentFilter.set(newStatus);
        }
      },
      error: (err) => {
        console.error('Status Update Failed', err);
        this.snackBar.open('Failed to update status. Please try again.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
