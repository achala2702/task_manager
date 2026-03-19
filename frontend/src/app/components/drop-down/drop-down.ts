import { Component, input, model } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { StatusType } from '../../models/task-model';

interface TDropDown {
  value: StatusType;
  viewValue: string;

}

@Component({
  selector: 'app-drop-down',
  imports: [MatFormFieldModule, MatSelectModule],
  templateUrl: './drop-down.html',
  styleUrl: './drop-down.scss',
})
export class DropDown {

  selectedStatus = model<StatusType>()

  statusLabels: TDropDown[] = [
      {value: "NOT_STARTED", viewValue: 'Not Started'},
      {value: "PENDING", viewValue: 'Pending'},
      {value: "COMPLETED", viewValue: 'Completed'},
  ];

  onStatusChange(newStatus: StatusType) {

  console.log('Updating task to', newStatus);
}
}
