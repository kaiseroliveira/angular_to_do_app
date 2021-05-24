import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Message } from '../../Message';  // message interface
import { faTimes } from '@fortawesome/free-solid-svg-icons'; // package for delete icon

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  @Output() onDeleteMessage: EventEmitter<Message> = new EventEmitter();  //event emmitter for delete
  @Output() onShowMessage: EventEmitter<Message> = new EventEmitter();  //event emmitter when user clicks on message item
  faTimes = faTimes;  // icon for delete message
  showMessageDetail = false;  // used for toggle of message details

  constructor() { }

  ngOnInit(): void {
  }

  // onDelete will trigger when user click on message item delete icon
  onDelete(message: any) {
    //emit signal to message list
    this.onDeleteMessage.emit(message);
  }

  // onShow will trigger when user clicks on message item
  onShow(message: any) {
    //emit signal to message list
    this.onShowMessage.emit(message);

    // toogle showMessageDetail
    this.showMessageDetail = !this.showMessageDetail;
  }

}
