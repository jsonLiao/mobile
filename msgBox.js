function msgBox(msg, tm, callback) {
    tm= 3;
    layer.open({
        content: msg,
        style: 'background-color:rgba(0,0,0,0.8);border-radius: 6px; color:#fff; border:none; line-height:18px;',
        time: tm
    });
    if (callback) {
        setTimeout(callback, 3000);
    }
}

function msgBoxBtn(msg, text) {
    layer.open({
        content: msg,
        btn: [text]
    });
}

function msgBoxCon(content) {
    var idx = layer.open({
        shadeClose:false,
        content:content,
        style: 'background-color:#fff; color:#000; border:none;'
    });
    return idx;
}

function handle_storage(e) {
    if (!e) {
        e = window.event;
    }
    showObject(e);
}

function showObject(obj) {
    //递归显示object
    if (!obj) {
        return;
    }
    for (var i in obj) {
        if (typeof (obj[i]) != "object" || obj[i] == null) {
            document.write(i + " : " + obj[i] + "<br/>");
        } else {
            document.write(i + " : object" + "<br/>");
        }
    }
}

function changeS() {
    //修改一个键值，测试storage事件
    if (!storage.getItem("b")) {
        storage.setItem("b", 0);
    }
    storage.setItem('b', parseInt(storage.getItem('b')) + 1);
}

function showStorage() {
    //循环显示localStorage里的键值对
    for (var i = 0; i < storage.length; i++) {
        //key(i)获得相应的键，再用getItem()方法获得对应的值
        document.write(storage.key(i) + " : " + storage.getItem(storage.key(i)) + "<br>");
    }
}

/*function isIOS(){
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
      if(isiOS){
          $(".fixed-barV2").hide();
      }
}*/

function isIOS() {
    var u = navigator.userAgent;
    var isiOS = /JXSG.iOS/.test(u);
    if (isiOS) {
        $(".fixed-barV2").hide();
        $(".top-header").hide();
        $("#download-app").hide();
    }
}
function isAndroid(){
    var u = navigator.userAgent; 
    var isAndroid = /JXSG_Android/.test(u);
    if(isAndroid){
        $(".fixed-barV2").hide();
        $(".top-header").hide();
    }
}

function isCheckMobile(text){
    var reg = /^(13[0-9]|147|15[0-9]|18[0-9]|17[0-9])([0-9]{8})$/;
    return reg.test(text);
}

//汉字转换长度
function len(str)   
{  
    var realLength = 0;  
    for (var i = 0; i < str.length; i++)   
    {  
        charCode = str.charCodeAt(i);  
        if (charCode >= 0 && charCode <= 128)   
        realLength += 1;  
        else   
        realLength += 2;  
    }  
    return realLength;  
}

//检查支付宝账号
function checkPay(){
    var $input = $('#pay_name'),
        $input2 = $('#pay_account'),
        val = $.trim($input.val()),
        val2 = $.trim($input2.val());
    if (val.length == 0) {
    	msgBox('您没有输入支付宝姓名');
        return;    
    }else{
    	var reg = /^[\u4e00-\u9fa5 ]{2,5}$/;
        if((len(val) < 4 || len(val) > 10) && len(val) != 0){
        	msgBox('支付宝姓名范围在2-5个汉字！');
            return;
        }else if (!reg.test(val) && len(val) != 0) {
        	msgBox('请输入正确的支付宝姓名！');
            return;
        }
    }
    
    if (val2.length == 0) {
    	msgBox('您没有输入支付宝账号');
        return;
    }else{
        var reg_phone = /^1[\d]{10}$/;
        var reg_email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(!reg_phone.test(val2) && !reg_email.test(val2)){
        	msgBox('请输入正确的支付宝账号！');
            return;
        }
    }

    return true;
}

$(function(){
    $(".otherinfo .iconp").bind("touchstart", function(event) {
        $(".otherinfo").toggleClass('fadeInRight');
        event.stopPropagation();
    })
    $(".otherinfo .conmenu").bind("touchstart", function(event) {
        event.stopPropagation();
    })
    $(document).bind("touchstart", function() {
        $(".otherinfo").removeClass("fadeInRight");
    })
})

function showList(act) {
    $('.scrollNews').hide();
    activity(5);
    function activity(i) {
        $.ajax({
            type: "GET",
            url: "/activity/get_surplus_join_number",
            dataType: "JSON",
            success: function(data) {
                if (data.show == 0) {
                    $('.scrollNews').show();  
                    $('.act').hide();
                    return false;
                }
                if(act == 0){
                    $('.act-text').html(data.index);
                    $('.act').show();
                    $('.scrollNews').hide();
                }else if (act == 1) {
                    $('.act-jion').html(data.join);
                }
                i ++;
                i = i > 120 ? 5 : i;
                setTimeout(function(){activity(i);}, i * 1000);
            }
        });
    }
}