var massCfg = {
    tap: "tap",
    click: "click",
    hideClass: "fn-hide",
    weiboAppKey: ""
};

! function(e) {

    var t = document;
    e.getScript = function(e, a) {
        var i = t.createElement("script");
        i.src = e, i.async = "async", a && (i.onload = a), t.getElementsByTagName("head")[0].appendChild(i)
    }
    var a = {};
    var i = navigator.userAgent;
    e.os = {
        iphone: -1 !== i.indexOf("iPhone"),
        android: -1 !== i.indexOf("Android")
    },
        e.browser = {
            uc: -1 !== i.indexOf("UCBrowser"),
            qq: -1 !== i.indexOf("MQQBrowser/")
        },
        e.getVersion = function(e) {
            var t = e.split("."),
                a = parseFloat(t[0] + "." + t[1]);
            return a
        };

}(Zepto),
    function(e, t) {
        "use strict";
        function a() {
            var t = '[data-role="share"]';
            function isWeiXin() {
                var ua = window.navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    return true;
                } else {
                    return false;
                }
            }
            e(document).on(d, t, function(t) {
                // function weixin() {
                //     var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
                //     if (ua.match(/MicroMessenger/i) == "micromessenger") {
                //         return true
                //     }
                // }
                //
                // if (weixin()) {
                //     var weih = '<div style="display: none; position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.7);display: none;z-index: 20000;" id="mcover"><img style="position: fixed;right: 18px;top: 5px;width: 260px!important;height: 180px!important;z-index: 20001" src="http://images.jxsg.com/m/guide.png"></div>';
                //     $("body").append(weih);
                //     $("#mcover").show();
                // }
                if (t.preventDefault(), u = e(this), h = {
                        url: u.data("share-url") || document.location.href,
                        title: u.data("share-title") || document.title,
                        pics: u.data("share-img"),
                        summary: u.data("share-description")
                    }, o) "undefined" != typeof browser ? window.browser.app.share({
                        url: h.url,
                        title: h.title,
                        description: h.summary,
                        img_url: h.pics
                    }) : "undefined" != typeof window.qb && window.qb.share({
                        url: h.url,
                        title: h.title,
                        description: h.summary,
                        img_url: h.pics
                    });
                else if (r) e.os.android ? window.ucweb.startRequest("shell.page_share", [h.title, h.summary, h.url, "", "", h.title, ""]) : e.os.iphone && window.ucbrowser.web_share(h.title, h.summary, h.url, "", "", "", "");
                // else if (isWeiXin()) {
                //     var weih = '<div style="display: none; position: fixed;top: 0;left: 0;width: 100%;height: 100%;background: rgba(0, 0, 0, 0.7);display: none;z-index: 20000;" id="mcover"><img style="position: fixed;right: 18px;top: 5px;width: 260px!important;height: 180px!important;z-index: 20001" src="http://images.jxsg.com/m/guide.png"></div>';
                //     e("body").append(weih);
                //     e("#mcover").show();
                // }
                 else {
                    if (p) return void e(".j-share").removeClass("fn-hide");
                    var a = '<section class="w-sharing j-share"><div class="module"><ul class="method">' +
                        // '<li><a href="#" class="share-wechat-circle" data-share="weixin"><i class="icon-sharing icon-sharing-wechat-circle"></i><strong>微信</strong></a></li>'+
                        // '<li><a href="#" class="share-wechat-friend" data-share="timeline"><i class="icon-sharing icon-sharing-"></i><strong>朋友圈</strong></a></li>'+
                        '<li><a href="#" class="share-sqq"><i class="icon-sharing icon-sharing-qq-friend"></i><strong>QQ</strong></a></li>'+
                        //'<li><a href="#" class="share-weibo"><i class="icon-sharing icon-sharing-weibo"></i><strong>\u65b0\u6d6a\u5fae\u535a</strong></a></li>'+
                        '<li><a href="#" class="share-qzone"><i class="icon-sharing icon-sharing-qq-zone"></i><strong>QQ\u7a7a\u95f4</strong></a></li>'+
                        '</ul><div class="cancel">\u53d6\u6d88</div></div><div class="mask"></div></section>';
                    e("body").append(a), e("body").on("touchmove.share", function(e) {
                        e.preventDefault()
                    }, !1), p = !0
                }
            })
        }

        function i(t, a, i) {
            var s = t.data("share-action"),
                n = t.data("share-count");
            e(".number", t).html(++n), s && e.ajax({
                dataType: "jsonp",
                url: s + "&datatype=jsonp&target=" + a,
                timeout: 1e3,
                success: function() {
                    i && i()
                },
                error: function() {
                    i && i()
                }
            })
        }

        function s() {
            if (l.qq = o ? e.getVersion(navigator.appVersion.split("MQQBrowser/")[1]) : 0, l.uc = r ? e.getVersion(navigator.appVersion.split("UCBrowser/")[1]) : 0, o) {
                var t = l.qq < 5.4 ? n.lower : n.higher;
                e.getScript(t, function() {
                    a()
                })
            } else a()
        }
        var n = {
                lower: "http://3gimg.qq.com/html5/js/qb.js",
                higher: "http://jsapi.qq.com/get?api=app.share"
            },
            o = e.browser.qq,
            r = e.browser.uc,
            c = t.weiboAppKey,
            l = {
                uc: "",
                qq: ""
            },
            d = t.tap,
            u = null,
            h = {},
            p = !1;
        // e(document).on(d, ".mask", function(t) {
        //     t.preventDefault();
        //     e("body").off("touchmove.share");
        //     $(".j-share").addClass("fn-hide");
        // }),
            e(document).on(d, ".j-share .share-weibo", function(e) {
                e.preventDefault();
                var e = "http://service.weibo.com/share/mobile.php?";
                e += "appkey=" + c, e += "&title=" + encodeURIComponent(h.title), e += "&url=" + encodeURIComponent(h.url), e += "&pic=" + encodeURIComponent(h.pics), location.href = e
            }),
            e(document).on(d, ".j-share .share-qzone", function(t) {
                t.preventDefault();
                var t = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?";
                location.href = t + e.param(h)
            }),
            e(document).on(d, ".j-share .share-sqq", function(t) {
                t.preventDefault();
                var t = 'http://connect.qq.com/widget/shareqq/index.html?';
                location.href = t + e.param(h)
            }),
            e(document).on(d, ".j-share .cancel", function(t) {

                t.preventDefault();
                e("body").off("touchmove.share"), e(this).closest(".j-share").addClass("fn-hide")
            }), s()
    }(Zepto, massCfg);