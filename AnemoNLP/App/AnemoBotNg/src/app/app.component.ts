import { Component, OnInit } from '@angular/core';
import { Logger } from './logger.service';
import { BotService } from './bot.service';

import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    // './app.component.scss'
  ],
  providers: [ Logger, BotService ]
})
export class AppComponent implements OnInit {
  title:string = '아네모 도우미';
  chat_title:string = 'ANEMO BOT';
  chat_developer:string = 'Made By Tony Kim';
  blank_msg:string = 'Type message...';

  constructor(
    private logger: Logger,
    private bot: BotService, 
  ) {}

  ngOnInit(): void {

  }

  onKeypress(e) {
    // console.log(e);
    if(e.which == 13) {
      this.insertMessage();
      return false;
    }
  }

  insertMessage() {
    // user에게 입력받은 값
    this.bot.msg = $('.message-input').val();
    console.log(this.bot.msg);

    //입력받은 값의 공백을 제거
    if ($.trim(this.bot.msg) == '') {
      return false;
    }
    /* //중복입력 방지
      if(test=="false"){
          //console.log(this.bot.msg);
          return null;
      }*/

    $('<div class="message message-personal">' + this.bot.msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
    this.bot.setDate();
    $('.message-input').val(null);
    this.bot.updateScrollbar();
    setTimeout(() => {
      this.bot.chatbot_start();
    }, 1);
  }

  chat_view(id) {
    //alert(id);
    var x = document.getElementById(id);
    if (id.match(/hide1/)) {

      //이미지를 지운다.
      var y = document.getElementById('hide2');
      y.style.display = "none";
      y.className = y.className.replace(" w3-show", "");

    } else {

      //채팅을 지움
      var y = document.getElementById('hide1');
      y.className = y.className.replace(" w3-show", "");

    }


    if (x.className.indexOf("w3-show") == -1) {
      //창 띄우기 두번할때 여기를 안옴
      x.className += " w3-show";

    } else {
      //창 닫기
      x.className = x.className.replace(" w3-show", "");

    }
  }

  openMail(personName) {
    var i;
    var x: { [k: string]: any } = document.getElementsByClassName("person");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    document.getElementById(personName).style.display = "block";
  }
}