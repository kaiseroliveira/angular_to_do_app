import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../shared/task.service';
import { Task } from '../shared/task.model';


@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrls: ['./newtask.component.css']
})
export class NewtaskComponent implements OnInit {

  ownderID: string = "";

  constructor(private router:Router, public taskService: TaskService) { }

  /*
    PURPOSE: redirect to page
    This function will redirect to page passed as parameter
  */
  goToPage(pageName:string):void{
    this.router.navigate([`${pageName}`]);
  }

  ngOnInit(): void {
    this.resetForm();
    this.refreshTaskList();
    this.getUserId();
  }

  /*
    PURPOSE: reset form values
    This function will update the form values after editing or creating a task.
  */
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.taskService.selectedTask = {
      _id: "",
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      reminder: "",
      status: false,
      priority: false,
      ownerID: "",
      sharedWith: ""
    }
  }

  /*
    PURPOSE: Submit form values to create task
    This function will submit the form values to create or update task,
    if id field on form is empty task will be created otherwise it will be updated
  */
  onSubmit(form: NgForm) {
    if (form.value._id == ""){
    this.taskService.postTask(form.value).subscribe((res)=> {
      this.resetForm(form);
      this.refreshTaskList();
      this.router.navigate([`/`]);
    });
  } else {
      this.taskService.putTask(form.value).subscribe((res)=> {
        this.resetForm(form);
        this.refreshTaskList();
        this.router.navigate([`/`]);
      });
    }
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
   PURPOSE: Get logged in user id
   This function will set the task owner id to the user logged in
  */
  getUserId() {
    this.taskService.selectedTask.ownerID = sessionStorage.getItem('userId')!;
  }
}
