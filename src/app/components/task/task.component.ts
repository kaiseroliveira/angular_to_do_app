import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Subscription} from 'rxjs';

import { TaskService } from '../shared/task.service';
import { UiService } from '../../services/ui.service'
import { Task } from '../shared/task.model';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { EdittaskComponent } from '../edittask/edittask.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  providers: [TaskService]
})
export class TaskComponent implements OnInit {
  faTimes = faTimes;
  faEdit = faEdit;
  public todayDate = new Date();
  showTask: boolean = false;
  showTaskList: boolean = true;

  subscription: Subscription = new Subscription;
  subscriptionList: Subscription = new Subscription;

  showTaskId: string = "";
  userID: string = "";
  reload: number = 0;


  constructor(public taskService: TaskService, private router:Router, private uiService:UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showTask = value);
    this.subscriptionList = this.uiService.onToggleList().subscribe(value => this.showTaskList = value);
  }

  ngOnInit(): void {
    this.refreshTaskList();
    this.getUserId();
    this.reloadPage(this.reload);
  }

  reloadPage(number: number){
    this.router.navigate([`/`]);
    if(number == 1){
      this.reload = 0;
      window.location.reload();
    }
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
    });
  } else {
      this.taskService.putTask(form.value).subscribe((res)=> {
        this.resetForm(form);
        this.refreshTaskList();
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
    });
  }

  /*
    PURPOSE: delete task
    This function will delete task using the id passed as a parameter from the database
  */
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.taskService.deleteTask(_id).subscribe((res) => {
        this.refreshTaskList();
      });
    }
  }

  /*
    PURPOSE: Redirect to page
    This function will redirect to page passed as parameter and add id to url,
    will be used to access a expecific user from the id
  */
  goToPageEdit(pageName:string, page_id:string):void{
    this.router.navigate([`${pageName}/${page_id}`]);
  }

  /*
    PURPOSE: Check task date
    This function will compare the current date to the end date set on the task, both dates have their hour set to zero as
    this is only comparing days and not the expecific hour.
  */
  checkDeadline(date: string): any{
    return new Date(date).setHours(0,0,0,0) < this.todayDate.setHours(0,0,0,0);
  }

  /*
    PURPOSE: check reminder date
    This function will compare current date to reminder date, used to display reminder to user
  */
  checkReminder(reminder: string): any{
    return new Date(reminder).setHours(0,0,0,0) == this.todayDate.setHours(0,0,0,0);
  }

  /*
   PURPOSE: toggle task clicked on
   This function will toggle(show and hide) the task clicked on, the id is to only toggle the class clicked on
  */
  toggleShowTask(id: any) {
    this.showTaskId = id;
    this.uiService.toggleShowTask();
  }

  /*
  Toggle list of tasks
  This function will show/hide list of tasks
  */
  toggleShowTaskList(){
    this.uiService.toggleShowTaskList();
  }

  /*
    Sets userID to the user currently logged in, used to filter tasks
  */
  getUserId(): any {
    this.userID = sessionStorage.getItem('userId')!;
  }

  /*
    PURPOSE: set task to completed
    This function will set selected task to completed, value of status(boolean) set to true
  */
  setToComplete(id: string){
    this.taskService.getTask(id).subscribe((res)=> {
      this.taskService.selectedTask = res as Task;
      this.taskService.selectedTask.status = true;
      this.taskService.selectedTask = {
        _id:  this.taskService.selectedTask._id,
        title:  this.taskService.selectedTask.title,
        description:  this.taskService.selectedTask.description,
        startDate:  this.taskService.selectedTask.startDate,
        endDate:  this.taskService.selectedTask.endDate,
        reminder:  this.taskService.selectedTask.reminder,
        status: this.taskService.selectedTask.status,
        priority:  this.taskService.selectedTask.priority,
        ownerID:  this.taskService.selectedTask.ownerID,
        sharedWith:  this.taskService.selectedTask.sharedWith
      }
      this.taskService.putTask(this.taskService.selectedTask).subscribe((res)=> {
        this.refreshTaskList();
      });
    });
  }

   /*
    PURPOSE: check sharedWithID
    This function will compare the task sharedWith Id with user id, used to filter tasks
  */
  checkID(ownerID: string) {
    if (ownerID == this.userID) {
        return true;
    } else {
      return false;
    }
  }

  /*
    PURPOSE: check if task is completed
    This function will checked if task is completed, used to filter task
  */
  checkStatus(status: any): boolean {
      return status == "true";
  }

}
