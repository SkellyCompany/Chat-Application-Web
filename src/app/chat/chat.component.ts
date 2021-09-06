import { LocalStorage } from './../../global/LocalStorage';
import { Component, OnInit } from '@angular/core';
import { Message } from 'src/domain/Message';
import { User } from 'src/domain/User';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  loggedInUser?: User = LocalStorage.getUser()
  messages?: [Message]

  message?: string

  constructor() { }

  ngOnInit(): void {
    console.log(this.loggedInUser)
  }

  didUpdateMessageTextField(event: any) {
    this.message = event.target.value
  }

  didClickSendMessageButton() {
    //TODO: Implement
  }
}
