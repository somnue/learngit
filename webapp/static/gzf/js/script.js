/**
 * Author : 王帅
 * Version : 2012/12/21
 */


/*** 左侧菜单树展开关闭 ***/
$(document).ready(function(){
	$("#switchbtn").click(function(){
		$(this).toggleClass("down");
		$(this).toggleClass("up");
		$("#left").toggle();
	});
});

/*** 通知公告 ***/
$(document).ready(function(){
	$("#tongzhi_close").click(function(){
		$(this).toggleClass("downn");
		$(this).toggleClass("upp");
		$("#tongzhi_content").toggle();
		var h = $("#menu_tree").attr("height");
		var h1 = parseInt(h) - 60;
		var h2 = parseInt(h) + 60;
		if($("#tongzhi_content").is(":visible")){
			$("#menu_tree").attr("height",h1);
		}else{
			$("#menu_tree").attr("height",h2);
		}

	});
});

/*** 客户资料展开关闭 ***/
$(document).ready(function(){
	$("#switchbtn3").click(function(){
		$(this).toggleClass("down");
		$(this).toggleClass("up");
		$("#right_bottom").toggle();
		var h = $("#tabs").attr("height");
		var h1 = parseInt(h) - 110;
		var h2 = parseInt(h) + 110;
		if($("#right_bottom").is(":visible")){
			$("#tabs").attr("height",h1);
		}else{
			$("#tabs").attr("height",h2);
		}

	});
});

/*** 菜单树和客户资料tabs交替 ***/
itproot.tabs.setTab = function (name,cursel,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("con_"+name+"_"+i);
  menu.className=i==cursel?"hover":"";
  con.style.display=i==cursel?"block":"none";
 }
}

