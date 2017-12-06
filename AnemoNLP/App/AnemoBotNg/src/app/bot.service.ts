import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    public welcomeTxt:string = null;
    wTextNo = Math.floor(Math.random() * 5);

    array;
    
    //봇 셋팅
    botID = "BB-b10-20170909130042-FHzoGxZsbN";
    userID = "YAnYTaRLEAPymXLvsrwAzxXhre72";

    //addGUI_list 테스트
    //botID = "BB-b10-20171020165606-bOGyqzwQHa";
    //userID = "TfPsvYESiJPTfOcuc9IMVY3j89m2";

    // 토님이사님 chatterbot chatterbotUrl = "http://35.189.163.55:8082/api/chatterbot/";
    //chatterbotUrl = "http://localhost:8082/api/chatterbot/";

    urlAIMLBotStart = "http://35.186.253.168:8080/Sarah/chat?userID=" + this.userID + "&botID=" + this.botID + "&providerID=%20kakao&lang=KO&userKey=" + this.userID + "&run=init&question=1";
    urlAIMLBotConv = "http://35.186.253.168:8080/Sarah/chat?userID=" + this.userID + "&botID=" + this.botID + "&providerID=kakao&lang=KO&userKey=" + this.userID;

    chatterbotUrl = "http://35.194.131.173:8082/api/chatterbot/";

    constructor(
        private mScrollbarService: MalihuScrollbarService,
        private http: HttpClient,
    ) {
        //TODO: initialization on constructor() seems anti-pattern. find a way to act like ngOnInit() on Service.
        this.listMeuns[0] = 0;

        this.img[0] = "https://www.w3schools.com/w3images/avatar2.png";
        this.img[1] = "../assets/img/anemo_logo_16.png";

        switch (this.wTextNo) {
            case 0:
                this.welcomeTxt = "안녕, 한국 최대의 IT 종사자 네트워크 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;슈레딩거 고양이 보여줘&apos; 같이 외치면 돼!";
                break;
            case 1:
                this.welcomeTxt = "Hello, 즐거운 IT 종사자 네트워크 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;양자역학 보여줘&apos; 같이 외치면 돼!";;
                break;
            case 2:
                this.welcomeTxt = "Hi, IT 종사자 모두를 위한 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;사랑하는 법 보여줘&apos; 같이 외치면 돼!";;
                break;
            case 3:
                this.welcomeTxt = "반가워, IT 종사자들의 권익을 위해 노력하는 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;프론트엔드 프레임워크 보여줘&apos; 같이 외치면 돼!";;
                break;
            case 4:
                this.welcomeTxt = "반가워, IT 종사자들의 권익을 위해 노력하는 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐 || 참!! 유튜브를 검색해서 보여줄 수 있는 기능이 새로 생긴거 알지? 예를 들면 &apos;디자인 잘 하는 법 보여줘&apos; 같이 외치면 돼!";;
                break;
            default:
                this.welcomeTxt = "안녕, 아네모에 온걸 환영해. 무얼 도와줄까? <br> 만약 여기가 처음이라면 \"메뉴\"라고 외쳐봐";
                break;
        }

        this.mScrollbarService.initScrollbar('.messages-content', {
            axis: 'y',
            theme: 'dark-thick',
            scrollButtons: { enable: true }
        });
        setTimeout(() => {
            //AIML 봇 초기화
            this.chatbot_start();
        }, 100);
        console.log("variable initialized.");
    }

    updateScrollbar() {

        this.mScrollbarService.initScrollbar('.messages-content', {
            axis: 'y',
            theme: 'dark-thick',
            scrollButtons: { enable: true }
        });
        
        //TODO: apply this using mScrollbarService:
        // this.$messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        //   scrollInertia: 10,
        //   timeout: 0
        // });
        // console.log("updateScrolling");
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

    chatbot_start() {
        if ($('.message-input').val() != '') {
            console.log('return null;');
            return null;
        }

        if (!this.handshaked) {
            //서버 연결 url
            this.urlSearch = this.urlAIMLBotStart;
            this.handshaked = true;
            // console.log('urlSearch: ', this.urlSearch);
        } else {
            //메시지 연결 url  //encodeURIComponent(msg)인코딩된 url를 반환하는 함수
            this.urlSearch = this.urlAIMLBotConv + "&question=" + encodeURIComponent(this.msg);
            // console.log('(2)urlSearch: ', this.urlSearch);
        }

        // $('<div class="message loading new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure><span></span></div>').appendTo($('.mCSB_container'));
        $('<div class="message loading new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure><span></span></div>').appendTo($('.messages-content'));
        this.updateScrollbar();

        this.http.get(this.urlSearch).subscribe(data => {
            if (!data.hasOwnProperty('data')) {
                this.handshake = 1;

                console.log(this.welcomeTxt);

                if (this.welcomeTxt.indexOf("||") != -1) {
                    //챗봇이 말하는 부분 말풍선 두개 생성
                    this.array = this.welcomeTxt.split('||');

                    setTimeout(() => {
                        for (var j = 0; j < this.array.length; j++) {
                            console.log("1: ", this.array);
                            $('.message.loading').remove();
                            $('<div class="message new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure>' + this.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
                            //console.log(array[j]);
                            this.setDate();
                            this.updateScrollbar();

                            i++;
                        }
                    }, 1000);

                } else {

                    //일반적으로 챗봇이 말하는 부분
                    setTimeout(() => {
                        $('.message.loading').remove();
                        $('<div class="message new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure>' + this.welcomeTxt + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        this.setDate();
                        this.updateScrollbar();

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
                    $('<div class="message new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure>' +
                        '<iframe id="player" width="250" height="250" type="text/html" src="http://www.youtube.com/embed/' + video_id + '?enablejsapi=1&start=1&origin=http://example.com&modestbranding=1" frameborder="0">' +
                        '</iframe></div>').appendTo($('.mCSB_container')).addClass('new');
                    this.setDate();
                    this.updateScrollbar();

                }

                else if (data.data.message.indexOf("I don't understand that yet.") != -1) {
                    this.chatbot_undefined(this.msg);
                }
                else if (data.data.message.indexOf("||") != -1) {

                    //챗봇이 말하는 부분 말풍선 두개 생성
                    this.array = data.data.message.split('||');

                    setTimeout(() => {
                        for (var j = 0; j < this.array.length; j++) {
                            //console.log(array);
                            $('.message.loading').remove();
                            $('<div class="message new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure>' + this.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
                            //console.log(array[j]);
                            this.setDate();
                            this.updateScrollbar();

                            i++;
                        }
                    }, 1000);

                } else {

                    //일반적으로 챗봇이 말하는 부분
                    setTimeout(() => {
                        $('.message.loading').remove();
                        $('<div class="message new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure>' + data.data.message + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        this.setDate();
                        this.updateScrollbar();

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
                            this.num = this.num + 1;

                            //메시지창
                            $('<div id=cardview' + this.num + ' class="message new"></div>').appendTo($('.mCSB_container')).addClass('new');
                            //카로셀 시작
                            $('<div id=carousel' + this.num + ' class="carousel  slide line" data-ride="carousel"  ><div  id=carousel_list' + this.num + ' class="carousel-inner" role="listbox"></div></div>').appendTo($('#cardview' + this.num + '')).addClass('carousel');
                            //left 양옆 화살표
                            $('<a  href=#carousel' + this.num + ' role="button" data-slide="prev"><span  class="glyphicon glyphicon-chevron-left" aria-hidden="true"><span class="sr-only">Previous</span></span></a>').appendTo($('#carousel' + this.num + '')).addClass('carousel-control').addClass('left');
                            // right양옆 화살표
                            $('<a  href=#carousel' + this.num + ' role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right"  aria-hidden="true"><span class="sr-only" >Next</span></span></a>').appendTo($('#carousel' + this.num + '')).addClass('carousel-control').addClass('right');


                            if (uiScript_content_card.options[0].type == "LINK") {
                                // link 카로셀 리스트 출력
                                $('<a  href=' + uiScript_content_card.options[0].id + ' target="_blank" ><div><img class="card_img"  src=' + uiScript_content_card.options[0].filename + '><br/><div align="center">' + uiScript_content_card.options[0].text + '</div></div></a>').appendTo($('#carousel_list' + this.num + '')).addClass('item').addClass('active');
                            }
                            else {

                                // msg 카로셀 리스트 출력
                                $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=card' + i + ' ><div><img class="card_img"  src=' + uiScript_content_card.options[0].filename + '><br/><div align="center">' + uiScript_content_card.options[0].text + '</div></div></a>').appendTo($('#carousel_list' + this.num + '')).addClass('item').addClass('active');
                                this.listMeuns[i] = uiScript_content_card.options[0].id;
                            }


                            for (var i = 1; i < uiScript_content_card.options.length; i++) {
                                //  console.log(num);

                                if (uiScript_content_card.options[i].type == "LINK") {

                                    $('<a  href=' + uiScript_content_card.options[i].id + ' target="_blank" ><div><img class="card_img" src=' + uiScript_content_card.options[i].filename + '><br/><div align="center" >' + uiScript_content_card.options[i].text + '</div></div></a>').appendTo($('#carousel_list' + this.num + '')).addClass('item');
                                    this.updateScrollbar();
                                } else {

                                    $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=card' + i + ' ><div><img class="card_img" src=' + uiScript_content_card.options[i].filename + '><br/><div align="center">' + uiScript_content_card.options[i].text + '</div></div></a>').appendTo($('#carousel_list' + this.num + '')).addClass('item');
                                    this.updateScrollbar();
                                    this.listMeuns[i] = uiScript_content_card.options[i].id;
                                }
                            }
                        }


                        //리스트 메뉴
                        if (uiScript_type == "listMenu") {

                            //uiScript_content 파싱
                            var uiScript_content_list = JSON.parse(uiScript_content);

                            //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
                            this.num = this.num + 1;


                            //메시지 CSS 창
                            $('<div  id=listview' + this.num + ' class="message new"><figure class="avatar"></figure></div>').appendTo($('.mCSB_container')).addClass('new');

                            for (var i = 0; i < uiScript_content_list.options.length; i++) {
                                // console.log(this.num);


                                if (uiScript_content_list.options[i].type == "LINK") {
                                    $('<a  href=' + uiScript_content_list.options[i].id + ' target="_blank" ><img class="list_img" src=' + uiScript_content_list.options[i].filename + '>' + uiScript_content_list.options[i].text + '</div></a><br/>').appendTo($('#listview' + this.num));
                                    this.updateScrollbar();



                                } else {
                                    $('<a  href="javascript:void(0)" onclick="uiScript_msg(id);" id=list' + i + ' ><img class="list_img" src=' + uiScript_content_list.options[i].filename + '>' + uiScript_content_list.options[i].text + '</div></a><br/>').appendTo($('#listview' + this.num));
                                    this.updateScrollbar();
                                    this.listMeuns[i] = uiScript_content_list.options[i].id;

                                }

                            }
                        }


                        //버튼 메뉴
                        if (uiScript_type == "button") {
                            //  console.log('sdfdsfsdf');
                            //uiScript_content 파싱
                            var uiScript_content_button = JSON.parse(uiScript_content);

                            //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
                            this.num = this.num + 1;

                            //메시지 CSS 창
                            $('<div  id=buttonview' + this.num + ' class="message new"><figure class="avatar"></figure></div>').appendTo($('.mCSB_container')).addClass('new').addClass('chat-button-list');


                            for (var i = 0; i < uiScript_content_button.options.length; i++) {

                                //console.log("ddd:", uiScript_content_button.options[i].type);
                                if (uiScript_content_button.options[i].type == "URL") {
                                    $('<a  href=' + uiScript_content_button.options[i].id + ' target="_blank" ><div class="button_list" align="center">' + uiScript_content_button.options[i].text + '</div></a>').appendTo($('#buttonview' + this.num));
                                    this.updateScrollbar();
                                } else {

                                    $('<a  href="javascript:void(0)" onclick="uiScript_msg(id)" id=button' + i + '><div class="button_list" align="center">' + uiScript_content_button.options[i].text + '</div></a>').appendTo($('#buttonview' + this.num));
                                    this.updateScrollbar();
                                    this.listMeuns[i] = uiScript_content_button.options[i].id;

                                }
                            }
                        }


                        //사용자 UI 메뉴
                        if (uiScript_type == "customGUI") {


                            $('.message.loading').remove();
                            $('<div class="message new">' + uiScript_content + '</div>').appendTo($('.mCSB_container')).addClass('new');
                            this.setDate();
                            this.updateScrollbar();

                        } //사용자 UI 메뉴 끝


                    } //uiscript를 출력하는 함수의 끝

                }

            } //메시지를 출력하는 함수 끝

            this.test = "true";
        });
    }

    chatbot_undefined(text) {
        var inputData = { 'text': text };

        console.log("inputData : " + inputData.text, this.chatterbotUrl);

        this.http.post(this.chatterbotUrl, inputData).subscribe(data => {
            console.log('data: ', data);

            if (data.text.indexOf("||") != -1) {
                //챗봇이 말하는 부분 말풍선 두개 생성
                this.array = data.text.split('||');
                console.log('data: ', data);

                setTimeout(() => {
                    for (var j = 0; j < this.array.length; j++) {
                        //console.log(array);
                        $('.message.loading').remove();
                        $('<div class="message new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure>' + this.array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        //console.log(array[j]);
                        this.setDate();
                        this.updateScrollbar();

                        this.i++;
                    }
                }, 1000);

            } else {
                console.log("inputData : " + inputData.text);

                //일반적으로 챗봇이 말하는 부분
                setTimeout(() => {
                    $('.message.loading').remove();
                    $('<div class="message new"><figure class="avatar"><img src=../img/' + this.img[this.change % 2] + ' /></figure>' + data.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
                    this.setDate();
                    this.updateScrollbar();

                    this.i++;
                }, 1000);
            }
        }, error => {
            alert("어머! 통신장애 같아요!!");
        });
    }
}