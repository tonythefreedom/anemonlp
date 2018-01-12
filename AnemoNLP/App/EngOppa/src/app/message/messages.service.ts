import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { Message } from '../message/message.model';

const initialMessages: Message[] = [];

interface IMessagesOperation extends Function {
  (messages: Message[]): Message[];
}

@Injectable()
export class MessagesService {
  // a stream that publishes new messages only once
  newMessages: Subject<Message> = new Subject<Message>();

  // `messages` is a stream that emits an array of the most up to date messages
  messages: Observable<Message[]>;


  // 메세지에 적용될 _operations_ 을 받습니다. 모든 메세지에 대한 변경을 수행할 수 있는 방법 입니다.
  updates: Subject<any> = new Subject<any>();

  // action streams
  create: Subject<Message> = new Subject<Message>();
  markThreadAsRead: Subject<any> = new Subject<any>();

  constructor() {

    this.messages = this.updates.scan((messages: Message[], operation: IMessagesOperation) => {
               return operation(messages);
             },
            initialMessages)
      .publishReplay(1)
      .refCount();

    this.create
      .map( function(message: Message): IMessagesOperation {
        return (messages: Message[]) => {
        return messages.concat(message);
        };
      })
      .subscribe(this.updates);

    this.newMessages
      .subscribe(this.create);

    this.markThreadAsRead
      .map( (thread: Thread) => {
        return (messages: Message[]) => {
          return messages.map( (message: Message) => {
            if (message.thread.id === thread.id) {
              message.isRead = true;  }
            return message;
          });
        };
      })
      .subscribe(this.updates);

  }

  addMessage(message: Message): void {
    this.newMessages.next(message);

  }

  messagesForThreadUser(thread: Thread, user: User): Observable<Message> {
    return this.newMessages
      .filter((message: Message) => {
        // belongs to this thread
        return (message.thread.id === thread.id) &&
          // and isn't authored by this user
          (message.author.id !== user.id);
      });
  }


}

export const messagesServiceInjectables: Array<any> = [
  MessagesService
];
