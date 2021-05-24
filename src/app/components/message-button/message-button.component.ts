import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-button',
  templateUrl: './message-button.component.html',
  styleUrls: ['./message-button.component.css']
})
export class MessageButtonComponent implements OnInit {
  // color and text values will be passed from buttons with Input
  @Input() color: string = "";
  @Input() text: string = "";
  @Output() buttonClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // event from clicking button
  onClick() {
    // outputing event emitter to message header button
    this.buttonClick.emit();
  }
}
