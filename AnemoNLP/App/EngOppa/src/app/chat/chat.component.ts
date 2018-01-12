import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { ThreadsService } from '../thread/threads.service';
import { Thread } from '../thread/thread.model';
import { Observable } from 'rxjs';
import { User } from '../user/user.model';
import { UsersService } from '../user/users.service';
import { Message } from '../message/message.model';
import { MessagesService } from '../message/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  /*constructor( public threadsService: ThreadsService) {
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
          this.thread = currentThread;
      });

   // console.log(this.thread);
  }

*/
  addmsg = '대화를 입력해줄래?';
  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(public messagesService: MessagesService,
              public threadsService: ThreadsService,
              public UsersService: UsersService,
              public el: ElementRef) {
  }

  ngOnInit(): void {

    this.messages = this.threadsService.currentThreadMessages;
    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe(
      (thread: Thread) => {
        this.currentThread = thread;
      });

    this.UsersService.currentUser
      .subscribe(
        (user: User) => {
          this.currentUser = user;
        });
  }

  sendMessage(): void {
    const previousChat = document.querySelector('#previousChat');
    const texts = document.querySelector('#texts');
    const botBalloon = document.querySelector('#botBalloon');

    previousChat.classList.remove('show');
    botBalloon.classList.remove('answer');

    // previousChat.innerHTML = texts.value;
    previousChat.classList.add('show');
    // texts.value = '';
    botBalloon.classList.add('answer');

    const m: Message = this.draftMessage;
    this.addmsg = this.draftMessage.text;

    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;

   this.messagesService.addMessage(m);
    // 사용자 메세지 별도 출력시
    this.draftMessage = new Message();
  }

  // enter를 치면 sendMessage() 함수를 실행합니다.
  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  showMessage() {
    const previousChat = document.querySelector('#previousChat');
    const texts = document.querySelector('#texts');
    const botBalloon = document.querySelector('#botBalloon');

    previousChat.classList.remove('show');
    botBalloon.classList.remove('answer');

    // previousChat.innerHTML = texts.value;
    previousChat.classList.add('show');
    // texts.value = '';
    botBalloon.classList.add('answer');
  }

}
