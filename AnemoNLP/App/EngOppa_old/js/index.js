var $messages = $('.messages-content'), d, h, m, i = 0;
console.log(typeof($('.messages-content')));
console.log($messages);
var num = 0 ;
var msg ='ok';
//중복 메시지를 보낼 수 없게하는 변수
var test ='';
//이미지 변경 관련 변수
var change = 1;

var botID = "BB-b10-20171127212133-yD778KS5Ly";
var userID = "4hOZJ2wPAuU3qFe4dkjQclkk8ws2";

//img 주소 변경
img = new Array();
img[0] = "./img/eng_oppa_logo.png";
img[1] = "./img/eng_oppa_logo.png";

//최초 웰컴 메세지
var welecomeTxt = '안녕 나는 공대오빠 박보검이야 || 뭘 도와줄까? 혹시 컴퓨터를 알아보러 왔다면 내 이름을 외쳐봐.';

var chatterbotUrl = "http://localhost:8082/chatterbot/";


$(window).load(function() {
     content_text = document.getElementsByClassName('mCSB_container');

    $messages.mCustomScrollbar();
    setTimeout(function() {
        //AIML 봇 초기화
        chatbot_start();
    }, 100);
});


function updateScrollbar() {
    $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
    });
}


function setDate(){
    d = new Date();
    if (m != d.getMinutes()) {
        m = d.getMinutes();

        var x = document.querySelectorAll(".message");
        ///console.log(x[x.length-1]);


        x[x.length-1].innerHTML +='<div class="timestamp">' + d.getHours() + ':' + m + '</div>';    //메시지 시간 표기
        x[x.length-1].innerHTML +='<div class="checkmark-sent-delivered">&check;</div>';            //메시지 화살표 이미지
        x[x.length-1].innerHTML +='<div class="checkmark-read">&check;</div>';                      //메시지 화살표 이미지


        /*  $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));   //메시지 시간 표기
            $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));          //메시지 화살표 이미지
            $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));                   //메시지 화살표 이미지
        */
    }
}

function insertMessage() {
    var input_msg =document.getElementsByClassName('message-input');

    // user에게 입력받은 값
  //  msg = $('.message-input').val();
    msg =input_msg[0].value;

    // console.log(msg);

    //메세지에 .jpg가 포함되면 다음 api를 불러온다.
    if(msg.indexOf(".jpg") != -1){

        var usr_jpg =document.createElement('div');
        usr_jpg.className ='message message-personal new';
        content_text[0].appendChild(usr_jpg).innerHTML ='<img style="height:250px; width: 250px;"  src="' + msg + '"/>';

      //  $('<div class="message message-personal"><img style="height:250px; width: 250px;"  src="' + msg + '"/></div>').appendTo($('.mCSB_container')).addClass('new');
        setDate();
        updateScrollbar();

        var usr =document.createElement('div');
        usr.className ='message loading new';

        content_text[0].appendChild(usr).innerHTML ='<figure class="avatar"><img src=' + img[change % 2] + ' /></figure><span></span>';
        updateScrollbar();

        jQuery.ajax({
            type: "GET",
            url: 'http://130.211.252.235:5000/img='+msg,
            dataType: "jsonp",

            success: function (data) {

             for(key in data) {
                //  console.log('key:' + key + ' / ' + 'value:' +data[key]);
                      var img_msg =key;
                      return img_text();
             }


             function img_text() {

                 //chatterbot 메시지를 연동합니다.
                 $('.message-input').val(null);
                    updateScrollbar();
                    setTimeout(function() {
                           chatbot_undefined(img_msg);}, 1); }

                 },
            error: function(xhr) {
                $('.message-input').val(null);
                console.log('실패 - ', xhr);
            }
        });
        return false;
    }


    //입력받은 값의 공백을 제거
    if ($.trim(msg) == '') {
        return false;
    }
    /* //중복입력 방지
     if(test=="false"){
         //console.log(msg);
         return null;
     }*/
    var usr_msg =document.createElement('div');
    usr_msg.className ='message message-personal new';
    content_text[0].appendChild(usr_msg).innerHTML =msg ;

    //var  loading_img_remove=document.getElementsByClassName("loading");

   // $('.message-input').val(null);
    input_msg[0].value ="";
    setDate();
    updateScrollbar();
    setTimeout(function() {
        chatbot_start();
    }, 1);
}

//send 버튼 클릭시 insertMessage 불러와
$('.message-submit').click(function() {
    insertMessage();
});


window.onkeydown= function (e) {
     if (e.which == 13) {
         insertMessage();
         return false;
     }
 }





//상단 메뉴 버튼 동작 "..."

$('.button').click(function(){

      $('.menu .items span').toggleClass('active');
      $('.menu .button').toggleClass('active');
});






//하단에 처음 챗봇을 띄울때
function chat_view(id) {
    //alert(id);
    var x = document.getElementById(id);
    if(id.match(/hide1/)){

        //이미지를 지운다.
        var y = document.getElementById('hide2');
        y.style.display="none";
        y.className = y.className.replace(" w3-show", "");

    }else{

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



//... 메뉴창에 이미지를 변경할 수 있는 창으로 전환해준다.
openMail("aa");
function openMail(personName) {
    var i;
    var x = document.getElementsByClassName("person");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    document.getElementById(personName).style.display = "block";

}



function chatbot_undefined(text) {
    //console.log(text);
    var inputData = {'text': text };
    console.log("inputData : " + inputData.text);

    $.ajax({
        type: 'POST',
        url: chatterbotUrl,
        data: JSON.stringify(inputData),
        contentType: 'application/json',
        dataType: "json",
            success: function (data) {
            if (data.text.indexOf("||") != -1) {

                    //챗봇이 말하는 부분 말풍선 두개 생성
                    array = data.text.split('||');

                    setTimeout(function () {
                        for (var j = 0; j < array.length; j++) {
                            //console.log(array);
                            $('.message.loading').remove();
                            $('<div class="message new"><figure class="avatar"><img src=' + img[change % 2] + ' /></figure>' + array[j] + '</div>').appendTo($('.mCSB_container')).addClass('new');
                            //console.log(array[j]);
                            setDate();
                            updateScrollbar();

                            i++;
                        }
                    }, 1000);

                } else {

                    //일반적으로 챗봇이 말하는 부분
                    setTimeout(function () {
                        $('.message.loading').remove();
                        $('<div class="message new"><figure class="avatar"><img src=' + img[change % 2] + ' /></figure>' + data.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
                        setDate();
                        updateScrollbar();

                        i++;
                    }, 1000);
                }


        }, error: function (xhr, status, error) {
            alert("어머! 통신장애 같아요!!");
        }
    });

}