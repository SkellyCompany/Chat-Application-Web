import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JoinComponent } from 'src/app/join/join.component';
import { ChatComponent } from './chat/chat.component';
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {ChatState} from "./shared/chat/chat.state";

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    JoinComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([ChatState], {
      developmentMode: !environment.production
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
