
var JsCore = new Object();
JsCore.RootPath="/";
//var ParentElement = parent.RootElement != undefined ? parent : window;
//var RootElement = ParentElement.RootElement != undefined ? ParentElement.RootElement : ParentElement;
var RootElement=(function (p,c){while(p!=c){c = p; p = p.parent;}return c })(window.parent,window);

JsCore.$$ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};

function goIndex(){
	location.href = '/Default.aspx';
}

function goAdminIndex() {
	location.href = '/Admin/Default.aspx';
}

var menuIndex = 1;
var menuCount = 7;
function mover(flag){
	for(var i=1; i<=menuCount; i++){
		if(i == flag){
		    JsCore.$$('menu' + i).className = 'fl omenu';
		    JsCore.$$('smenu' + i).style.display = 'block';
		} else {
		    JsCore.$$('menu' + i).className = 'fl menu';
		    JsCore.$$('smenu' + i).style.display = 'none';
		}
	}
}

function mout(flag){
    JsCore.$$('menu' + flag).className = 'fl menu';
    JsCore.$$('smenu' + flag).style.display = 'none';
}

function smover(src){
	src.className = 'csmenu';
}

function smout(src){
	src.className = 'smenu';
}




