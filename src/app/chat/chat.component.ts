import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/shared/chat/entities/Message';
import { User } from 'src/app/shared/chat/entities/User';
import {Select, Store} from "@ngxs/store";
import {ChatState} from "../shared/chat/chat.state";
import {Observable} from "rxjs";
import {NewMessage, StartTyping} from "../shared/chat/chat.action";
import {filter, first, map, tap} from "rxjs/operators";
import { ChatService } from "../shared/chat/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  message?: string
  // @ts-ignore
  currentU: User = null;

  // @ts-ignore
  @Select(ChatState.getMessages) messages$: Observable<Message[]>;
  // @ts-ignore
  @Select(ChatState.getAllUsers) allUsers$: Observable<User[]>;

  public get typingUsers$(): Observable<string[]> {
    return this.chatService.typingChanged$.pipe(map(users => users.filter(username => username !== this.currentU.username)));
  }

  constructor(private store: Store, private chatService: ChatService) {}

  ngOnInit(): void {
    this.store.select(ChatState.getUser).pipe(filter(data => !!data)).subscribe((data) => this.currentU = data);
  }

  async didUpdateMessageTextField(event: any) {
    this.message = event.target.value
    await this.store.dispatch(new StartTyping(this.currentU.username)).pipe(first()).toPromise();
  }

  async didClickSendMessageButton() {
    if (this.message !== undefined && this.message.length > 0) {
      await this.store.dispatch(new NewMessage(this.currentU.username, this.message)).pipe(first()).toPromise();
    }
  }
}
