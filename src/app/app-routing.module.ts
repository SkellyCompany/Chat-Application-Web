import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { JoinComponent } from 'src/app/join/join.component';

const routes: Routes = [
  { path: "", component: JoinComponent },
  { path: "join", component: JoinComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
