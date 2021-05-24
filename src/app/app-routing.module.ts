//Module
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { NewtaskComponent } from './components/newtask/newtask.component';
import { EdittaskComponent} from './components/edittask/edittask.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MaintaskComponent } from './components/maintask/maintask.component';

const routes: Routes = [
  // { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  // { path: 'tasks', component: TasksComponent },
  { path: '', component: MaintaskComponent },
  { path: 'messages', component: MessagesComponent },
  {path: 'newtask', component: NewtaskComponent},
  {path: 'edittask/:id', component: EdittaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
