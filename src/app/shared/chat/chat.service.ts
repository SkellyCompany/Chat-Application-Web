import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private typingUsers: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  public get typingChanged$(): Observable<string[]> {
    return this.typingUsers.pipe();
  }

  constructor(private socket: Socket) {
    this.socket.on("typing_changed", (data: string[]) => this.typingUsers.next(data));
  }

  async joinRoom(username: string): Promise<any> {
    this.socket.emit('join', username);
  }

  async startTyping(username: string): Promise<any> {
    this.socket.emit('start_typing', username);
  }

  async newMessage(username: string, message: string): Promise<any> {
    this.socket.emit('new_message', message);
  }

  getUser(){
    return this.socket.fromEvent('authenticated');
  }

  getAllMessages(){
    return this.socket.fromEvent('get_all_messages');
  }

  getSingleMessage(){
    return this.socket.fromEvent('new_message');
  }

  getAllUsers(){
    return this.socket.fromEvent('get_all_users');
  }

  getTyping(){
    return this.socket.fromEvent('get_all_typing');
  }
}
