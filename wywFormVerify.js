/*
 * @表单验证
 * creat  : 2013.04.23
 * Author ：王员外
 * Web    ：http://wangyuanwai.com
 *
 * */

$(function(){
	'use strict';

	//导出正则
	$.fromReg = {
		USPhone: function (val) {
			return /^\(?(\d{3})\)?[\- ]?\d{3}[\- ]?\d{4}$/.test(val);
		},

		// matches mm/dd/yyyy (requires leading 0's (which may be a bit silly, what do you think?)
		date: function (val) {
			return /^(?:0[1-9]|1[0-2])\/(?:0[1-9]|[12][0-9]|3[01])\/(?:\d{4})/.test(val);
		},

		email: function (val) {
			return /^(\w+\-?\w+|\w+)@\w+\.[a-z]{2,10}$/i.test(val);
		},

		remember: function (val) {
			return !! val ;
		},

		mobile: function (val) {
			return /^\s*0?1\d{10}\s*$/.test( val ) ;
		},
		username: function (val) {
			return /^[a-z\u4e00-\u9fa5][a-z\d\u4e00-\u9fa5]{4,100}$/i.test( val ) ;
		},
		password: function (val) {
			return /^.{6,50}$/.test( val ) ;
		},
		passwordPay: function (val) {
			return /^\d{6}$/.test( val ) ;
		},
		captcha: function (val) {
			return /^\d{6,8}$/.test( val ) ;
		},
		url: function (val) {
			return /^https?:\/\/\w+\.\w{2,}.*$/.test( val ) ;
		},
		//手机/电话
		mobileTel: function (val) {
			return /^1\d{10}$/.test( val ) || /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/.test( val ) ;
		},

		minLength: function (val, length) {
			return val.length >= length;
		},

		maxLength: function (val, length) {
			return val.length <= length;
		},

		equal: function (val1, val2) {
			return (val1 == val2);
		}
	};

	/*var config_demo = {
		fields: {
			'#mobile-input' : {
				required: true
				, message: '电话/手机号码格式错误'
				, test: _formVerify.reg.mobileTel
				, ok : function( opt ){

				}
				, unOk : function( e, opt ){

				}
				, init : function(){

				}
			}
		}
		, submitButton : 'button[type=submit]'
		, classes : {
			message : 'label label-danger' //显示错误信息
			, field : 'input-error' // 错误的 class
		}
		// submit 提交
		, ok : function(){
			post();
		}
	};*/

	//---- wywFormVerify 主函数

	$.fn.form = function wywFormVerify(config) {
		var defaults = {
				fields : { }
				, classes : {
					message : 'label label-danger' //显示错误信息
					, field : 'input-error' // 错误的 class
				}
				, unOk : noop()   //参数 config
				// submit 提交
				, ok : noop()   //参数 config
			}
			, fields = []
			, item
			, pauseMessages = false
		;

		config = $.extend( {}, defaults, config);

		for (item in config.fields) {
			processField(config.fields[item], item);
		}

//		$(config.submitButton || this).bind('mousedown', function(){
//			pauseMessages = true;
//			$(window).bind('mouseup', function(){
//				pauseMessages = false;
//			});
//		});

		this.bind('submit', function(){
			return post();
		});
		return this;


		/// 私有函数


		function post(){
			var errors = false;
			$.each( fields, function(i){

				if ( ! fields[i].testValid( true ) ) {
					errors = true;
					return false;
				}
			});




			if(errors) {
				config.unOk( config );
				return false;
			} else{
				//提交
				config.ok( config );
				return false;
			}
		}

		function processField( opt , selector) {
			var filedDef = {
					required	: true
					, message	: '' //提示信息
					, test		: noop() // 匹配函数
					, ok		: noop() //正确时执行函数
					, unOk		: noop() //错误时执行函数
					, init		: noop() //初始化
				}
				, opts = $.extend( {}, filedDef, opt)
				, field = $(selector)
				, error = {
					message	: opts.message
					, id	: selector.slice(1) + '_wyw-un-verify'
					, field : field
				}
				, errClass 	= config.classes && config.classes.field
				, errorEl = $(error.id).length > 0 ? $(error.id) : getError(error, config)
				, handleBlur = function() {
					if (!pauseMessages) {
						field.testValid();
					} else {
						$(window).bind('mouseup', field.testValid.bind(this));
					}
				}
			;

			//绑定到字段
			field._opts = opts ;

			//初始化，允许绑定各种事件
			opts.init( field, opts, config );

			fields.push(field);
			field.testValid = function testValid(submit) {
				var val
					, $this = $(this)
					, opts = this._opts || {} //$this.data('_opts')
					, errorFlag = false
					, required 			= !! $this.attr('required') || opts.required || '' // ？ 常常没有 opt
					, password			= (field.attr('type') === 'password')
					, arg 				= $.isFunction(opts.arg) ? opts.arg() : opts.arg

				;

				// clean it or trim it
				if ( $.isFunction(opts.clean)) {
					val = opts.clean( $this.val() );
				} else if (!password && typeof opts.trim === 'undefined' || opts.trim) {
					val = $.trim( $this.val() || '' );
				} else {
					val = $this.val();
				}

				// write it back to the field
				$this.val(val);

				if( required === true && val.length === 0) {
					errorFlag = true;
				} else if ( (val.length > 0 || required === 'sometimes') && $.isFunction(opts.test) ) {
					errorFlag = ! opts.test(val, arg);

				}


				if (errorFlag) {
					$this.addClass( errClass ).after(errorEl);
					//执行 无效函数
					if ( $.isFunction(opts.unOk) ){
						opts.unOk( this, opts );
						//更新
						//errorEl = $(error.id).length > 0 ? $(error.id) : getError(error, config);
					}
					config.unOk( config );
					return false;
				} else {
					removeError( $this, errorEl, opts, errClass );
					return true;
				}

			};
			field.bind(opts.when || config.when || 'blur', function(){
				setTimeout(function(){
					handleBlur();
				}, 1);
			});
			field.bind('focus', function(){
				removeError( $(this), errorEl, opts, errClass );
			});
		}


	};

	function defaultError(error, config) { //Default error template
		var msgErrorClass = config.classes && config.classes.message || 'wyw-verify-un-msg',
			msg = error.field.attr('data-wyw-error') || error.message || ''; //允许字段属性
		return $('<span id="' + error.id + '" class="' + msgErrorClass + '" role="alert">' + msg + '</span>');
	}
	function getError(error, config) { //Generate error html from either config or default
		if ( $.isFunction(config.errorTemplate)) {
			return config.errorTemplate(error);
		}
		return defaultError(error, config);
	}

	function removeError( $this, errorEl, opts, errClass ){
		var temp = errorEl.get(0);
		// this is for zepto
		if (temp.parentNode) {
			temp.parentNode.removeChild(temp);
		}
		$this.removeClass( errClass );
		//执行 无效函数
		if ( $.isFunction(opts.ok) ){
			opts.ok( opts );
		}
	}

	function noop(){
		return function(){ };
	}
});
