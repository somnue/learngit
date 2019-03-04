var PopMsg = {
    width: 200,
    height: 160,
    tips: "",       //简要信息
    url: "",        //通用地址
    chatid:"",
    closeFun: function () { },
    open: function () {

    	var isshow=false;
    	if(!RootElement.document.getElementById("pMsg"))isshow=true;
        if (isshow) {
            /****popMsg*****/
            var popMsg = document.createElement("div");
            popMsg.id = "pMsg";
            popMsg.className = "popMsg";
            popMsg.style.width = this.width + "px";
            popMsg.style.height = this.height + "px";

            /****popTop*****/
            var popTop = document.createElement("div");
            popTop.className = "top";

            var closeBtn = document.createElement("span");
            closeBtn.id = "pmsgclose";
            closeBtn.className = "close";
            closeBtn.innerText = "关闭";
            closeBtn.onclick = function () {

	            PopMsg.closeFun();

	            var p = document.getElementById("pMsg");
	            p.style.display = "none";
	            p.innerHTML = "";
	            document.body.removeChild(p);
	            p = null;

            }
            var popTitle = document.createElement("div");
            popTitle.innerHTML = "咨询消息";
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
            popBtn.innerHTML = '<div class="btn fr"><a href="' + this.url + '">查看 >></a></div><div class="clear"></div>';
            popBtn.onclick = function () {
            	temIds=temIds.replace("'"+PopMsg.chatid+"'","");
            	temIds=temIds.replace("/,,/",",").replace(/,$/gi,"").replace(/^,/gi,"");
	            var p = document.getElementById("pMsg");
	            p.style.display = "none";
	            p.innerHTML = "";
	            document.body.removeChild(p);
	            p = null;

            }

            popContent.appendChild(popPadding);
            popContent.appendChild(popBtn);

            popMsg.appendChild(popTop);
            popMsg.appendChild(popContent);

            document.body.appendChild(popMsg);

            document.getElementById("pMsg").style.display="block";

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

PopMsg.Close=function(){
	if (document.getElementById("pMsg")) {
		document.getElementById("pmsgclose").click();
	}
}



var newMessageRemind = function () {
 var i = 0,
  title = document.title,
  loop;
 return {
  show: function () {
   loop = setInterval(function () {
    i++;
    if ( i == 1 ) document.title = '【新消息】' + title;
    if ( i == 2 ) document.title = '【　　　】' + title;
    if ( i == 3 ) i = 0;
   }, 300);
  },
  stop: function () {
   clearInterval(loop);
   document.title = title;
  }
 };
} ();

var temIds="";
var xmlhttp;
window.onload=function(){
	//1.创建XMLHTTPRequest对象
	//最复杂的一步
	if (window.XMLHttpRequest)
	{
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp=new XMLHttpRequest();
		//针对某些特定版本的mozillar浏览器的bug进行修正。
		if (xmlhttp.overrideMimeType) {
			xmlhttp.overrideMimeType('text/xml');
		}
	}
	else
	{// code for IE6, IE5
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	setInterval(function(){
		getChatMsg((getCookie("chatIds").replace(/,$/gi,"")+","+temIds).replace(/,$/gi,"").replace(/^,/gi,""));
	},3000);
}

function getChatMsg(ids){
	//注册回调函数
	xmlhttp.onreadystatechange = callback;
	//3.设置连接信息。
	//open第一个参数链接方式，第二是url地址
	//3，true是异步链接
	//xmlhttp.open("GET","xhr.php?name=" + username,true);
	//使用post方式发送数据
	xmlhttp.open("POST","/getchatmsg.html",false);
	//post需要自己设置http的请求头
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	//4，发送数据，开始和服务器进行交互
	//中如果true, send这句话会立即执行
	//如果是false（同步），send会在服务器数据回来才执行
	//xmlhttp.send(null);
	//因为是get所以send中不需要内容
	xmlhttp.send('ids=' +ids);
}

//5.写回调函数,不同相应状态进行处理
function callback(){
	//判断对象状态是交互完成，接收服务器返回的数据
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
		var json = eval("("+xmlhttp.responseText+")");
		var ids = (getCookie("chatIds").replace(/,$/gi,"")+","+temIds).replace(/,$/gi,"");
		if(json.chatid!=null && (ids.indexOf(","+json.chatid)<0 || ids.indexOf(","+json.chatid+",")<0 || ids.indexOf(json.chatid+",")<0)){
			temIds+="'"+json.chatid+"',";
			PopMsg.tips="有人向您询问办事项问题，请您点击查看!";
			PopMsg.chatid=json.chatid;
			PopMsg.url="javascript:newMessageRemind.stop();window.open('http://oa.aysmzj.gov.cn/chat/user.html?chatid="+json.chatid+"')";
			PopMsg.closeFun=function(){
				newMessageRemind.stop();
				var chatIds=getCookie("chatIds");
				chatIds+="'"+json.chatid+"',";
				setCookie("chatIds",chatIds);
			}
			PopMsg.open();
			newMessageRemind.show();
		}
	}
}


function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())+";path=/;domain=aysmzj.gov.cn";
}

function getCookie(c_name)
{
	if (document.cookie.length>0)
	  {
	  c_start=document.cookie.indexOf(c_name + "=")
	  if (c_start!=-1)
	    {
	    c_start=c_start + c_name.length+1
	    c_end=document.cookie.indexOf(";",c_start)
	    if (c_end==-1) c_end=document.cookie.length
	    return unescape(document.cookie.substring(c_start,c_end))
	    }
	  }
	return ""
}

