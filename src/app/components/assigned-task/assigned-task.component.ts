import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { Subscription} from 'rxjs';


import { TaskService } from '../shared/task.service';
import { UiService } from '../../services/ui.service'
import { Task } from '../shared/task.model';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-assigned-task',
  templateUrl: './assigned-task.component.html',
  styleUrls: ['./assigned-task.component.css']
})
export class AssignedTaskComponent implements OnInit {
  faTimes = faTimes;
  public todayDate = new Date();
  showAssigned: boolean = false;
  showAssignedList: boolean = true;

  showAssignedSubsc: Subscription = new Subscription;
  showAssignedListSubsc: Subscription = new Subscription;

  assignedTaskId: string = "";
  userID: string = "";


  constructor(public assignedTasks: TaskService, private router:Router, private assignedUiService:UiService ) {
    this.showAssignedSubsc = this.assignedUiService.assignedOnToggled().subscribe(value => this.showAssigned = value);
    this.showAssignedListSubsc = this.assignedUiService.assignedListOnToggled().subscribe(value => this.showAssignedList = value);
  }

  ngOnInit(): void {
    this.refreshTaskList();
    this.getUserId();
  }



  /*
    PURPOSE: Submit form values to create task
    This function will submit the form values to create or update task,
    if id field on form is empty task will be created otherwise it will be updated
  */
  onSubmit(form: NgForm) {
    if (form.value._id == ""){
    this.assignedTasks.postTask(form.value).subscribe((res)=> {
      this.refreshTaskList();
    });
  } else {
      this.assignedTasks.putTask(form.value).subscribe((res)=> {
        this.refreshTaskList();
      });
    }
 }

  /*
   PURPOSE: Refresh task for updates
   This function will refresh the task list from the database
  */
  refreshTaskList() {
    this.assignedTasks.getTaskList().subscribe((res)=> {
      this.assignedTasks.tasks = res as Task[];
    });
  }

  /*
    PURPOSE: delete task
    This function will delete task using the id passed as a parameter from the database
  */
  onDelete(id: string) {
    if (confirm('Are you sure to remove this task from assigned ?') == true) {
      this.assignedTasks.getTask(id).subscribe((res)=> {
        this.assignedTasks.selectedTask = res as Task;
        this.assignedTasks.selectedTask.sharedWith = "";
        this.assignedTasks.selectedTask = {
          _id:  this.assignedTasks.selectedTask._id,
          title:  this.assignedTasks.selectedTask.title,
          description:  this.assignedTasks.selectedTask.description,
          startDate:  this.assignedTasks.selectedTask.startDate,
          endDate:  this.assignedTasks.selectedTask.endDate,
          reminder:  this.assignedTasks.selectedTask.reminder,
          status: this.assignedTasks.selectedTask.status,
          priority:  this.assignedTasks.selectedTask.priority,
          ownerID:  this.assignedTasks.selectedTask.ownerID,
          sharedWith:  this.assignedTasks.selectedTask.sharedWith
        }
        this.assignedTasks.putTask(this.assignedTasks.selectedTask).subscribe((res)=> {
          this.refreshTaskList();
        });
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
   toggleShowAssigned(id: any) {
    this.assignedTaskId = id;
    this.assignedUiService.toggleShowAssigned();
  }

  /*
    PURPOSE: Toggle assigned tasks list
    This function will show/hide assigned tasks list
  */
  toggleShowAssignedList(){
    this.assignedUiService.toggleShowAssignedList();
  }

  /*
    PURPOSE: get logged in user id
    This function will assigned the current usert id to userID, later used to filter tasks list
  */
  getUserId(): any {
    this.userID = sessionStorage.getItem('userId')!;
  }

  /*
    PURPOSE: set task to completed
    This function will set selected task to completed, value of status(boolean) set to true
  */
  setToComplete(id: string){
    this.assignedTasks.getTask(id).subscribe((res)=> {
      this.assignedTasks.selectedTask = res as Task;
      this.assignedTasks.selectedTask.status = true;
      this.assignedTasks.selectedTask = {
        _id:  this.assignedTasks.selectedTask._id,
        title:  this.assignedTasks.selectedTask.title,
        description:  this.assignedTasks.selectedTask.description,
        startDate:  this.assignedTasks.selectedTask.startDate,
        endDate:  this.assignedTasks.selectedTask.endDate,
        reminder:  this.assignedTasks.selectedTask.reminder,
        status: this.assignedTasks.selectedTask.status,
        priority:  this.assignedTasks.selectedTask.priority,
        ownerID:  this.assignedTasks.selectedTask.ownerID,
        sharedWith:  this.assignedTasks.selectedTask.sharedWith
      }
      this.assignedTasks.putTask(this.assignedTasks.selectedTask).subscribe((res)=> {
        this.refreshTaskList();
      });
    });
  }
  /*
    PURPOSE: check sharedWithID
    This function will compare the task sharedWith Id with user id, used to filter tasks
  */
  checkID(sharedWith: string) {
    if (sharedWith == this.userID) {
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


