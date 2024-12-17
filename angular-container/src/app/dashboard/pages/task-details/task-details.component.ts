import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/utils/types';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {

  @Input() task !: ITask;
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
