import { Component, input, OnInit, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TaskModel } from '../../models/task-model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export type TaskFormData = Omit<TaskModel, 'taskId' | 'status'>;

@Component({
  selector: 'app-task-form',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-form.html',
  styleUrl: './task-form.scss',
})
export class TaskForm implements OnInit {
  initialData = input<TaskModel | null>(null);
  close = output<void>();
  submitCreate = output<TaskFormData>();
  submitEdit = output<{ taskId: number; task: TaskFormData }>();

  onSubmit() {
    if (this.taskForm.valid) {
      const formData: TaskFormData = {
        title: this.taskForm.value.title || '',
        description: this.taskForm.value.description || '',
      };

      const editingData = this.initialData();
      if (editingData && editingData.taskId) {
        this.submitEdit.emit({ taskId: editingData.taskId, task: formData });
      } else {
        this.submitCreate.emit(formData);
      }
    }
  }

  onClose() {
    this.close.emit();
  }

  taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
  });

  ngOnInit(): void {
    const data = this.initialData();
    if (data) {
      this.taskForm.patchValue({
        title: data.title,
        description: data.description,
      });
    }
  }
}
