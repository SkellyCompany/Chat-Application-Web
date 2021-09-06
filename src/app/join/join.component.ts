import { LocalStorage } from './../../global/LocalStorage';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  username?: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  didUpdateUsernameTextField(event: any) {
    this.username = event.target.value
  }

  didClickJoinButton() {
    if (this.username != undefined && this.username.length > 0) {
      //TODO: Implement
      LocalStorage.saveUser({ username: this.username })
      this.router.navigate(["/chat"]);
    }
  }
}
