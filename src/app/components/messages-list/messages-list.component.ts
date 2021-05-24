import { Component, OnInit } from '@angular/core';

import { Message } from '../../Message';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-messages-list',
  templateUrl: './messages-list.component.html',
  styleUrls: ['./messages-list.component.css']
})
export class MessagesListComponent implements OnInit {
  messages: Message[] = [];

  //setting messageService as provider in constructor so that it can be used
  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    //getting messages from DB and passing them into messages array
    this.messageService.getMessages().subscribe((messages: Message[]) => (this.messages = messages));
  }

  // triggered by emmiter in message item,
  // when user clicks on delete icon
  deleteMessage(message: Message) {
    // use deleteMessage from messageSerice to delete the specific message from DB and refresh the list
    this.messageService.deleteMessage(message).subscribe(() => (this.messages = this.messages.filter(m => m._id !== message._id)));
  }

  // triggered by emitter from message item,
  // from event that happens when user click on message item
  showMessage(message: Message) {
    // if message is new once clicked on it change it to false so its no longer new
    if (message.new) {
      message.new = false;
      // use updateNewMessage from messageService to change "new" value from true to false in DB
      this.messageService.updateNewMessage(message).subscribe();
    }
  }

  // triggered by emmiter from new message,when user click on submit button
  newMessage(message: Message) {
    // use newMessage from messageService to add new message to DB
    this.messageService.newMessage(message).subscribe();
  }

}
