import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  constructor(private socket: Socket) {}

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
