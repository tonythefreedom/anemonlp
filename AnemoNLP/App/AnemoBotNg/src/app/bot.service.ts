import { Injectable } from '@angular/core';
import { MalihuScrollbarService } from 'ngx-malihu-scrollbar';
import * as $ from 'jquery';

@Injectable()
export class BotService {
    $messages = $('.messages-content');
    d;
    h;
    m;
    i = 0;
    num = 0;
    msg: any = 'ok';
    //중복 메시지를 보낼 수 없게하는 변수
    test = '';
    //이미지 변경 관련 변수
    change = 1;

    listMeuns = new Array();

    handshake;
    //최초 접속 핸드쉐이크
    handshaked = false;
    urlSearch = null;

    //img 주소 변경
    img = new Array();

    //최초 웰컴 메세지
    welecomeTxt = null;
    wTextNo = Math.floor(Math.random() * 5);

    array;
    
    //봇 셋팅
    botID = "BB-b10-20170909130042-FHzoGxZsbN";
    userID = "YAnYTaRLEAPymXLvsrwAzxXhre72";

    //addGUI_list 테스트
    //botID = "BB-b10-20171020165606-bOGyqzwQHa";
    //userID = "TfPsvYESiJPTfOcuc9IMVY3j89m2";


    urlAIMLBotStart = "http://35.186.253.168:8080/Sarah/chat?userID=" + this.userID + "&botID=" + this.botID + "&providerID=%20kakao&lang=KO&userKey=" + this.userID + "&run=init&question=1";
    urlAIMLBotConv = "http://35.186.253.168:8080/Sarah/chat?userID=" + this.userID + "&botID=" + this.botID + "&providerID=kakao&lang=KO&userKey=" + this.userID;

    chatterbotUrl = "http://35.194.131.173:8082/api/chatterbot/";

    constructor(
        private mScrollbarService: MalihuScrollbarService
    ) {}

    updateScrollbar() {

        this.mScrollbarService.initScrollbar('.messages-content', {
            axis: 'y',
            theme: 'dark-thick',
            scrollButtons: { enable: true }
        });
        
        // this.$messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        //   scrollInertia: 10,
        //   timeout: 0
        // });
        console.log("updateScrolling");
    }

    testing() {
        console.log(this.userID);
    }

    setDate() {
        this.d = new Date()
        if (this.m != this.d.getMinutes()) {
            this.m = this.d.getMinutes();
            $('<div class="timestamp">' + this.d.getHours() + ':' + this.m + '</div>').appendTo($('.message:last'));   //메시지 시간 표기
            $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));          //메시지 화살표 이미지
            $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));                   //메시지 화살표 이미지
        }
    }

}