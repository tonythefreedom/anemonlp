
//최초 접속 핸드쉐이크
var handshaked = false;
var urlSearch = null;

//chatbot addguI 메세지를 받을 변수
listMeuns = new Array();
listMeuns[0] =0;


var urlAIMLBotStart = "http://35.186.253.168:8080/Sarah/chat?userID="+userID+"&botID="+botID+"&lang=KO&run=init&question=1";
var urlAIMLBotConv = "http://35.186.253.168:8080/Sarah/chat?userID="+userID+"&botID="+botID+"&lang=KO";

//ajax로 inbi 메시지를 불러옵니다.
function chatbot_start() {



    /*
     if ($('.message-input').val() != '') {
         return null;
     }//중복입력 방지
     else if (test == "false") {
         return null;
     }*/

    if (!handshaked) {
        //서버 연결 url
        urlSearch = urlAIMLBotStart;
        handshaked = true;
    } else {
        //메시지 연결 url  //encodeURIComponent(msg)인코딩된 url를 반환하는 함수
        urlSearch = urlAIMLBotConv + "&question=" + encodeURIComponent(msg);
    }


    //전체의 챗봇 메세지를 출력할 배경입니다.
    var loading =document.getElementsByClassName('mCSB_container');


    //로딩 되는 이미지를 출력합니다.
    var LoadingImg =document.createElement('div');
    LoadingImg.className ='message loading new';
    loading[0].appendChild(LoadingImg).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure><span></span></div>';
    //스크롤바를 출력내용에 맞춰어 하단으로 이동합니다.
    updateScrollbar();

    //챗봇 빌더 api를 진행 합니다.
    jQuery.ajax({
        type: "GET",
        url: urlSearch,
        xhrFields: {
            //핸드쉐이크 메세지를 받기 위해 쿠키에 세션 설정
            withCredentials: true
        },
        contentType: "application/json",
        dataType: "json",
        success: function (data) {

            // console.log("data:",data.data);
            // console.log(loading_img_remove[0]);

            //로딩 이미지를 삭제 하기 위한 변수 선언입니다.
            var  LoadingImgRemove=document.getElementsByClassName("loading");

            //처음 챗봇빌더를 연결할때 출력할 메세지
            if (data.data == null) {
                handshake = 1;
                //메세지 말풍선 두개 생성
                if (welecomeTxt.indexOf("||") != -1) {
                    //msg_division 지역변수 선언  welecomTxt 출력후 소멸 됩니다.
                    var MsgDivision =[];
                    MsgDivision = welecomeTxt.split('||');

                    setTimeout(function () {
                        //로딩 이미지 삭제
                        LoadingImgRemove[0].parentNode.removeChild(LoadingImgRemove[0]);

                        for (var j = 0; j < MsgDivision.length; j++) {
                            var LoadingMsg =document.createElement('div');
                            LoadingMsg.className ='message new';

                            if(j+1< MsgDivision.length){
                                loading[0].appendChild(LoadingMsg).innerHTML ='<figure class="avatar"></figure>' + MsgDivision[j] ;
                            }else{
                                loading[0].appendChild(LoadingMsg).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure>' + MsgDivision[j] ;
                                setDate();
                                updateScrollbar();
                            }
                            //console.log(MsgDivision);
                            //  console.log(MsgDivision[j]);
                            i++;
                        }
                    }, 1000);



                } else {

                    //메세지를 출력하는 부분
                    setTimeout(function () {
                        LoadingImgRemove[0].parentNode.removeChild(LoadingImgRemove[0]);

                        //메세지 출력
                        var LoadingMsg =document.createElement('div');
                        LoadingMsg.className ='message new';
                        LoadingMsg[0].appendChild(LoadingMsg).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure>' + welecomeTxt + '';
                        setDate();
                        updateScrollbar();

                        i++;
                    }, 1000);
                }

            } else {

                //빌더에서 받아온 data를 변수에 선언합니다.
                var ChatData =data.data.message;
                //console.log(ChatData);

                //챗봇 빌더가 진행되는 부분
                //UIscript에 유튜브 동영상이 존재하면 if를 수행합니다.
                if(ChatData.indexOf("kind") != -1){
                    //  console.log("data:"+data.data.message.indexOf("kind"));
                    //VideoList를 파싱합니다.
                    var VideoList = JSON.parse(ChatData);
                    var VideoId ="";

                    LoadingImgRemove[0].parentNode.removeChild(LoadingImgRemove[0]);
                    //찾아온 유튜브 영상을 메세지창에 출력합니다.

                    var LoadingVoide =document.createElement('div');
                    LoadingVoide.className ='message new';

                    //가져온 id명을 구별한후 video_id 변수에 저장합니다.
                    if(VideoList.videoId != undefined){
                        VideoId=VideoList.videoId;
                        loading[0].appendChild(LoadingVoide).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure><iframe id="player" width="250" height="250" type="text/html" src="http://www.youtube.com/embed/'+VideoId+'?enablejsapi=1&start=1&origin=http://example.com&modestbranding=1" frameborder="0"></iframe>';
                        setDate();
                        updateScrollbar();

                    }else if(VideoList.playlistId != undefined){
                        VideoId= VideoList.playlistId;
                        loading[0].appendChild(LoadingVoide).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure><iframe id="player" width="250" height="250" type="text/html" src="https://www.youtube.com/embed/?listType=playlist&list='+VideoId +'" frameborder="0"></iframe>';
                        setDate();
                        updateScrollbar();

                    }else{
                        VideoId= VideoList.channelId;
                        loading[0].appendChild(LoadingVoide).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure><iframe id="player" width="250" height="250" type="text/html" src="https://www.youtube.com/embed/?listType=search&list='+VideoId +'" frameborder="0"></iframe>';
                        setDate();
                        updateScrollbar();

                    }



                }
                //챗봇에서 지정된 대화 모듈이 없으면 chatterbot으로 메세지를 출력합니다.
                else if (ChatData.indexOf("I don't understand that yet.") != -1) {
                    chatbot_undefined(msg);
                }
                //챗봇빌더 말하는 부분 말풍선 두개 생성
                else if (ChatData.indexOf("||") != -1) {

                    var MsgDivision =[];
                    MsgDivision = data.data.message.split('||');

                    setTimeout(function () {
                        LoadingImgRemove[0].parentNode.removeChild(LoadingImgRemove[0]);

                        for (var j = 0; j < MsgDivision.length; j++) {
                            var ChatbotMsg =document.createElement('div');
                            ChatbotMsg.className ='message new';

                            loading[0].appendChild(ChatbotMsg).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure>' +MsgDivision[j] ;
                            //console.log(MsgDivision);
                            //console.log(MsgDivision[j]);
                            setDate();
                            updateScrollbar();
                            i++;
                        }
                    }, 1000);

                } else {

                    //일반적으로 챗봇이 말하는 부분
                    setTimeout(function () {

                        LoadingImgRemove[0].parentNode.removeChild(LoadingImgRemove[0]);

                        var ChatbotMsg =document.createElement('div');
                        ChatbotMsg.className ='message new';

                        loading[0].appendChild(ChatbotMsg).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure>' + data.data.message ;
                        updateScrollbar();
                        setDate();

                        i++;
                    }, 1000);
                }




                //add_GUI 가 존재 하면 if를 수행합니다.
                if (data.data.uiScriptArray != undefined) {

                    var add_gui_msg =0;

                    var uiScriptArray_length= data.data.uiScriptArray.length;
                    // console.log(uiScriptArray_length);

                    //ui for 진행
                    for(var j=0; j< uiScriptArray_length; j++){

                        var UIScriptType = data.data.uiScriptArray[j].type;
                        // console.log(UIScriptType);
                        var UIScriptContent = data.data.uiScriptArray[j].uiScript;
                        // console.log(UIScriptContent);


                        //카로셀 함수
                        if (UIScriptType == "cardMenu") {
                            //UIScriptContent 파싱
                            var UIScriptContentCard = JSON.parse(UIScriptContent);

                            //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
                            num = num + 1;
                            loading[0].style.visibility ='visible';
                            console.log(loading[0]);

                            //카로셀 출력
                            var loading_cardmsg =document.createElement('div');
                            loading_cardmsg.className ='message new';
                            loading_cardmsg.id ='cardview' + num;

                            loading[0].appendChild(loading_cardmsg).innerHTML = '' +
                                '<div id=carousel' + num + ' class="carousel  slide line" data-ride="carousel"  ><div  id=carousel_list' + num + ' class="carousel-inner" ></div>' +
                                '<a  href=#carousel' + num + ' class="carousel-control left" role="button" data-slide="prev"><span  class="glyphicon glyphicon-chevron-left" aria-hidden="true"><span class="sr-only">Previous</span></span></a><a  href=#carousel' + num + ' class="carousel-control right" role="button" data-slide="next"><span class="glyphicon glyphicon-chevron-right"  aria-hidden="true"><span class="sr-only" >Next</span></span></a></div>';

                            var ChatbotCardView =document.getElementById('carousel_list' + num + '');

                            if (UIScriptContentCard.options[0].type == "LINK") {
                                // link 카로셀 리스트 출력
                                add_gui_msg =add_gui_msg +1;
                                var ChatbotCard = document.createElement('a');
                                ChatbotCard.href = ""+ UIScriptContentCard.options[0].id +"/";
                                ChatbotCard.target = "_blank";
                                ChatbotCard.className ="active item";

                                ChatbotCardView.appendChild(ChatbotCard).innerHTML = '<div><img  class="card_img"  src="' + UIScriptContentCard.options[0].filename + '"/><br/><div align="center">' + UIScriptContentCard.options[0].text + '</div></div>';

                            }
                            else {
                                add_gui_msg =add_gui_msg +1;
                                var ChatbotCard = document.createElement('a');
                                ChatbotCard.className ="active item";

                                ChatbotCardView.appendChild(ChatbotCard).innerHTML = '<div id ="card'+add_gui_msg+'"  onclick=" uiScript_msg(id)"><img class="card_img"  src=' + UIScriptContentCard.options[0].filename + '><br/><div align="center">' + UIScriptContentCard.options[0].text + '</div></div>';

                                listMeuns[add_gui_msg] = UIScriptContentCard.options[0].id;
                            }


                            for (var i = 1; i < UIScriptContentCard.options.length; i++) {
                                //  console.log(num);

                                if (UIScriptContentCard.options[i].type == "LINK") {
                                    add_gui_msg =add_gui_msg +1;
                                    var ChatbotCard = document.createElement('a');
                                    ChatbotCard.href = UIScriptContentCard.options[0].id;
                                    ChatbotCard.target = "_blank";
                                    ChatbotCard.className ="item";

                                    ChatbotCardView.appendChild(ChatbotCard).innerHTML += '<div><img class="card_img" src=' + UIScriptContentCard.options[i].filename + '><br/><div align="center" >' + UIScriptContentCard.options[i].text + '</div></div>';

                                    setDate();
                                    updateScrollbar();
                                } else {

                                    add_gui_msg =add_gui_msg +1;
                                    var ChatbotCard = document.createElement('a');
                                    ChatbotCard.className ="item";

                                    ChatbotCardView.appendChild(ChatbotCard).innerHTML += '<div  id ="card'+add_gui_msg+'" onclick="uiScript_msg(id)"><img class="card_img" src=' + UIScriptContentCard.options[i].filename + '><br/><div align="center">' + UIScriptContentCard.options[i].text + '</div></div>';
                                    setDate();
                                    updateScrollbar();
                                    listMeuns[add_gui_msg] = UIScriptContentCard.options[i].id;
                                }
                            }
                        }


                        //리스트 메뉴
                        if (UIScriptType == "listMenu") {
                            //UIScriptContent 파싱
                            var UIScriptContentList = JSON.parse(UIScriptContent);

                            //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
                            num = num + 1;

                            var ChatbotListmenu = document.createElement('div');
                            ChatbotListmenu.id ='listview' + num ;
                            ChatbotListmenu.className ="message new";

                            loading[0].appendChild(ChatbotListmenu).innerHTML = '<figure class="avatar"></figure>' ;

                            //별도 선언된 id값에 따라 listmenu 출력
                            var ChatbotListmenuView = document.getElementById('listview' + num);


                            //메시지 CSS 창
                            for (var i = 0; i < UIScriptContentList.options.length; i++) {
                                // console.log(num);

                                if (UIScriptContentList.options[i].type == "LINK") {

                                    ChatbotListmenuView.innerHTML+='<a  href=' + UIScriptContentList.options[i].id + ' target="_blank" ><img class="list_img" src=' + UIScriptContentList.options[i].filename + '>' + UIScriptContentList.options[i].text + '</div></a><br/>';
                                    setDate();
                                    updateScrollbar();

                                } else {
                                    add_gui_msg =add_gui_msg +1;
                                    ChatbotListmenuView.innerHTML+='<a  href="javascript:void(0)" id ="list'+add_gui_msg+'" onclick="uiScript_msg(id);" ><img class="list_img" src=' + UIScriptContentList.options[i].filename + '>' + UIScriptContentList.options[i].text + '</div></a><br/>';
                                    setDate();
                                    updateScrollbar();
                                    listMeuns[add_gui_msg] = UIScriptContentList.options[i].id;

                                }

                            }
                        }


                        //버튼 메뉴
                        if (UIScriptType == "button") {

                            //UIScriptContent 파싱
                            var UIScriptContentButton = JSON.parse(UIScriptContent);

                            //id 값이 겹치지 않게 생성함 새로고침하면 0초기화
                            num = num + 1;

                            var ChatbotButton = document.createElement('div');
                            ChatbotButton.id ='buttonview' + num ;
                            ChatbotButton.className ="message new chat-button-list";

                            loading[0].appendChild(ChatbotButton).innerHTML = '<figure class="avatar"></figure>' ;
                            var ChatbotButtonView = document.getElementById('buttonview' + num);


                            for (var i = 0; i < UIScriptContentButton.options.length; i++) {

                                //console.log("ddd:", UIScriptContentButton.options[i].type);
                                if (UIScriptContentButton.options[i].type == "URL") {

                                    ChatbotButtonView.innerHTML+='<a  href=' + UIScriptContentButton.options[i].id + ' target="_blank" ><div class="button_list" align="center">' + UIScriptContentButton.options[i].text + '</div></a>';
                                    setDate();
                                    updateScrollbar();
                                } else {
                                    add_gui_msg =add_gui_msg +1;
                                    ChatbotButtonView.innerHTML+='<a  href="javascript:void(0)" id ="button'+add_gui_msg+'" onclick="uiScript_msg(id)" ><div class="button_list" align="center">' + UIScriptContentButton.options[i].text + '</div></a>';
                                    setDate();
                                    updateScrollbar();
                                    listMeuns[add_gui_msg]= UIScriptContentButton.options[i].id;

                                }
                            }
                        }



                        //사용자 UI 메뉴
                        if (UIScriptType == "customGUI") {
                            LoadingImgRemove[0].parentNode.removeChild(LoadingImgRemove[0]);

                            var chatbot_ui = document.createElement('div');
                            chatbot_ui.className ="message new";

                            loading[0].appendChild(chatbot_ui).innerHTML = UIScriptContent ;
                            setDate();
                            updateScrollbar();

                        } //사용자 UI 메뉴 끝
                    } //uiscript를 출력하는 함수의 끝
                }

            } //메시지를 출력하는 함수 끝

            test = "true";
        }, error: function (xhr, status, error) {
            alert("에러발생");
        }
    });
    test = "false";
}



//id값에 따른 챗봇 메시지 전송
function uiScript_msg(id) {
    //console.log("listMeun에서 받아온 값:"+  id);
    // console.log("test: ", $('#0').text());

    if(id.indexOf("list") !=-1){
        //  console.log('test', hh);
        var index = id.replace( "list", ""); }
    else if(id.indexOf("button") !=-1){
        // console.log('test', hh);
        var index = id.replace( "button", "");
    }
    else if(id.indexOf("card") !=-1){
        // console.log('test', hh);
        var index = id.replace( "card", "");
    }

    msg= listMeuns[index];

    var add_=document.getElementsByClassName('mCSB_container');
    var chatbot_add = document.createElement('div');
    chatbot_add.className ="message message-personal new";

    add_[0].appendChild(chatbot_add).innerHTML =   listMeuns[index] ;

    setDate();
    updateScrollbar();
    // $('.message-input').val(null);

    setTimeout(function() {
        chatbot_start();
    }, 1);

    //이미지 값을 저장한 배열 초기화
    // console.log("초기화",listMeuns[1]);
    //listMeuns = [];
}


