import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';


import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
   selectedTask!: Task;
   tasks!: Task[];
   readonly baseURL = 'http://localhost:3000/tasks';


  constructor(private http: HttpClient) { }

  /*
    PURPOSE: will add created task to the database
  */
  postTask(task: Task) {
    return this.http.post(this.baseURL, task);
  }

  /*
    PURPOSE: Get a list of tasks
    This function will return a list of the current tasks on the databse
  */
  getTaskList() {
    return this.http.get(this.baseURL);
  }

  /*
    PURPOSE: update task information
    This function will update the task information like title, description, ect.
  */
  putTask(task: Task) {
    return this.http.put(this.baseURL + `/${task._id}`, task);
  }

  /*
    PURPOSE: delete task
    This function will delete the task passed as parameter from the database
  */
  deleteTask(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  /*
    PURPOSE: Get task
    This function will return a task that matches the id passed as parameter from the databse
  */
  getTask(_id: string) {
    return this.http.get(this.baseURL + `/${_id}`);
  }


}
