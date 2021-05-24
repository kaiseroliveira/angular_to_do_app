import { Component, OnInit } from '@angular/core';
import { Subscription} from 'rxjs';


import { TaskService } from '../shared/task.service';
import { UiService } from '../../services/ui.service'
import { Task } from '../shared/task.model';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent implements OnInit {
  faTimes = faTimes;
  public todayDate = new Date();
  showCompleted: boolean = false;
  showCompletedList: boolean = true;

  completedSubs: Subscription = new Subscription;
  completedListSubs: Subscription = new Subscription;

  completedTaskID: string = "";
  userID: string = "";


  constructor(public completedTasks: TaskService, private router:Router, private completedUiService:UiService ) {
    this.completedSubs = this.completedUiService.completedOnToggle().subscribe(value => this.showCompleted = value);
    this.completedListSubs = this.completedUiService.completedListOnToggle().subscribe(value => this.showCompletedList = value);
  }

  ngOnInit(): void {
    this.refreshTaskList();
    this.getUserId();
  }

  /*
   PURPOSE: Refresh task for updates
   This function will refresh the task list from the database
  */
  refreshTaskList() {
    this.completedTasks.getTaskList().subscribe((res)=> {
      this.completedTasks.tasks = res as Task[];
    })
  }

  /*
    PURPOSE: delete task
    This function will delete task using the id passed as a parameter from the database
  */
  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.completedTasks.deleteTask(_id).subscribe((res) => {
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
   PURPOSE: toggle task clicked on
   This function will toggle(show and hide) the task clicked on, the id is to only toggle the class clicked on
  */
  toggleShowCompleted(id: any) {
    this.completedTaskID = id;
    this.completedUiService.toggleShowCompleted();
  }

  /*
    PURPOSE: Toggle Tasks List
    This function will show/hide completed tasks list
  */
  toggleShowCompletedList() {
    this.completedUiService.toggleShowCompletedList();
  }
  /*
    PURPOSE: get user logged in
    This function will assigned the current usert id to userID, later used to filter tasks list
  */
  getUserId(): any {
    this.userID = sessionStorage.getItem('userId')!;
  }

  /*
    PURPOSE: check sharedWithID
    This function will compare the task sharedWith Id with user id, used to filter tasks
  */
  checkID(ownerID: string, sharedWith:string) {
    if (ownerID == this.userID || sharedWith == this.userID) {
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
