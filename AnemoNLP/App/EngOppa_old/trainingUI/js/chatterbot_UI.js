
//특수문자 정규식( 특수기호  !?,.만 가능)
    var check = /[@#$%^&*(){}+=|<>;/]/;
//숫자 정규식
//  var check_num= /[0-9]/;
//input 값 수정시 조건에 부합하지 않으면 처음 입력값으로 변경
var input_onfocus_value="";



//메뉴에서 선택시 id값 저장
    var Menu ="";
//메뉴 삭제
    var Menu_delete="";


//생성되는 메뉴를 구분하기 위한 변수
var meun_divide = 0;

//생성되는 data를 구분하기 위한 변수
var data_divide = 0;

//Q_A 를 구분하기 위한 변수
var QnA_divide =0;



var openInbox = document.getElementById("myBtn");
openInbox.click();

function menu_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("myOverlay").style.display = "block";
   // console.log("메뉴창이 열릴때 사용");
}
function menu_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("myOverlay").style.display = "none";
  ///  console.log("메뉴창이 닫힐때 사용");
}
//메뉴 동작 부분
function menu_func(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
        x.previousElementSibling.className += " w3-red";
    } else {
        x.className = x.className.replace(" w3-show", "");
        x.previousElementSibling.className =
            x.previousElementSibling.className.replace(" w3-red", "");
    }
}


//선택 메뉴에 따른  content  내용을 보여줌
function openMail(personName,value) {

    Menu =personName ;
    Menu_delete =value;
    var i;
    var x = document.getElementsByClassName("person");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x = document.getElementsByClassName("test");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" w3-light-grey", "");
    }

    document.getElementById(personName).style.display = "block";
    event.currentTarget.className += " w3-light-grey";


}





//메뉴부분 생성 함수
function menu_add() {
    //메뉴 input 값
    var content_add= $('.menu_list_add').val();

    //조건 검사
    if(content_add  ==""){
        alert("공백은 입력 할 수 없습니다.");
        return false;

    }else if(check.test(content_add) == true) {
        $('.menu_list_add').val("");//틀린 값 초기화
        alert("특수문자는 입력할 수 없습니다.");
        return false;

    }


    //메뉴값 구별
    meun_divide= meun_divide+1;


    //카테고리, 질문, 답변을 추가하는 태그 아이디
    var content_list = "content_list"+ meun_divide;

    //카테고리추가 입력 받을 태그
    var category_add ="category_add"+meun_divide;
    //카테고리 추가입력값
    var category_value="category_value"+meun_divide;

    //파일명 삭제
    var file_delete_data="file_delete"+meun_divide;


    //console.log("숫자"+num1);
    //console.log("content_list"+content_list);
    //console.log("categord:::"+category_add);
    $(' <a href="javascript:void(0)" class="w3-bar-item w3-button w3-border-bottom test w3-hover-light-grey '+file_delete_data+'" onclick="openMail(\''+content_list+'\',\''+file_delete_data+'\');menu_close();menu_load();"> ' +
        '<span class="link"  onclick="document.getElementById(\'id01\').style.display=\'block\';"><img class="remove_view" src="http://35.189.163.55:8080/anemo/trainingUI/img/img2.png"/></span><div class="w3-container file_padding"><span class="w3-opacity w3-large '+content_list+'" >'+content_add+'</span></div></a>').appendTo($('#menu_list')).addClass('.test');


    $(' <div id="'+content_list+'" class="person w3-container "><div class="'+category_add+'" style="margin-top: 60px;">\n' +
        '            <a class="add_link"   onclick="add_data(id,\''+category_value+'\')" id="'+category_add+'"><img  class="plus_view" src="http://35.189.163.55:8080/anemo/trainingUI/img/img1.png"/></a>\n' +
        '            <input type ="text"   onchange ="add_data(\''+category_add+'\',\''+category_value+'\')" onkeydown="keyboard(\''+category_add+'\',\''+category_value+'\',event.keyCode)" placeholder="카테고리를 추가하세요"  class="'+category_value+'" style="width: 80%;" >\n' +
        '            </div></div>').appendTo($('.chat_list'));
    $(' <button class="w3-red w3-button w3-right"  onclick="QnA_add(\''+content_list+'\');">질문 답 추가</button>').appendTo($('#'+content_list));

    QnA_add(content_list);

    document.getElementById(content_list).style.display = "none";

    //input에서 받는 vlaue 값을 초기화 합니다.
    $(".menu_list_add").val("");

    return false;
}



//질문 답 부분 추가
function  QnA_add(value) {
    QnA_divide=QnA_divide+1;

    //카테고리추가 입력 받을 태그
    var Q_add ="Q_add"+QnA_divide;
    //카테고리 추가입력값
    var Q_value="Q_value"+QnA_divide;

    //카테고리추가 입력 받을 태그
    var A_add ="A_add"+QnA_divide;
    //카테고리 추가입력값
    var A_value="A_value"+QnA_divide;



    $(  '            <hr/>\n' +
        '            <div  class="'+Q_add+' set">\n' +
        '            <a style="margin-bottom: 60px;" class="add_link"  onclick="add_data(id,\''+Q_value+'\')" id="'+Q_add+'"><img  class="plus_view" src="http://35.189.163.55:8080/anemo/trainingUI/img/img1.png"/></a>&nbsp;\n' +
        '            <input class="'+Q_value+' Q" type="text" placeholder="질문을 추가하세요"onkeydown="keyboard(\''+Q_add+'\',\''+Q_value+'\',event.keyCode)" onchange ="add_data(\''+Q_add+'\',\''+Q_value+'\')"><br/>\n' +
        '            </div>\n' +
        '            <br/>\n' +
        '            <div style="margin-left: 40px;" class="'+A_add+' set">\n' +
        '            <a class="add_link"  onclick="add_data(id,\''+A_value+'\')" id="'+A_add+'"><img  class="plus_view" src="http://35.189.163.55:8080/anemo/trainingUI/img/img1.png"/></a>&nbsp;\n' +
        '            <input class="'+A_value+'" type="text" placeholder="답변을 추가하세요" onkeydown="keyboard(\''+A_add+'\',\''+A_value+'\',event.keyCode)" onchange ="add_data(\''+A_add+'\',\''+A_value+'\')"></div> </div>').appendTo($('#'+value));



    return false;
}

test_1 ='';

list = 0;
//데이터 값을 입력해주는 함수
function add_data(id, value) {

   /* console.log('ss',value.value);
    test_1 =value.value;
    if (test_1 == "undefined") {
        alert("질문을 입력하세요!!");
        return false;
    }*/


    //console.log("data 를 입력받는 div 태그값",id);
    //console.log("data 를 입력받는 input 태그값:",value);


    //input value 값 변수
    var content_add  = $('.'+value).val();

    //조건 검사
    if(content_add  ==""){

        alert("공백은 입력 할 수 없습니다.");
        return false;

    }else if(check.test(content_add) == true){

        $('.'+value).val("");
        alert("특수문자는 입력할 수 없습니다.");
        return false;

    }

    //추가 값 구별
    data_divide=data_divide+1;

    //추가된 태그
    var add_id =  "add"+data_divide;
    //삭제할 id 값
    var delete_id = "delete"+data_divide;
    //추가된 input 태그
    var content_lists ="content_lists"+data_divide;

   // list = list + 1;
   //  console.log('ddd',list);

    if(id.indexOf("Q_add")!= -1){



        $('.'+value).css("display", 'none');
        $('#'+id).css('display','none');


        $('<div class="set" id="'+add_id+'"><img class="directory_view" src="./img/img3.png"/><a class="add_link"  id="'+delete_id+'" onclick="data_delete (id,\''+value+'\',\''+id+'\')"><img class="remove_view" src="http://35.189.163.55:8080/anemo/trainingUI/img/img2.png"/></a>' +
            '<input id="'+content_lists+'" class="QnA Q_divide"  type="text"  onfocus="input_onfocus(id);" onblur="input_onblur(id);"></div>').appendTo($('.'+id)).addClass('.add_link');

        $("#"+content_lists).val(content_add);
        $('.'+value).val("");


    }else if(id.indexOf("category")!= -1){

        $('<div class="set" id="'+add_id+'"><img class="directory_view" src="./img/img3.png"/><a class="add_link"  id="'+delete_id+'" onclick="data_delete (id)"><img class="remove_view" src="http://35.189.163.55:8080/anemo/trainingUI/img/img2.png"/></a>' +
            '<input id="'+content_lists+'" class="category"  type="text"  onfocus="input_onfocus(id);" onblur="input_onblur(id);"></div>').appendTo($('.'+id)).addClass('.add_link');


        $("#"+content_lists).val(content_add);
        $('.'+value).val("");



    } else if(id.indexOf("A_add")!=-1){

        var category_add_input = $('#'+Menu).find('.Q');

        for(var i=0; i<category_add_input.length; i++){

            var tt =  $(category_add_input[i]).css('display');
            console.log("tt: ",tt);
                if(tt =="inline-block") {
                    alert("질문을 먼저 입력해 주세요!!!");
                    return false;
                }
        }


        $('<div  class="set" id="'+add_id+'"><img class="directory_view" src="./img/img3.png"/><a class="add_link"  id="'+delete_id+'" onclick="data_delete (id)"><img class="remove_view" src="http://35.189.163.55:8080/anemo/trainingUI/img/img2.png"/></a>' +
            '<input id="'+content_lists+'" class="QnA"  type="text" onfocus="input_onfocus(id);" onblur="input_onblur(id);"></div>').appendTo($('.'+id)).addClass('.add_link');

        $("#"+content_lists).val(content_add);
        $('.'+value).val("");



    }
}



//데이터 삭제
function data_delete(id,value,text){
 //   console.log("data 삭제 태그:",id);
 //   console.log("부모 input 태그:", value);
 //   console.log("부모 div 태그:", text);
    var delete_id = $("#"+id).parent().attr("id");
    $("#"+delete_id).remove();


    //질문값은 하나만 받는걸로 제한 한다.
    if(value != undefined){

        $('.'+value).css('display','inline');
        $('#'+text).css('display','inline');
    }

}



function data_json() {

    if(Menu==""){
        alert("작성된 내용이 없습니다.");
        return false;
    }

    var QnA_add_input = $('#'+Menu).find('.QnA').css('color','red');
    var category_add_input = $('#'+Menu).find('.category').css('color','red');


    var category_add_input_start = category_add_input.length;
    var category_ar = new Array();

    for(var i =0; category_add_input_start>i; i++ ){

        var category_add_list = category_add_input[i];

        category_ar[i]="- "+category_add_list.value;

    }

    var QnA_add_input_start = QnA_add_input.length;
    var Q_ar = new Array();
    var A_ar = new Array();

    var a= 0;
    for(var i =0; QnA_add_input_start>i; i++ ){

        var QnA_add_list = QnA_add_input[i];
        var Q_divide = $(QnA_add_list).attr("class");
     //   console.log("Q_divide:",Q_divide);


        if(Q_divide.indexOf("Q_divide")!=-1){

            a= a+1;
            Q_ar[a-1]="- - "+QnA_add_list.value;
            A_ar[a-1]='';

        }else{

           var A_test ="- "+QnA_add_list.value;
           console.log(A_test);

            A_ar[a-1]+= A_test  ;

        }

    }

    var name = $('.'+Menu).text();

  //  console.log(Q_ar);
 //  console.log(A_ar);

    json_test(name,category_ar,Q_ar,A_ar);


}












function json_test(name,category,Q_ar,A_ar, method) {
console.log("name:"+name,"catetgory"+category,"Q_ar"+Q_ar,"A_ar"+A_ar );


    method = method || "post";

    var form = document.createElement("form");
    form.setAttribute("target",  "ifrm");
    form.setAttribute("method", method);
    form.setAttribute("action", 'http://35.194.131.173:8082/learningdata');
    //form.setAttribute("action", 'http://localhost:63342/chat_UI/UI/result.html');

    var hiddenField  = document.createElement("iframe");
    hiddenField.setAttribute("name", "ifrm");

    var hiddenField  = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "csrfmiddlewaretoken");
    hiddenField.setAttribute("value", "UUwouEs8S9uw7m34PuI5J3ocNL1ya3BVO7vW5O75sORCUGEfEh3Uu6uqnOaHIlnT");
    form.appendChild(hiddenField );


    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "name");
    hiddenField.setAttribute("value", name);
    form.appendChild(hiddenField);

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "category");
    hiddenField.setAttribute("value", category);
    form.appendChild(hiddenField);

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "Q_ar");
    hiddenField.setAttribute("value", Q_ar);
    form.appendChild(hiddenField);



    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "A_ar");
    hiddenField.setAttribute("value", A_ar);
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
}






//메뉴 input enter 함수
$(".menu_list_add").on('keydown', function(e) {
    if (e.which == 13) {
        menu_add();
        return false;
    }
})


//data input enter 함수
function keyboard(id,value,e) {
//console.log("div 태그 값:",id);
//console.log("input 태그 value:",value);
//console.log("키보드값:"e);
    if (e == 13) {
         add_data(id,value);
        return false;
    }
}


function menu_load() {
    menu_load_value=$('.'+Menu).text();

    $('#file_change_input').val(menu_load_value);
}


//메뉴 수정 함수
function menu_change() {
    var menu_change_name = $('#file_change_input').val();

    if(menu_change_name  ==""){
        $('#file_change_input').val(menu_load_value);
        document.getElementById('id01').style.display='block';
        alert("공백은 입력 할 수 없습니다.");

        return false;

    }else if(check.test(menu_change_name) == true){
        $('#file_change_input').val(menu_load_value);
        document.getElementById('id01').style.display='block';
        alert("특수문자는 입력할 수 없습니다.");
        return false;

    }
    document.getElementById('id01').style.display='none';
     $('.'+Menu).text(menu_change_name);
    $('#file_change_input').val("");


}

//메뉴 삭제 함수
function file_delete() {
    alert("삭제하시면 복구가 불가능 합니다.");
    $("#"+Menu).remove();
    $("."+Menu_delete).remove();
    document.getElementById('id01').style.display='none';
}



//포커스를 받을때 변경되기 전의 input 값을 저장함
function input_onfocus (id) {
    //포커스를 받은 input id
    //console.log(id);
    input_onfocus_value=  $('#'+id).val();

}

//포커스를 잃을때 변경된 값을 확인한후 input 값을 변경함
function input_onblur (id,value) {
    //포커스를 받은 input id
    //console.log(id);

    //포커스를 받으면 글자색상을 변경한다.
    $('#'+id).css('color','#000000');

    //input 수정을 끝낸 값을 받아와 조건을 확인한다.
    var input_onblur_value=  $('#'+id).val();

    if(input_onblur_value ==""){
        $('#'+id).val(input_onfocus_value);
        alert("공백은 입력 할 수 없습니다.");
        return false;

    }else if(check.test(input_onblur_value) == true){
        $('#'+id).val(input_onfocus_value);
        alert("특수문자는 입력할 수 없습니다.");
        return false;

    }


}

