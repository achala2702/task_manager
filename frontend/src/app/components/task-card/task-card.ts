import { Component, input } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DropDown } from '../drop-down/drop-down';
import { TaskModel } from '../../models/task-model';

@Component({
  selector: 'app-task-card',
  imports: [MatCardModule, MatButton, DropDown],
  templateUrl: './task-card.html',
  styleUrl: './task-card.scss',
})
export class TaskCard {
  task = input.required<TaskModel>()
}
