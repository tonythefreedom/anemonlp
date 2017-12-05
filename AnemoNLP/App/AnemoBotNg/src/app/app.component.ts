import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Logger } from './logger.service';
import { BotService } from './bot.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ Logger, BotService ]
})
export class AppComponent implements OnInit {
  title:string = '아네모 도우미';
  chat_title:string = 'ANEMO BOT';
  chat_developer:string = 'Made By Tony Kim';

  constructor(private logger: Logger, private bot: BotService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.bot.listMeuns[0] = 0;

    this.bot.img[0] = "https://www.w3schools.com/w3images/avatar2.png";
    this.bot.img[1] = "../assets/img/anemo_logo_16.png";

    switch (this.bot.wTextNo) {
      case 0:
        this.bot.welecomeTxt = "안녕, 한국 최대의 IT 종사자 네트워크 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;슈레딩거 고양이 보여줘&apos; 같이 외치면 돼!";
        break;
      case 1:
        this.bot.welecomeTxt = "Hello, 즐거운 IT 종사자 네트워크 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;양자역학 보여줘&apos; 같이 외치면 돼!";;
        break;
      case 2:
        this.bot.welecomeTxt = "Hi, IT 종사자 모두를 위한 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;사랑하는 법 보여줘&apos; 같이 외치면 돼!";;
        break;
      case 3:
        this.bot.welecomeTxt = "반가워, IT 종사자들의 권익을 위해 노력하는 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;프론트엔드 프레임워크 보여줘&apos; 같이 외치면 돼!";;
        break;
      case 4:
        this.bot.welecomeTxt = "반가워, IT 종사자들의 권익을 위해 노력하는 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;디자인 잘 하는 법 보여줘&apos; 같이 외치면 돼!";;
        break;
      default:
        this.bot.welecomeTxt = "안녕, 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐";
        break;
    }

    console.log(this.bot);    
  }

  // 토님이사님 chatterbot chatterbotUrl = "http://35.189.163.55:8082/api/chatterbot/";
  //chatterbotUrl = "http://localhost:8082/api/chatterbot/";


  chatbot_start() {
    if ($('.message-input').val() != '') {
      return null;
    }

    if (!this.bot.handshaked) {
      //서버 연결 url
      this.bot.urlSearch = this.bot.urlAIMLBotStart;
      this.bot.handshaked = true;
      console.log('urlSearch: ', this.bot.urlSearch);
    } else {
      //메시지 연결 url  //encodeURIComponent(msg)인코딩된 url를 반환하는 함수
      this.bot.urlSearch = this.bot.urlAIMLBotConv + "&question=" + encodeURIComponent(this.bot.msg);
      console.log('(2)urlSearch: ', this.bot.urlSearch);
    }

    $('<div class="message loading new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure><span></span></div>').appendTo($('.mCSB_container'));
    this.bot.updateScrollbar();

    this.http.get(this.bot.urlSearch).subscribe(_data => {
      // For adding any properties in typescript :100kimch
      console.log('data: ', _data);
      var data: { [k: string]: any } = {};

      if (data.data == null) {
        this.bot.handshake = 1;

        console.log(this.bot.welecomeTxt);

        if(this.bot.welecomeTxt.indexOf("||") != -1) {
          //챗봇이 말하는 부분 말풍선 두개 생성
          this.bot.array = this.bot.welecomeTxt.split('||');

          setTimeout(() => {
            for (var j = 0; j < this.bot.array.length; j++) {
              //console.log(array);
              $('.message.loading').remove();
              $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + this.bot.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
              //console.log(array[j]);
              this.bot.setDate();
              this.bot.updateScrollbar();

              i++;
            }
          }, 1000);

        } else {

          //일반적으로 챗봇이 말하는 부분
          setTimeout(() => {
            $('.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + this.bot.welecomeTxt + '</div>').appendTo($('.mCSB_container')).addClass('new');
            this.bot.setDate();
            this.bot.updateScrollbar();

            i++;
          }, 1000);
        }

      } else {

        //UIscript에 유튜브 동영상이 존재하면 if를 수행합니다.
        if (data.data.message.indexOf("kind") != -1) {

          //  console.log("data:"+data.data.message.indexOf("kind"));
          //유튜브 동영상 message를 변수에 저장합니다.
          var video_list = data.data.message;

          //video_list를 파싱합니다.
          var video_list_parse = JSON.parse(video_list);
          var video_id = "";

          //가져온 id명을 구별한후 video_id 변수에 저장합니다.
          if (video_list_parse.videoId != undefined) {
            video_id = video_list_parse.videoId;
          } else if (video_list_parse.playlistId != undefined) {
            video_id = video_list_parse.playlistId;
          }


          //찾아온 유튜브 영상을 메세지창에 출력합니다.
          $('.message.loading').remove();
          $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' +
            '<iframe id="player" width="250" height="250" type="text/html" src="http://www.youtube.com/embed/' + video_id + '?enablejsapi=1&start=1&origin=http://example.com&modestbranding=1" frameborder="0">' +
            '</iframe></div>').appendTo($('.mCSB_container')).addClass('new');
          this.bot.setDate();
          this.bot.updateScrollbar();

        }

        else if (data.data.message.indexOf("I don't understand that yet.") != -1) {
          this.chatbot_undefined(this.bot.msg);
        }
        else if (data.data.message.indexOf("||") != -1) {

          //챗봇이 말하는 부분 말풍선 두개 생성
          this.bot.array = data.data.message.split('||');

          setTimeout(function () {
            for (var j = 0; j < this.bot.array.length; j++) {
              //console.log(array);
              $('.message.loading').remove();
              $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + this.bot.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
              //console.log(array[j]);
              this.bot.setDate();
              this.bot.updateScrollbar();

              i++;
            }
          }, 1000);

        } else {

          //일반적으로 챗봇이 말하는 부분
          setTimeout(function () {
            $('.message.loading').remove();
            $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + data.data.message + '</div>').appendTo($('.mCSB_container')).addClass('new');
            this.bot.setDate();
            this.bot.updateScrollbar();

            i++;
          }, 1000);
        }


        //UIscript 가 존재 하면 if를 수행합니다.
        if (data.data.uiScriptArray != undefined) {

          //이미지 값을 저장한 배열 초기화
          // console.log("초기화",listMeuns[1]);
          //listMeuns = [];

          var uiScriptArray_length = data.data.uiScriptArray.length;
          // console.log(uiScriptArray_length);

          //ui for 진행
          for (var j = 0; j < uiScriptArray_length; j++) {

            var uiScript_type = data.data.uiScriptArray[j].type;
            // console.log(uiScript_type);
            var uiScript_content = data.data.uiScriptArray[j].uiScript;
            // console.log(uiScript_content);




            //카로셀 함수
            if (uiScript_type == "cardMenu") {
              //uiScript_content 파싱
              var uiScript_content_card = JSON.parse(uiScript_content);

              //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
              this.bot.num = this.bot.num + 1;

              //메시지창
              $('<div id=cardview' + this.bot.num + ' class="message new"></div>').appendTo($('.mCSB_container')).addClass('new');
              //카로셀 시작
              $('<div id=carousel' + this.bot.num + ' class="carousel  slide line" data-ride="carousel"  ><div  id=carousel_list' + this.bot.num + ' class="carousel-inner" role="listbox"></div></div>').appendTo($('#cardview' + this.bot.num + '')).addClass('carousel');
              //left 양옆 화살표
              $('<a  href=#carousel' + this.bot.num + ' role="button" data-slide="prev"><span  class="glyphicon glyphicon-chevron-left" aria-hidden="true"><span class="sr-only">Previous</span></span></a>').appendTo($('#carousel' + this.bot.num + '')).addClass('carousel-control').addClass('left');
              // right양옆 화살표
              $('<a  href=#carousel' + this.bot.num + ' role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right"  aria-hidden="true"><span class="sr-only" >Next</span></span></a>').appendTo($('#carousel' + this.bot.num + '')).addClass('carousel-control').addClass('right');


              if (uiScript_content_card.options[0].type == "LINK") {
                // link 카로셀 리스트 출력
                $('<a  href=' + uiScript_content_card.options[0].id + ' target="_blank" ><div><img class="card_img"  src=' + uiScript_content_card.options[0].filename + '><br/><div align="center">' + uiScript_content_card.options[0].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item').addClass('active');
              }
              else {

                // msg 카로셀 리스트 출력
                $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=card' + i + ' ><div><img class="card_img"  src=' + uiScript_content_card.options[0].filename + '><br/><div align="center">' + uiScript_content_card.options[0].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item').addClass('active');
                this.bot.listMeuns[i] = uiScript_content_card.options[0].id;
              }


              for (var i = 1; i < uiScript_content_card.options.length; i++) {
                //  console.log(num);

                if (uiScript_content_card.options[i].type == "LINK") {

                  $('<a  href=' + uiScript_content_card.options[i].id + ' target="_blank" ><div><img class="card_img" src=' + uiScript_content_card.options[i].filename + '><br/><div align="center" >' + uiScript_content_card.options[i].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item');
                  this.bot.updateScrollbar();
                } else {

                  $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=card' + i + ' ><div><img class="card_img" src=' + uiScript_content_card.options[i].filename + '><br/><div align="center">' + uiScript_content_card.options[i].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item');
                  this.bot.updateScrollbar();
                  this.bot.listMeuns[i] = uiScript_content_card.options[i].id;
                }
              }
            }


            //리스트 메뉴
            if (uiScript_type == "listMenu") {

              //uiScript_content 파싱
              var uiScript_content_list = JSON.parse(uiScript_content);

              //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
              this.bot.num = this.bot.num + 1;


              //메시지 CSS 창
              $('<div  id=listview' + this.bot.num + ' class="message new"><figure class="avatar"></figure></div>').appendTo($('.mCSB_container')).addClass('new');

              for (var i = 0; i < uiScript_content_list.options.length; i++) {
                // console.log(this.bot.num);


                if (uiScript_content_list.options[i].type == "LINK") {
                  $('<a  href=' + uiScript_content_list.options[i].id + ' target="_blank" ><img class="list_img" src=' + uiScript_content_list.options[i].filename + '>' + uiScript_content_list.options[i].text + '</div></a><br/>').appendTo($('#listview' + this.bot.num));
                  this.bot.updateScrollbar();



                } else {
                  $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=list' + i + ' ><img class="list_img" src=' + uiScript_content_list.options[i].filename + '>' + uiScript_content_list.options[i].text + '</div></a><br/>').appendTo($('#listview' + this.bot.num));
                  this.bot.updateScrollbar();
                  this.bot.listMeuns[i] = uiScript_content_list.options[i].id;

                }

              }
            }


            //버튼 메뉴
            if (uiScript_type == "button") {
              //  console.log('sdfdsfsdf');
              //uiScript_content 파싱
              var uiScript_content_button = JSON.parse(uiScript_content);

              //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
              this.bot.num = this.bot.num + 1;

              //메시지 CSS 창
              $('<div  id=buttonview' + this.bot.num + ' class="message new"><figure class="avatar"></figure></div>').appendTo($('.mCSB_container')).addClass('new').addClass('chat-button-list');


              for (var i = 0; i < uiScript_content_button.options.length; i++) {

                //console.log("ddd:", uiScript_content_button.options[i].type);
                if (uiScript_content_button.options[i].type == "URL") {
                  $('<a  href=' + uiScript_content_button.options[i].id + ' target="_blank" ><div class="button_list" align="center">' + uiScript_content_button.options[i].text + '</div></a>').appendTo($('#buttonview' + this.bot.num));
                  this.bot.updateScrollbar();
                } else {

                  $('<a  href="javascript:void(0)" onclick="uiScript_msg(id)" id=button' + i + '><div class="button_list" align="center">' + uiScript_content_button.options[i].text + '</div></a>').appendTo($('#buttonview' + this.bot.num));
                  this.bot.updateScrollbar();
                  this.bot.listMeuns[i] = uiScript_content_button.options[i].id;

                }
              }
            }


            //사용자 UI 메뉴
            if (uiScript_type == "customGUI") {


              $('.message.loading').remove();
              $('<div class="message new">' + uiScript_content + '</div>').appendTo($('.mCSB_container')).addClass('new');
              this.bot.setDate();
              this.bot.updateScrollbar();

            } //사용자 UI 메뉴 끝


          } //uiscript를 출력하는 함수의 끝

        }

      } //메시지를 출력하는 함수 끝

      this.bot.test = "true";
    });
}

  // chatbot_start2() {
  //     if ($('.message-input').val() != '') {
  //         return null;
  //     }/*//중복입력 방지
  // else if (test == "false") {
  //     return null;
  // }*/
  //     console.log("hihi");

  //     if (!this.bot.handshaked) {
  //         //서버 연결 url
  //         this.bot.urlSearch = this.bot.urlAIMLBotStart;
  //         this.bot.handshaked = true;
  //     } else {
  //         //메시지 연결 url  //encodeURIComponent(msg)인코딩된 url를 반환하는 함수
  //         this.bot.urlSearch = this.bot.urlAIMLBotConv + "&question=" + encodeURIComponent(this.bot.msg);
  //     }

  //     $('<div class="message loading new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure><span></span></div>').appendTo($('.mCSB_container'));
  //     this.bot.updateScrollbar();

  //     jQuery.ajax({
  //         type: "GET",
  //         url: this.bot.urlSearch,
  //         xhrFields: {
  //             //핸드쉐이크 메세지를 받기 위해 쿠키에 세션 설정
  //             withCredentials: true
  //         },
  //         contentType: "application/json",
  //         dataType: "json",
  //         success: function (data) {
  //              console.log("data:",data);

  //             if (data.data == null) {
  //                 this.bot.handshake = 1;

  //                 console.log(this.bot.welecomeTxt);

  //                 if (this.bot.welecomeTxt.indexOf("||") != -1) {

  //                     //챗봇이 말하는 부분 말풍선 두개 생성
  //                     this.bot.array = this.bot.welecomeTxt.split('||');

  //                     setTimeout(function () {
  //                         for (var j = 0; j < this.bot.array.length; j++) {
  //                             //console.log(array);
  //                             $('.message.loading').remove();
  //                             $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + this.bot.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
  //                             //console.log(array[j]);
  //                             this.bot.setDate();
  //                             this.bot.updateScrollbar();

  //                             i++;
  //                         }
  //                     }, 1000);

  //                 } else {

  //                     //일반적으로 챗봇이 말하는 부분
  //                     setTimeout(function () {
  //                         $('.message.loading').remove();
  //                         $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + this.bot.welecomeTxt + '</div>').appendTo($('.mCSB_container')).addClass('new');
  //                         this.bot.setDate();
  //                         this.bot.updateScrollbar();

  //                         i++;
  //                     }, 1000);
  //                 }

  //             } else {

  //                 //UIscript에 유튜브 동영상이 존재하면 if를 수행합니다.
  //                 if (data.data.message.indexOf("kind") != -1) {

  //                     //  console.log("data:"+data.data.message.indexOf("kind"));
  //                     //유튜브 동영상 message를 변수에 저장합니다.
  //                     var video_list = data.data.message;

  //                     //video_list를 파싱합니다.
  //                     var video_list_parse = JSON.parse(video_list);
  //                     var video_id = "";

  //                     //가져온 id명을 구별한후 video_id 변수에 저장합니다.
  //                     if (video_list_parse.videoId != undefined) {
  //                         video_id = video_list_parse.videoId;
  //                     } else if (video_list_parse.playlistId != undefined) {
  //                         video_id = video_list_parse.playlistId;
  //                     }


  //                     //찾아온 유튜브 영상을 메세지창에 출력합니다.
  //                     $('.message.loading').remove();
  //                     $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' +
  //                         '<iframe id="player" width="250" height="250" type="text/html" src="http://www.youtube.com/embed/' + video_id + '?enablejsapi=1&start=1&origin=http://example.com&modestbranding=1" frameborder="0">' +
  //                         '</iframe></div>').appendTo($('.mCSB_container')).addClass('new');
  //                     this.bot.setDate();
  //                     this.bot.updateScrollbar();

  //                 }

  //                 else if (data.data.message.indexOf("I don't understand that yet.") != -1) {
  //                     this.bot.chatbot_undefined(this.bot.msg);
  //                 }
  //                 else if (data.data.message.indexOf("||") != -1) {

  //                     //챗봇이 말하는 부분 말풍선 두개 생성
  //                     this.bot.array = data.data.message.split('||');

  //                     setTimeout(function () {
  //                         for (var j = 0; j < this.bot.array.length; j++) {
  //                             //console.log(array);
  //                             $('.message.loading').remove();
  //                             $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + this.bot.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
  //                             //console.log(array[j]);
  //                             this.bot.setDate();
  //                             this.bot.updateScrollbar();

  //                             i++;
  //                         }
  //                     }, 1000);

  //                 } else {

  //                     //일반적으로 챗봇이 말하는 부분
  //                     setTimeout(function () {
  //                         $('.message.loading').remove();
  //                         $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + data.data.message + '</div>').appendTo($('.mCSB_container')).addClass('new');
  //                         this.bot.setDate();
  //                         this.bot.updateScrollbar();

  //                         i++;
  //                     }, 1000);
  //                 }


  //                 //UIscript 가 존재 하면 if를 수행합니다.
  //                 if (data.data.uiScriptArray != undefined) {

  //                     //이미지 값을 저장한 배열 초기화
  //                     // console.log("초기화",listMeuns[1]);
  //                     //listMeuns = [];

  //                     var uiScriptArray_length = data.data.uiScriptArray.length;
  //                     // console.log(uiScriptArray_length);

  //                     //ui for 진행
  //                     for (var j = 0; j < uiScriptArray_length; j++) {

  //                         var uiScript_type = data.data.uiScriptArray[j].type;
  //                         // console.log(uiScript_type);
  //                         var uiScript_content = data.data.uiScriptArray[j].uiScript;
  //                         // console.log(uiScript_content);




  //                         //카로셀 함수
  //                         if (uiScript_type == "cardMenu") {
  //                             //uiScript_content 파싱
  //                             var uiScript_content_card = JSON.parse(uiScript_content);

  //                             //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
  //                             this.bot.num = this.bot.num + 1;

  //                             //메시지창
  //                             $('<div id=cardview' + this.bot.num + ' class="message new"></div>').appendTo($('.mCSB_container')).addClass('new');
  //                             //카로셀 시작
  //                             $('<div id=carousel' + this.bot.num + ' class="carousel  slide line" data-ride="carousel"  ><div  id=carousel_list' + this.bot.num + ' class="carousel-inner" role="listbox"></div></div>').appendTo($('#cardview' + this.bot.num + '')).addClass('carousel');
  //                             //left 양옆 화살표
  //                             $('<a  href=#carousel' + this.bot.num + ' role="button" data-slide="prev"><span  class="glyphicon glyphicon-chevron-left" aria-hidden="true"><span class="sr-only">Previous</span></span></a>').appendTo($('#carousel' + this.bot.num + '')).addClass('carousel-control').addClass('left');
  //                             // right양옆 화살표
  //                             $('<a  href=#carousel' + this.bot.num + ' role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right"  aria-hidden="true"><span class="sr-only" >Next</span></span></a>').appendTo($('#carousel' + this.bot.num + '')).addClass('carousel-control').addClass('right');


  //                             if (uiScript_content_card.options[0].type == "LINK") {
  //                                 // link 카로셀 리스트 출력
  //                                 $('<a  href=' + uiScript_content_card.options[0].id + ' target="_blank" ><div><img class="card_img"  src=' + uiScript_content_card.options[0].filename + '><br/><div align="center">' + uiScript_content_card.options[0].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item').addClass('active');
  //                             }
  //                             else {

  //                                 // msg 카로셀 리스트 출력
  //                                 $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=card' + i + ' ><div><img class="card_img"  src=' + uiScript_content_card.options[0].filename + '><br/><div align="center">' + uiScript_content_card.options[0].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item').addClass('active');
  //                                 this.bot.listMeuns[i] = uiScript_content_card.options[0].id;
  //                             }


  //                             for (var i = 1; i < uiScript_content_card.options.length; i++) {
  //                                 //  console.log(num);

  //                                 if (uiScript_content_card.options[i].type == "LINK") {

  //                                     $('<a  href=' + uiScript_content_card.options[i].id + ' target="_blank" ><div><img class="card_img" src=' + uiScript_content_card.options[i].filename + '><br/><div align="center" >' + uiScript_content_card.options[i].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item');
  //                                     this.bot.updateScrollbar();
  //                                 } else {

  //                                     $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=card' + i + ' ><div><img class="card_img" src=' + uiScript_content_card.options[i].filename + '><br/><div align="center">' + uiScript_content_card.options[i].text + '</div></div></a>').appendTo($('#carousel_list' + this.bot.num + '')).addClass('item');
  //                                     this.bot.updateScrollbar();
  //                                     this.bot.listMeuns[i] = uiScript_content_card.options[i].id;
  //                                 }
  //                             }
  //                         }


  //                         //리스트 메뉴
  //                         if (uiScript_type == "listMenu") {

  //                             //uiScript_content 파싱
  //                             var uiScript_content_list = JSON.parse(uiScript_content);

  //                             //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
  //                             this.bot.num = this.bot.num + 1;


  //                             //메시지 CSS 창
  //                             $('<div  id=listview' + this.bot.num + ' class="message new"><figure class="avatar"></figure></div>').appendTo($('.mCSB_container')).addClass('new');

  //                             for (var i = 0; i < uiScript_content_list.options.length; i++) {
  //                                 // console.log(this.bot.num);


  //                                 if (uiScript_content_list.options[i].type == "LINK") {
  //                                     $('<a  href=' + uiScript_content_list.options[i].id + ' target="_blank" ><img class="list_img" src=' + uiScript_content_list.options[i].filename + '>' + uiScript_content_list.options[i].text + '</div></a><br/>').appendTo($('#listview' + this.bot.num));
  //                                     this.bot.updateScrollbar();



  //                                 } else {
  //                                     $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=list' + i + ' ><img class="list_img" src=' + uiScript_content_list.options[i].filename + '>' + uiScript_content_list.options[i].text + '</div></a><br/>').appendTo($('#listview' + this.bot.num));
  //                                     this.bot.updateScrollbar();
  //                                     this.bot.listMeuns[i] = uiScript_content_list.options[i].id;

  //                                 }

  //                             }
  //                         }


  //                         //버튼 메뉴
  //                         if (uiScript_type == "button") {
  //                             //  console.log('sdfdsfsdf');
  //                             //uiScript_content 파싱
  //                             var uiScript_content_button = JSON.parse(uiScript_content);

  //                             //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
  //                             this.bot.num = this.bot.num + 1;

  //                             //메시지 CSS 창
  //                             $('<div  id=buttonview' + this.bot.num + ' class="message new"><figure class="avatar"></figure></div>').appendTo($('.mCSB_container')).addClass('new').addClass('chat-button-list');


  //                             for (var i = 0; i < uiScript_content_button.options.length; i++) {

  //                                 //console.log("ddd:", uiScript_content_button.options[i].type);
  //                                 if (uiScript_content_button.options[i].type == "URL") {
  //                                     $('<a  href=' + uiScript_content_button.options[i].id + ' target="_blank" ><div class="button_list" align="center">' + uiScript_content_button.options[i].text + '</div></a>').appendTo($('#buttonview' + this.bot.num));
  //                                     this.bot.updateScrollbar();
  //                                 } else {

  //                                     $('<a  href="javascript:void(0)" onclick="uiScript_msg(id)" id=button' + i + '><div class="button_list" align="center">' + uiScript_content_button.options[i].text + '</div></a>').appendTo($('#buttonview' + this.bot.num));
  //                                     this.bot.updateScrollbar();
  //                                     this.bot.listMeuns[i] = uiScript_content_button.options[i].id;

  //                                 }
  //                             }
  //                         }


  //                         //사용자 UI 메뉴
  //                         if (uiScript_type == "customGUI") {


  //                             $('.message.loading').remove();
  //                             $('<div class="message new">' + uiScript_content + '</div>').appendTo($('.mCSB_container')).addClass('new');
  //                             this.bot.setDate();
  //                             this.bot.updateScrollbar();

  //                         } //사용자 UI 메뉴 끝


  //                     } //uiscript를 출력하는 함수의 끝

  //                 }

  //             } //메시지를 출력하는 함수 끝

  //             this.bot.test = "true";
  //         }, error: function (xhr, status, error) {
  //             alert("에러발생");
  //         }
  //     });
  //     this.bot.test = "false";
  // }

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



  chatbot_undefined(text) {
    var inputData = { 'text': text };
    //console.log("inputData : " + inputData.text);

    this.http.post(this.bot.chatterbotUrl, inputData).subscribe(_data => {
      // For adding any properties in typescript :100kimch
      console.log('data: ', _data);
      var data: { [k: string]: any } = {};

      if (data.text.indexOf("||") != -1) {
          //챗봇이 말하는 부분 말풍선 두개 생성
          this.bot.array = data.text.split('||');

          setTimeout(function () {
              for (var j = 0; j < this.bot.array.length; j++) {
                  //console.log(array);
                  $('.message.loading').remove();
                  $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + this.bot.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
                  //console.log(array[j]);
                  this.bot.setDate();
                  this.bot.updateScrollbar();

                  this.bot.i++;
              }
          }, 1000);

      } else {

          //일반적으로 챗봇이 말하는 부분
          setTimeout(function () {
              $('.message.loading').remove();
              $('<div class="message new"><figure class="avatar"><img src=../img/' + this.bot.img[this.bot.change % 2] + ' /></figure>' + data.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
              this.bot.setDate();
              this.bot.updateScrollbar();

              this.bot.i++;
          }, 1000);
      }
    });
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