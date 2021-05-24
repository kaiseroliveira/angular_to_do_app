import { Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // used for communicating with backend
import { Observable} from 'rxjs'; // used for communicating with backend

import { Message } from '../Message';

// used for sending headers together with content type
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  // db url
  private dbUrl = 'http://localhost:3000/messages';
  currentUserId: any = this.getUserId(); //used as a param for get messages route, getting messages for loged in user

  // need to pass in httpClient into constructor so that it can be used
  constructor(private http: HttpClient) { }

  // used for getting all messages from db
  getMessages(): any {
    //making get request to get messages from db, passing userId as search param when getting messages
    return this.http.get<Message[]>(this.dbUrl, { params: { searchKey: this.currentUserId}});

  }

  // used for deleting message from db
  deleteMessage(message: Message): Observable<Message> {
    // setting custom url
    const url = `${this.dbUrl}/${message._id}`;
    // making delete request to delete message from db
    return this.http.delete<Message>(url);
  }

  // used for updating message from db
  updateNewMessage(message: Message): Observable<Message> {
    // setting custom url
    const url = `${this.dbUrl}/${message._id}`;
    // making put request to change "new" status for specific message in db
    return this.http.put<Message>(url, message, httpOptions);
  }

  // used for adding new message to db
  newMessage(message: Message): Observable<Message> {
    // making post request to add new message to db
    return this.http.post<Message>(this.dbUrl, message, httpOptions);
  }

  //session part
  //getting user id from session
  getUserId() {
    return sessionStorage.getItem('userId');
  }
}
