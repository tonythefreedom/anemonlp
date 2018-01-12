import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Observable } from 'rxjs';
import { ThreadsService } from './../thread/threads.service';
import { Thread } from '../thread/thread.model';
import {Router} from '@angular/router';
import {HttpClient} from 'selenium-webdriver/http';

@Component({
  selector: 'chat-thread',
  templateUrl: './chat-thread.component.html',
  styleUrls: ['./chat-thread.component.css']
})
export class ChatThreadComponent implements OnInit {
  @Input() thread: Thread;
  selected = false;


  constructor( public threadsService: ThreadsService, private router: Router) {
  }


  ngOnInit(): void {
    //이전 채팅방 표기 여부 확인
    this.threadsService.currentThread
      .subscribe( (currentThread: Thread) => {
        this.selected = currentThread &&
          this.thread &&
          (currentThread.id === this.thread.id);
      });
  }



  clicked(event: any): void {

    this.threadsService.setCurrentThread(this.thread);
    // backspace나 tab 키를 누를때 이전페이지로 자동이동 방지
    // event.preventDefault();

    this.router.navigate(['/chatimg']);

  }
}


/*
results;
abc ;
tt = '';
 test(){
  var msg = this.abc;
  var botID = 'BB-b10-20171114153845-kyTwUuWXih';
  var userID = 'IV2JoDGmFcg8xRSTL258qJOHxF82';
  var urlAIMLBot = 'http://35.186.253.168:8080/Sarah/chat?userID="+userID+"&botID="+botID+"&providerID=kakao&lang=KO&userKey="+userID';
  // console.log("msg:",msg);
  var urlSearch = urlAIMLBot + '&question=' + encodeURIComponent(msg);

  var header = {withCredentials: true};
  this.http.get(urlSearch, header).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
    },
    // Errors will call this callback instead:
    err => {
      console.log('Something went wrong!');
    }
  );
  console.log("메세지",this.results);
  this.tt = this.results.data.message;
}
*/






