import { AfterContentChecked, ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StoreService } from 'src/app/store.service';
import { AddTaskComponent } from 'src/app/wrappers/react/add-task/add-task.component';
import { users } from 'src/utils/data';
import { ITask, IUser } from 'src/utils/types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  user!: IUser;
  sampleNumber: number = 1;

  constructor(
    private storeService: StoreService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog
  ) {
    this.user = this.storeService.getUser();
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      const loggedInUser = users.find(u => u.email === localStorage.getItem('token'));
      if (loggedInUser) {
        this.user = loggedInUser;
      }
    }

    setInterval(() => {
      // this.user.tasks.pop();
    }, 1000)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("User Tasks are : ", this.user.tasks);
  }

  getOnEdit(detail: any) {
    const task = JSON.parse(detail);
    this.user.tasks = this.user.tasks.map((t: ITask) => {
      if (t.id === task.id) {
        return { ...task };
      }
      return t;
    });
  }

  openTaskToEdit(task: string) {
    const addDialogRef = this.dialog.open(AddTaskComponent, {
      data: JSON.parse(task) as ITask
    }
    );

    addDialogRef.afterClosed().subscribe(result => {
      if(result) {
        const updatedTask = JSON.parse(result);
        this.user.tasks = this.user.tasks.map(t => {
          if(t.id === updatedTask.id) {
            return updatedTask;
          }
          return t;
        })
      }
    })
  }

  // updateTaskElements() {
  //   // Select all the react-task-components and update their task attributes
  //   const elements = document.querySelectorAll('react-task-component');
  //   elements.forEach((el, index) => {
  //     if (this.user.tasks[index]) {
  //       const updatedTask = this.user.tasks[index];
  //       const stringifiedTask = JSON.stringify(updatedTask);
  //       el.setAttribute('task', stringifiedTask);
  //     }
  //   });
  // }

  // hitAlert() {
  //   alert('Hit Alert');
  // }

  getJsonTask(task: ITask) {
    console.log("stringified is:", JSON.stringify(task));
    return JSON.stringify(task);
  }

  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      // width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        let newTask = JSON.parse(result);
        // newTask.id = this.user.tasks.length + 1;
        newTask = { ...newTask, id: this.user.tasks.length + 1 }
        this.user.tasks.push(newTask);
      }
    });
  }

  onTaskAdded(newTask: ITask) {
    this.user.tasks.push(newTask);
  }
}
