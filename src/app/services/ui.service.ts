import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  // Show tasks boolean
  private showTask: boolean = false;
  private showTaskList: boolean = false;

  //Show completed task boolean
  private showCompleted: boolean = false;
  private showCompletedList: boolean = false;

  //Show assigned tasks boolean
  private showAssigned: boolean = false;
  private showAssignedList: boolean = false;

  private showNewMessage: boolean = false;  //used for showing new message component

  // task list subject
  private subject = new Subject<any>();
  private subjectList = new Subject<any>();

  //completed task list subject
  private completedSubject = new Subject<any>();
  private showCompletedListSubsc = new Subject<any>();

  //assigned tasks subject
  private showAssignedSubsc = new Subject<any>();
  private showAssignedListSubsc = new Subject<any>();

  private messageSubject = new Subject<any>();

  // show messages toggle
  private showMain: boolean = false;
  private showMainSubject = new Subject<any>();

  // show task toggle
  private showMainTaskSubject = new Subject<any>();



  constructor() { }

  // this will toggle the messages to show/hide to the page
  toggleShowMain(){
    this.showMain = true;
    this.showMainSubject.next(this.showMain);
  }

  showMainOnToggle(): Observable<any> {
    return this.showMainSubject.asObservable();
  }

  // // this will toggle the tasks to show/hide to the page
  toggleShowMainTask(){
    this.showMain = false;
    this.showMainTaskSubject.next(this.showMain);
  }

  showMainTaskOnToggle(): Observable<any> {
    return this.showMainTaskSubject.asObservable();
  }

   // toggling showNewMessage
   toggleNewMessage(): void {
    // flip
    this.showNewMessage = !this.showNewMessage;
    // passing value to subject
    this.messageSubject.next(this.showNewMessage);
  }

  // triggered when we use toggle
  onToggleMessage(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  // TASKS TOGGLE
    /*
      PURPOSE: Set current value of showTask to the opposite
      This will set the showTask value to the current opposite, will allow the tasks to be displayed on toggle
    */
    toggleShowTask(): void {
      this.showTask = !this.showTask;
      this.subject.next(this.showTask);
    }
    toggleShowTaskList(): void {
      this.showTaskList = !this.showTaskList;
      this.subjectList.next(this.showTaskList);
    }

    /*
      PURPOSE: Set task as toggle
      Adds observable to subject, will allow the tasks to be displayed on toggle
    */
    onToggle(): Observable<any> {
      return this.subject.asObservable();
    }
    onToggleList(): Observable<any> {
      return this.subjectList.asObservable();
    }



  /*
    COMPLETED TOGGLE
  */
  completedOnToggle(): Observable<any> {
    return this.completedSubject.asObservable();
  }
  completedListOnToggle(): Observable<any> {
    return this.showCompletedListSubsc.asObservable();
  }

  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
    this.completedSubject.next(this.showCompleted);
  }
  toggleShowCompletedList(): void {
    this.showCompletedList = !this.showCompletedList;
    this.showCompletedListSubsc.next(this.showCompletedList);
  }


  /*
    ASSIGNED TOGGLE
  */
  assignedOnToggled(): Observable<any> {
    return this.showAssignedSubsc.asObservable();
  }
  assignedListOnToggled(): Observable<any> {
    return this.showAssignedListSubsc.asObservable();
  }

  toggleShowAssigned(): void {
    this.showAssigned = !this.showAssigned;
    this.showAssignedSubsc.next(this.showAssigned);
  }
  toggleShowAssignedList(): void {
    this.showAssignedList = !this.showAssignedList;
    this.showAssignedListSubsc.next(this.showAssignedList);
  }

}
