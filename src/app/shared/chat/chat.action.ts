import {User} from "./entities/User";
import {Message} from "./entities/Message";

export class JoinRoom {
  static readonly type = '[Auth] JoinRoom'
  constructor(
    public username: string
  ) {}
}

export class NewMessage {
  static readonly type = '[Auth] NewMessage';
  constructor(
    public username: string,
    public message: string
  ) {}
}

export class StartTyping {
  static readonly type = '[Auth] StartTyping';
  constructor(
    public username: string
  ) {}
}

//Listeners because state managment is hard

export class SetUpUser {
  static readonly type = '[Auth] SetUpUser';
  constructor(
    public user: User
  ) {}
}

export class SetUpMessages {
  static readonly type = '[Auth] SetUpMessages';
  constructor(
    public messageList: Message[]
  ) {}
}

export class SetUpSingleMessage {
  static readonly type = '[Auth] SetUpSingleMessage';
  constructor(
    public message: Message
  ) {}
}

export class UpdateTyping {
  static readonly type = '[Auth] UpdateTyping';
  constructor(
    public typingList: User[]
  ) {}
}

export class SetUpCurrentUsers {
  static readonly type = '[Auth] SetUpCurrentUsers';
  constructor(
    public users: User[]
  ) {}
}
