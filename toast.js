/**
 * @authors lxb (you@example.org)
 * @date    2017-06-05 17:44:22
 * @version $Id$
 */
;
(function($) {
  'use strict';
  $.toast = function(options) {
    //各种属性、参数
    var defaults = {
      title: '',
      showTime: 2000,
      width: "auto",
      height: "auto",
      position: "",
      backgroundColor: "rgba(0, 0, 0, .8)",
      textColor: "#fff",
      flag: true,
      lineheight: "1.3"
    };
    var opt = $.extend(defaults, options);
    if ($("#toast").length) {
      return;
    }
    if (opt.position == 'bottom') {
      opt.position = "bottom: 0;";
    } else if (opt.position == 'middle') {
      opt.position = "top: 50%;-webkit-transform: translate(0, -50%); transform: translate(0, -50%);";
    } else if (opt.position == 'top') {
      opt.position = "top: 0px;";
    } else if (opt.position === '') {
      opt.position = "top: 80%;";
    }
    if (opt.flag) {
      var content = "<div id='toast' style='position: fixed;display: none;z-index:999;font-size:.36rem; " + opt.position + ";left: 0;width:100%; height: " + opt.height + "; text-align: center'>";
    } else {
      var content = "<div id='toast' style='position: fixed; display: none;z-index:999; top: 0; left: 0;width:100%; height:100%; text-align: center'>";
    }
    content += '<div id="toast-content" style="display: inline-block; max-width:85%; width: ' + opt.width + ';min-height: ' + opt.height + ';padding:.24rem .4rem;background-color: ' + opt.backgroundColor + ';text-align: center;line-height: ' + opt.lineheight + ';border-radius: .1rem;color: ' + opt.textColor + ';">' + opt.title + '</div>';
    content += '</div>';
    $("body").append(content);
    $("#toast").fadeIn(500);
    setTimeout(function() {
      $("#toast").fadeOut(500,function(){
        $("#toast").remove();
      });
    }, opt.showTime);
  }
})(window.Zepto || window.jQuery);
