JsCore.PopMsg = {
    width: 300,
    height: 220,
    tips: "",       //简要信息
    url: "",        //通用地址
    closeFun: function () { },
    open: function () {
    	
    	var isshow=false;
    	if(!RootElement.document.getElementById("popMsg"))isshow=true;
        if (isshow) {
            /****popMsg*****/
            var popMsg = document.createElement("div");
            popMsg.id = "popMsg";
            popMsg.className = "popMsg";
            popMsg.style.width = this.width + "px";
            popMsg.style.height = this.height + "px";

            /****popTop*****/
            var popTop = document.createElement("div");
            popTop.className = "top";

            var closeBtn = document.createElement("span");
            closeBtn.id = "msgclose";
            closeBtn.className = "close";
            closeBtn.innerText = "关闭";
            closeBtn.onclick = function () {
                $("#popMsg").slideUp(1000,
                    function () {
                        JsCore.PopMsg.closeFun();

                        var p = document.getElementById("popMsg");
                        p.style.display = "none";
                        p.innerHTML = "";
                        document.body.removeChild(p);
                        p = null;
                    });
            }
            var popTitle = document.createElement("div");
            popTitle.innerHTML = "消息提示";
            popTitle.className = "title";

            var popClear = document.createElement("div");
            popClear.className = "clear";

            popTop.appendChild(closeBtn);
            popTop.appendChild(popTitle);
            popTop.appendChild(popClear);

            /****popContent*****/
            var popContent = document.createElement("div");
            popContent.className = "content";
            popContent.style.height = this.height - 35 + "px";//总体高度减去头部提示高度

            var popPadding = document.createElement("div");
            popPadding.className = "padding";
            popPadding.innerHTML = '<div class="list">' + this.tips + '</div>';

            var popBtn = document.createElement("div");
            popBtn.className = "btns";
            popBtn.innerHTML = '<div class="btn fr"><a href="' + this.url + '">更多 >></a></div><div class="clear"></div>';

            popContent.appendChild(popPadding);
            popContent.appendChild(popBtn);

            popMsg.appendChild(popTop);
            popMsg.appendChild(popContent);

            document.body.appendChild(popMsg);

            $("#popMsg").slideDown(1000);

            /*****清除缓存*****/
            closeBtn = null;
            popTitle = null;
            popClear = null;
            popTop = null;

            popContent = null;
            popPadding = null;
            popBtn = null;

            popMsg = null;

        }
    }
}

JsCore.PopMsg.Close=function(){
	if (document.getElementById("popMsg")) {
		$("#msgclose").click();
	}
}

function updateMsgStatus(msgid,url){
	$.ajax({
		url : '/member/online/base/updateMsgStatus.html',
		type : "post",
		data : {"msgid":msgid},
		dataType: 'json',
		async: false,
		success : function(d) {
			if(!containException(d)) {
				RootElement.errorMessage(d);
			} else {
				RootElement.window.open("/"+url);
			}
		},
		error: function(d) {
			RootElement.errorMessage(d);
		}
	});
}

$(function(){
	/*$.ajax({
		url : '/member/online/base/getMsgByMemberid.html',
		type : "post",
		data : {},
		dataType: 'json',
		async: false,
		success : function(d) {
			if(!containException(d)) {
				RootElement.errorMessage(d);
			} else {
				if(d.data.length>0){
					var str = "";
					$.each(d.data, function (n, value) {
			             str+="<div class='row'>"+value.ROWNUM+". <a href='"+value.LINKURL+"' target='_blank'>"+value.MSGCONTENT+"</a></div>"
			          });
					JsCore.PopMsg.tips = str;
		            JsCore.PopMsg.url = "javascript:void(0);location.href='http://www.baidu.com';";// JsCore.PopMsg.url="http://localhost"
		            JsCore.PopMsg.closeFun = function () {}
		            JsCore.PopMsg.open();
				}
			}
		},
		error: function(d) {
			RootElement.errorMessage(d);
		}
	});*/
	
	
	/*$.ajax({
		url : '/member/online/base/getOrgRedMsg.html',
		type : "post",
		data : {},
		dataType: 'json',
		async: false,
		success : function(d) {
			
			if(!containException(d)) {
				RootElement.errorMessage(d);
			} else {
				if(d.data.length>0){
					var str = "";
					$.each(d.data, function (n, value) {
			             str+="<div class='row'>"+value.ROWNUM+". <a onclick=\"updateMsgStatus('"+value.MSGID+"','"+value.LINKURL+"')\"  target='_blank'>"+value.MSGCONTENT+"</a></div>"
			          });
					RootElement.JsCore.PopMsg.tips = str;
					RootElement.JsCore.PopMsg.url = "javascript:void(0);location.href='http://sys.aysmzj.gov.cn/login.html';";// JsCore.PopMsg.url="http://localhost"
					RootElement.JsCore.PopMsg.closeFun = function () {}
					RootElement.JsCore.PopMsg.open();
				}
			}
		},
		error: function(d) {
			RootElement.errorMessage(d);
		}
	});
	 var test = window.setTimeout(function(){
		 	RootElement.JsCore.PopMsg.Close();
	    	window.clearTimeout(test);//去掉定时器
	    },10000);*/

})

