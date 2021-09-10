import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {User} from "./entities/User";
import {ChatService} from "./chat.service";
import {Message} from "./entities/Message";
import {
  JoinRoom,
  NewMessage, SetUpCurrentUsers,
  SetUpMessages,
  SetUpSingleMessage,
  SetUpUser,
  StartTyping,
  UpdateTyping
} from "./chat.action";
import {first} from "rxjs/operators";

export class ChatStateModel {
  messageList: Message[] | undefined ;
  user: User | undefined ;
  currentUsers : User[] | undefined ;
  currentTyping : User[] | undefined ;
}

@State<ChatStateModel>({
  name: 'chat',
  defaults: {
    messageList: [],
    user: undefined,
    currentUsers: [],
    currentTyping: []
  },
})
@Injectable()
export class ChatState {
  constructor(private chatService: ChatService,
              private store: Store) {

    chatService.getUser().subscribe(
      (data) => {
        this.store.dispatch(new SetUpUser(data as User));
      });

    chatService.getAllMessages().subscribe(
      (data) => {
        this.store.dispatch(new SetUpMessages(data as Message[]));
      });

    chatService.getSingleMessage().subscribe(
      (data) => {
        this.store.dispatch(new SetUpSingleMessage(data as Message));
      });

    chatService.getAllUsers().subscribe(
      (data) => {
        this.store.dispatch(new SetUpCurrentUsers(data as User[]));
      });

    chatService.getTyping().subscribe(
      (data) => {
        console.log(data);
      });
  }

  @Selector()
  static getUser(state: ChatStateModel): any {
    return state.user;
  }

  @Selector()
  static getMessages(state: ChatStateModel): any {
    return state.messageList;
  }

  @Selector()
  static getAllUsers(state: ChatStateModel): any {
    return state.currentUsers;
  }

  @Selector()
  static getTyping(state: ChatStateModel): any {
    return state.currentTyping;
  }

  @Action(JoinRoom)
  joinRoom({getState, setState}: StateContext<ChatStateModel>,
           { username }: JoinRoom): any {
    return this.chatService
      .joinRoom(username)
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  @Action(NewMessage)
  newMessage({getState, setState}: StateContext<ChatStateModel>,
             { username, message }: NewMessage): any {
    return this.chatService
      .newMessage(username, message)
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  @Action(StartTyping)
  startTyping({getState, setState}: StateContext<ChatStateModel>,
              { username }: StartTyping): any {
    return this.chatService
      .startTyping(username)
      .catch((error: any) => {
        throw new Error(error.message);
      });
  }

  @Action(SetUpUser)
  setUpUser({getState, setState}: StateContext<ChatStateModel>,
             { user }: SetUpUser): any {
    console.log(user);
    const state = getState();
    setState({
      ...state,
      user: user,
    });
  }

  @Action(SetUpCurrentUsers)
  setUpCurrentUsers({getState, setState}: StateContext<ChatStateModel>,
            { users }: SetUpCurrentUsers): any {
    console.log(users);
    const state = getState();
    setState({
      ...state,
      currentUsers: users,
    });
  }

  @Action(SetUpMessages)
  setUpMessages({getState, setState}: StateContext<ChatStateModel>,
            { messageList }: SetUpMessages): any {
    const state = getState();
    setState({
      ...state,
      messageList: messageList,
    });
  }

  @Action(SetUpSingleMessage)
  setUpSingleMessage({getState, setState}: StateContext<ChatStateModel>,
                { message }: SetUpSingleMessage): any {
    const state = getState();
    setState({
      ...state,
      // @ts-ignore
      messageList: [...state.messageList, message,],
    });
  }

  @Action(UpdateTyping)
  updateTyping({getState, setState}: StateContext<ChatStateModel>,
                { typingList }: UpdateTyping): any {
    const state = getState();
    setState({
      ...state,
      currentTyping: typingList,
    });
  }


}
