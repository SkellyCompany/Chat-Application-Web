import { ChatGuard } from './shared/chat/_guard/chat.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JoinComponent } from 'src/app/join/join.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: "", component: JoinComponent },
  { path: "join", component: JoinComponent },
  { path: "chat", component: ChatComponent, canActivate: [ChatGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
