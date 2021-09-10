import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/chat/entities/Message';
import { User } from 'src/app/shared/chat/entities/User';
import {Select, Store} from "@ngxs/store";
import {ChatState} from "../shared/chat/chat.state";
import {Observable} from "rxjs";
import {NewMessage, StartTyping} from "../shared/chat/chat.action";
import {first} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message?: string

  // @ts-ignore
  @Select(ChatState.getMessages) listOfMessages: Observable<Message[]>;
  // @ts-ignore
  messages: Message[];

  // @ts-ignore
  @Select(ChatState.getUser) currentUser: Observable<User>;
  // @ts-ignore
  currentU: User;

  // @ts-ignore
  @Select(ChatState.getAllUsers) listOfCurrentUsers: Observable<User[]>;
  // @ts-ignore
  allUsers: User[];

  // @ts-ignore
  @Select(ChatState.getTyping) currentUsersTyping: Observable<User[]>;
  // @ts-ignore
  typingUsers: User[];

  constructor(private store: Store) {
    // @ts-ignore
    this.listOfMessages.subscribe((data) => {
      if(data) {
        console.log(data);
        this.messages = data;
      }
    });

    // @ts-ignore
    this.currentUser.subscribe((data) => {
      if(data) {
        this.currentU = data;
      }
    });

    // @ts-ignore
    this.listOfCurrentUsers.subscribe((data) => {
      if(data) {
        console.log(data);
        this.allUsers = data;
      }
    });

    // @ts-ignore
    this.currentUsersTyping.subscribe((data) => {
      if(data) {
        console.log(data);
        this.typingUsers = data;
      }
    });


  }

  ngOnInit(): void {
  }

  didUpdateMessageTextField(event: any) {
    this.message = event.target.value
    this.store.dispatch(new StartTyping(this.currentU.username))
      .pipe(first())
      .subscribe(
        data => {
        },
        error => {
        });
  }

  didClickSendMessageButton() {
    if (this.message != undefined && this.message.length > 0) {
      this.store.dispatch(new NewMessage(this.currentU.username, this.message))
        .pipe(first())
        .subscribe(
          data => {
          },
          error => {
          });
    }
  }
}
