import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITask } from 'src/utils/types';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<ITask>();
  inputTask !: ITask;

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public taskData: ITask
  ) {
    this.inputTask = taskData;
   }

  ngOnInit(): void {
  }

  onTaskAdded(task : string) {
    const newTask = JSON.parse(task) as ITask;
    this.dialogRef.close(task);
  }

}
