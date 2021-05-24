import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { TaskService } from './components/shared/task.service';
import { Task } from './components/shared/task.model';
import { Subscription } from 'rxjs';
import { UiService } from '../app/services/ui.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'The Milk';
  showMain: boolean = false;
  showMainSubscription: Subscription = new Subscription;


  showMainSubscriptionTask: Subscription = new Subscription;


  constructor(private router:Router, public taskService: TaskService, private uiService:UiService ) {
    this.showMainSubscription = this.uiService.showMainOnToggle().subscribe(value=> this.showMain = value);
    this.showMainSubscriptionTask = this.uiService.showMainTaskOnToggle().subscribe(value=> this.showMain = value);
  }

  toggleShowMain(){
    this.uiService.toggleShowMain();
  }

  toggleShowMainTask(){
    this.uiService.toggleShowMainTask();
  }

  ngOnInit(): void {
    this.refreshTaskList();
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

  //session part,atm hardcoded until its implemented properly in user login

  //First user (id,fname,lname,email and phone nb)
  // userId = sessionStorage.setItem('userId', '12345');
  // userFname = sessionStorage.setItem('fname', 'Ivan');
  // userLname = sessionStorage.setItem('lname', 'Milinkovic');
  // userEmail = sessionStorage.setItem('email', 'ivan.milinkovic91@gmail.com');
  // userPhone = sessionStorage.setItem('phone', '0851234567');

  //comment/uncomment users for testing purposes

  // Second user (id,fname,lname,email and phone nb),
  userId = sessionStorage.setItem('userId', '123456');
  userFname = sessionStorage.setItem('fname', 'Marijana');
  userLname = sessionStorage.setItem('lname', 'Homen');
  userEmail = sessionStorage.setItem('email', 'marijana.homen@gmail.com');
  userPhone = sessionStorage.setItem('phone', '0859876543');


}
