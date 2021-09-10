
import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Select, Store} from "@ngxs/store";
import {JoinRoom} from "../shared/chat/chat.action";
import {first} from "rxjs/operators";
import {Observable} from "rxjs";
import {ChatState} from "../shared/chat/chat.state";
import {User} from "../shared/chat/entities/User";

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  username?: string;

  // @ts-ignore
  @Select(ChatState.getUser) currentUser: Observable<User>;
  // @ts-ignore
  currentU: User;

  constructor(    private router: Router,
                  private store: Store
  ) {
    // @ts-ignore
    this.currentUser.subscribe((data) => {
      if(data) {
        this.currentU = data;
        this.router.navigate(["/chat"]);
      }
    });
  }

  ngOnInit(): void {
  }

  didUpdateUsernameTextField(event: any) {
    this.username = event.target.value
  }

  didClickJoinButton() {
    if (this.username != undefined && this.username.length > 0) {
      this.store.dispatch(new JoinRoom(this.username))
        .pipe(first())
        .subscribe(
          data => {
          },
          error => {
          });
    }
  }
}
