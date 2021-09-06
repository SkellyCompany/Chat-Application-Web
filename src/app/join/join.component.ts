import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  username?: string;

  constructor() { }

  ngOnInit(): void {
  }

  didUpdateUsernameTextField(event: any) {
    this.username = event.target.value
  }

  didClickJoinButton() {
    //TODO: Implement
  }
}
