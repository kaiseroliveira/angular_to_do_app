import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task.model';
import {TaskComponent} from '../task/task.component';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css'],
  providers: [TaskService, Task]
})
export class EdittaskComponent implements OnInit {

  constructor(private router: ActivatedRoute, public taskService: TaskService, private route: Router, public taskComp: TaskComponent) {
   }
  taskDate = "";
  selectedTask!: Task;
  tasks!: Task[];
  newId = "";


  ngOnInit(): any {
    this.refreshTaskList();
    this.getTask(this.router.snapshot.params.id);
    this.taskDate = this.taskService.selectedTask.startDate.substring(0,10);
  }

  /*
   PURPOSE: Refresh task for updates
   This function will refresh the task list from the database
  */
  refreshTaskList() {
    this.taskService.getTaskList().subscribe((res)=> {
      this.taskService.tasks = res as Task[];
    })
  }
  /*
   PURPOSE: Return specific task
   This funciton will return a specific task, passed as parameter, from the database.
   Also, the task startDate and endDate are set to the only day-month-year format,
   to be later accessed on the edit task form.
  */
  getTask(_id: string): any{
    this.taskService.getTask(_id).subscribe((res)=> {
      this.taskService.selectedTask = res as Task;
      this.taskService.selectedTask.startDate = this.taskService.selectedTask.startDate.substring(0,10);
      this.taskService.selectedTask.endDate = this.taskService.selectedTask.endDate.substring(0,10);
      this.taskService.selectedTask.reminder = this.taskService.selectedTask.reminder.substring(0,10);

    })
  }

  /*
    PURPOSE: Submit form values to create task
    This function will submit the form values to create or update task,
    if id field on form is empty task will be created otherwise it will be updated
  */
  onSubmit(form: NgForm) {
    this.taskService.putTask(form.value).subscribe((res)=> {
      this.refreshTaskList();
    });
    this.refreshTaskList();
    this.goToPage(`/`);
    this.taskComp.reloadPage(1);
  }

  /*
    PURPOSE: redirect to page
    This function will redirect to page passed as parameter
  */
  goToPage(pageName:string){
    console.log("TEST");
    this.refreshTaskList();
    this.route.navigate([`${pageName}`]);
  }

  /*
    PURPOSE: get user logged in
    This function will set the current user as owner of the task
  */
  getUserId() {
    this.taskService.selectedTask.ownerID = sessionStorage.getItem('userId')!;
  }



}
