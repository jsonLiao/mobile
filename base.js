//ios10.1版本bug
window.onload=function () {
    document.addEventListener('touchstart',function (event) {
        if(event.touches.length>1){
            event.preventDefault();
        }
    });
    var lastTouchEnd=0;
    document.addEventListener('touchend',function (event) {
        var now=(new Date()).getTime();
        if(now-lastTouchEnd<=300){
            event.preventDefault();
        }
        lastTouchEnd=now;
    },false);
}
$(function(){
    window.base = {};
    base.init = function() {
        var _this = this;
        _this.topMore();
        _this.UA();
    };
    base.topMore =function () {
        $("#topSubmenu").on("click", function(event) {
            $(".conmenus").toggleClass('fadeInRight');
            event.stopPropagation();
        })
        $(".conmenus .conmenu").on("click", function(event) {
            event.stopPropagation();
        })
        $(document).on("click", function() {
            $(".conmenus").removeClass("fadeInRight");
        })
    }
   base.UA  = function () {
       function isIOS() {
           var u = navigator.userAgent;
           var isiOS = /JXSG.iOS/.test(u);
           if (isiOS) {
               UAHide();
           }
       }
       function isAndroid(){
           var u = navigator.userAgent;
           var isAndroid = /JXSG_Android/.test(u);
           if(isAndroid){
               UAHide();
           }
       }
       function UAHide() {
            $('#nav').hide();
            $('.z-bar').hide();
       }
       isIOS();
       isAndroid();
    }

    base.init();
})
