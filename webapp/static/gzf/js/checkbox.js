/**
 * checkbox控制
 * Author : 王帅
 * Version : 2012/12/21
 */
	
itproot.checkboxs.controlCheck = function (obj,a){
	var check = obj.checked;
	$("." + a).each(function(){
		this.checked = check;
	});
}
itproot.checkboxs.invertCheck = function (a){
	$("." + a).each(function(){
		this.checked = !(this.checked);
	});
}
itproot.checkboxs.allCheck = function (a){
	$("." + a).each(function(){
		this.checked = true;
	});
}
itproot.checkboxs.removeCheck = function (a){
	$("." + a).each(function(){
		this.checked = false;
	});
}