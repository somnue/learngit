
var JsCore = new Object();
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


var picIndex = 1;
var picCount = 6;
function prevPic(){
	picIndex = picIndex - 1;
	if(picIndex < 1) picIndex = picCount;
	openPic();
}

function nextPic(){
	picIndex = picIndex + 1;
	if(picIndex > picCount) picIndex = 1;
	openPic();
}

function openPic(){
	for(var i=1; i<=picCount; i++){
		if(i == picIndex){
		    JsCore.$$('pptDot' + i).className = 'cdot';
		    JsCore.$$('pptImage' + i).style.display = 'block';
		    JsCore.$$('pptTitle' + i).style.display = 'block';
		} else {
		    JsCore.$$('pptDot' + i).className = 'dot';
		    JsCore.$$('pptImage' + i).style.display = 'none';
		    JsCore.$$('pptTitle' + i).style.display = 'none';
		}
	}
}


var picIndex1 = 1;
var picCount1 = 2;
function prevPic1(){
	picIndex1 = picIndex1 - 1;
	if(picIndex1 < 1) picIndex1 = picCount1;
	openPic1();
	setTimeout("prevPic1()", 3000);
}

function nextPic1(){
	picIndex1 = picIndex1 + 1;
	if(picIndex1 > picCount1) picIndex1 = 1;
	openPic1();
	setTimeout("nextPic1()", 3000);
}

function openPic1(){
	for(var i=1; i<=picCount1; i++){
		if(i == picIndex1){
		    JsCore.$$('pptDot' + i).className = 'cdot';
		    JsCore.$$('pptImage' + i).style.display = 'block';
		    JsCore.$$('pptTitle' + i).style.display = 'block';
		} else {
		    JsCore.$$('pptDot' + i).className = 'dot';
		    JsCore.$$('pptImage' + i).style.display = 'none';
		    JsCore.$$('pptTitle' + i).style.display = 'none';
		}
	}
}