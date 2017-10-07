/**
 *
 * @authors lxb (you@example.org)
 * @date    2017-06-05 17:44:22
 * @version $Id$
 *
 *
 */
;
(function($) {
  'use strict';
  $.fn.countDown = function(options) {
    //各种属性、参数
    var defaults = {
      attrs: "data-end-time",
      day: ":", // : 天
      hour: ":", // : 时
      min: ":", // : 分
      second: "", // : 秒
      timeEndword: "开抢中",
      isday: false,
			isMs: false,
      timeEndBack: function(obj) {}
    }
    var opt = $.extend(defaults, options);
    this.each(function() {
      var _this = $(this);
      _this.timer = null;
			_this.timerMs = null;
      var flag = false;
      var counTime = _this.attr(opt.attrs);
      _this.timer = setInterval(CountDown, 1000);
      if(opt.isMs){
        setTimeout(function(){
          _this.timerMs = setInterval(ms, 1);
        },1000)
      }
      if (counTime <= 0) {
        opt.timeEndBack.call(this, _this);
				clearInterval(_this.timerMs);
				$(".msTime").html(0);
      }
      function CountDown() {
        counTime--;
        if (counTime <= -1) {
          clearInterval(_this.timer);
        } else {
          timeLess(_this, counTime);
        }
        if(counTime <= 0){
          clearInterval(_this.timerMs);
          _this.parent().find(".msTime").html(0);
        }
      }
			var max = 9;
			function ms(){
				max--;
				if(max == 0){
					max =9;
				}
				_this.parent().find(".msTime").html(max);
			}
      function timeLess(obj, second_time) {
        second = parseInt(second_time);

        var time = parseInt(second_time) + "秒"; // 总的秒数
        var t = "";
        if (second < 10 && second > 0) {
          second = "0" + second;
        }
        if (parseInt(second_time) > 60) {
					var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
          var second = parseInt(second_time) % 60;
          var min = parseInt(second_time / 60);
          var hour = 0;
					if (day < 10) {
            day = "0" + hour;
          }
          if (hour < 10) {
            hour = "0" + hour;
          }
          if (min < 10) {
            min = "0" + min;
          }
          if (second < 10) {
            second = "0" + second;
          }
          t = '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
					if(opt.isday){
						t = '<span class="RemainD"><i>' + day + '</i></span>' + opt.day + '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
					}
					if (min > 60) {
            min = parseInt(second_time / 60) % 60;

            hour = parseInt(parseInt(second_time / 60) / 60);

            if (hour < 10) {
              hour = "0" + hour;
            }
            if (min < 10) {
              min = "0" + min;
            }
            t = '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
						if(opt.isday){
							t = '<span class="RemainD"><i>' + day + '</i></span>' + opt.day + '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
						}
						// 大于一天
            if (hour > 24) {
              hour = parseInt(parseInt(second_time / 60) / 60) % 24;
              var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24);
              if (hour < 10) {
                hour = "0" + hour;
              }
              if (day < 10) {
                day = "0" + day;
              }
              t = '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
							if(opt.isday){
								t = '<span class="RemainD"><i>' + day + '</i></span>' + opt.day + '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
							}
						}
          }

          if (hour == "00" && opt.isday == false) {
            t = '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
          }


        } else {
          //最后60秒
          if (second_time === 0 && opt.timeEndword!= 1) {
            t = opt.timeEndword;
            flag = true;
          } else {
						day = "00";
            hour = "00";
            min = "00";
						if(second == "0"){
							second = "00";
              flag = true;
						}
            t = '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
            if (hour == "00" && opt.isday == false) {
              t = '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
            }
						if(opt.isday){
							t = '<span class="RemainD"><i>' + day + '</i></span>' + opt.day + '<span class="RemainH"><i>' + hour + '</i></span>' + opt.hour + '<span class="RemainM"><i>' + min + '</i></span>' + opt.min + '<span class="RemainS"><i>' + second + '</i></span>' + opt.second + '';
						}
          }
        }
        $(obj).html(t);
        if (flag) {
          opt.timeEndBack.call(this, _this);
        }
      }
    })
  }
})(window.Zepto || window.jQuery);

// if(Zepto(".countItems").length){
//     Zepto(".countItems").countDown({
//         hour: ":", // : 时
//         min: ":",  // : 分
//         second: " ", // : 秒,
//         timeEndword: '0',
//         timeEndBack:function(obj){
//             //结束后回调
//             Zepto(obj).parent().siblings('.goPay').attr("href","javascript:;").addClass('btn-default');
//         }
//     })
// }
