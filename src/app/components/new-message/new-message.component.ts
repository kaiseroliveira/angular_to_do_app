import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs'; //used for new message component toggle

import { UiService } from '../../services/ui.service';  //used for new message component toggle
import { Message } from '../../Message';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  //event emmitter for new message
  @Output() onNewMessage: EventEmitter<Message> = new EventEmitter();

  //properties for new message form
  title: string = "";
  to: string = "";
  content: string = "";

  showNewMessage: boolean = false; //used for new message component toggle
  subscription: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggleMessage().subscribe((value) =>
      (this.showNewMessage = value));
  }

  ngOnInit(): void {
  }

  // triggered when user clicks submit button in new messages
  onSubmit() {
    // check if all required fields are ok
    if (!this.title) {
      alert('Please add title!');
      return;
    }
    if (!this.to) {
      alert('Please add user ID to whom message is going!');
      return;
    }
    if (!this.content) {
      alert('Please add message content!');
      return;
    }

    // create message with form input and session values
    const newMessage = {
      title: this.title,
      content: this.content,
      date: Date.now +"",
      new: true,
      from: this.getUserId(),
      fname: this.getFname(),
      lname: this.getLname(),
      email: this.getEmail(),
      phone: this.getPhone(),
      to: this.to,
    }

    // emit event to messages list and pass the new message with it
    this.onNewMessage.emit(newMessage);

    //reset form
    this.title = '';
    this.to = '';
    this.content = '';

  }

  //session part
  //getting user id from session
  getUserId() {
    return sessionStorage.getItem('userId');
  }
  //getting fname
  getFname() {
    return sessionStorage.getItem('fname');
  }
  //getting lname
  getLname() {
    return sessionStorage.getItem('lname');
  }
  //getting email
  getEmail() {
    return sessionStorage.getItem('email');
  }
  //getting phone nb
  getPhone() {
    return sessionStorage.getItem('phone');
  }

}
