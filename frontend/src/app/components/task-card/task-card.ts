import { Component, inject, input, output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DropDown } from '../drop-down/drop-down';
import { StatusType, TaskModel } from '../../models/task-model';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../services/task-service';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '../dialog/dialog';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, MatButton, DropDown, MatIconModule],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  private taskService = inject(TaskService);
  private dialog = inject(MatDialog);

  task = input.required<TaskModel>();

  editRequest = output<TaskModel>();
  deleteRequest = output<number>();
  statusChangeRequest = output<{taskId: number, newStatus: StatusType}>();

  onEditClick() {
    this.editRequest.emit(this.task());
  }

  onDeleteClick(taskId:number) {
    const dialogRef = this.dialog.open(Dialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(taskId).subscribe({
          next: () => {
            this.deleteRequest.emit(taskId);
          },
          error: (err) => {
            console.error('Delete Failed', err);
          },
        });
      }
    });
  }

  onStatusChange(newStatus: StatusType) {
    this.statusChangeRequest.emit({ taskId: this.task().taskId, newStatus });
  }
}
