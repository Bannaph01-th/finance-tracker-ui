import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AgentMessage } from '../agent.service';

@Injectable({ providedIn: 'root' })
export class AgentMessageState {
  private _chatMessage = new BehaviorSubject<AgentMessage | null>(null);
  agent$ = this._chatMessage.asObservable();

  get message() {
  return this._chatMessage.value;
}

  setMessage(message: AgentMessage | null){
   this._chatMessage.next(message);
}

  clear() {
    this._chatMessage.next(null);
  }
}