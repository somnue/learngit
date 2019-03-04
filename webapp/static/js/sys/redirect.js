function openMessage(_config) {
	var layer = RootElement.JsCore.FrameLayer('Infomation');
	layer.TipMode = true;
	var tipFlag = _config.tipflag;
	var title = _config.tiptitle;
	var text = _config.tiptext;
	var IsReLoad = _config.isreload;
	if(_config.istran!=undefined&&_config.istran==false){
		layer.IsTran=_config.istran;
	}
	if(!tipFlag) tipFlag = 1;
	if(!text) text = "";
	if(title == undefined) {
		if(tipFlag == 1) {
			title = "提示：您的操作已经完成！";
		} else if (tipFlag == 0) {
			title = "提示信息：";
		} else {
			title = "提示：您的操作失败！";
		}
	}
	layer.TipFlag = tipFlag;
	layer.TipTitle = title;
	layer.TipText = text;
	layer.IsReLoad = IsReLoad;
	layer.CloseFun = function (){
		_config.jsfun();
	}
	layer.open();
	layer = null;
}

function openLayer(_config) {
	var layer = RootElement.JsCore.FrameLayer(_config.layerid);
	var w = _config.width;
	var h = _config.height;
	var close = _config.close;
	var scroll = _config.scroll;

	if(!close) close = false;
	if(!scroll) scroll = "auto";
	if(!w) w = 1024;
	if(!h) h = 550;
	//if (typeof(eval("_config.jsfun()")) == "function") {
		layer.CloseFun = function (){
			_config.jsfun();
		}
	//}

	layer.TipMode = false;
	layer.ShowClose = close;
	layer.Scrolling = scroll;
	layer.LayerUrl = _config.url;
	layer.Width = w;
	layer.Height = h;
	layer.open();
	layer = null;
}

function toUrl(url) {
	RootElement.location.href= url;
}

function toLayerUrl(_config) {
	var win = RootElement.JsCore.$Layer(_config.layerid);
	win.location.href= _config.url;
}

function openMessageToUrl(_config) {
	var layer = RootElement.JsCore.FrameLayer('Infomation');
	layer.TipMode = true;
	var tipFlag = _config.tipflag;
	var title = _config.tiptitle;
	var text = _config.tiptext;
	if(!tipFlag) tipFlag = 1;
	if(_config.istran!=undefined){layer.IsTran=_config.istran;}
	if(!text) text = "";
	if(title == undefined) {
		if(tipFlag == 1) {
			title = "提示：您的操作已经完成！";
		} else if (tipFlag == 0) {
			title = "提示信息：";
		} else {
			title = "提示：您的操作失败！";
		}
	}
	layer.TipFlag = tipFlag;
	layer.TipTitle = title;
	layer.TipText = text;
	layer.CloseFun = function (){
		if(_config.jsfun) {
			_config.jsfun();
		}
		RootElement.location.href=_config.url;
	}
	layer.open();
	layer = null;
}

function closeLayer(layerid) {
	RootElement.JsCore.FrameLayerClose(layerid);
}

function containException(obj) {
	var e = (obj.error_Msg == undefined);
	if(e){
		e = (obj.errstr == undefined);
	}
	return e;
}

function errorMessage(msg) {
	var error = "";
	if(!msg) {
		msg.error_Msg;
		if (!error) {
			error = msg.errstr;
			if (!error) {
				error = "提交数据发生异常！";
			}
		}
		var _config = {
				tipflag : -1,
				tiptext : error
		}
		RootElement.openMessage(_config);
	}
}

(function($){
    $.fn.serializeJson = function(){
        var jsonData1 = {};
        var serializeArray = this.serializeArray();
        $(serializeArray).each(function () {
            if (jsonData1[this.name]) {
                if ($.isArray(jsonData1[this.name])) {
                    jsonData1[this.name].push(this.value);
                } else {
                    jsonData1[this.name] = [jsonData1[this.name], this.value];
                }
            } else {
                jsonData1[this.name] = this.value;
            }
        });
        var vCount = 0;
        for(var item in jsonData1){
            var tmp = $.isArray(jsonData1[item]) ? jsonData1[item].length : 1;
            vCount = (tmp > vCount) ? tmp : vCount;
        }

        if(vCount > 1) {
            var jsonData2 = new Array();
            for(var i = 0; i < vCount; i++){
                var jsonObj = {};
                for(var item in jsonData1) {
                    jsonObj[item] = jsonData1[item][i];
                }
                jsonData2.push(jsonObj);
            }
            return JSON.stringify(jsonData2);
        }else{
            return "[" + JSON.stringify(jsonData1) + "]";
        }
    };
})(jQuery);