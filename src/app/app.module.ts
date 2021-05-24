import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from '../app/components/task/task.component';
import { NewtaskComponent } from '../app/components/newtask/newtask.component';
import { EdittaskComponent } from '../app/components/edittask/edittask.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { ButtonComponent } from '../app/components/button/button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompletedTaskComponent } from '../app/components/completed-task/completed-task.component';
import { AssignedTaskComponent } from '../app/components/assigned-task/assigned-task.component';

// MESSAGE COMPONENTS
import { MessagesComponent } from './components/messages/messages.component';
import { MessageHeaderComponent } from './components/message-header/message-header.component';
import { MessageButtonComponent } from './components/message-button/message-button.component';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { MessageItemComponent } from './components/message-item/message-item.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { MaintaskComponent } from './components/maintask/maintask.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    NewtaskComponent,
    EdittaskComponent,
    HeaderComponent,
    ButtonComponent,
    CompletedTaskComponent,
    AssignedTaskComponent,
    MessagesComponent,
    MessageHeaderComponent,
    MessageButtonComponent,
    MessagesListComponent,
    MessageItemComponent,
    NewMessageComponent,
    MaintaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}




