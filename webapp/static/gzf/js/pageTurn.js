	/**
	 * 分页
	 * Author : 王帅
	 * Version : 2012/12/21
	 */
$(document).ready(function(){
	//点击选择
	$("#page_control .page").click(function(){
		$("#page_control .page").removeClass("selected");
		$(this).addClass("selected");
		itproot.pages.pageTurnAble();
	});
	//pageNum为总共页数
	var pageNum = 9;
	//上一页、下一页
	itproot.pages.pageTurn = function (n){
		var id = $("#page_control .selected").attr("id");
		var num = parseInt(id.substr(id.length-1)) + n;
		if(num <= 0){
			alert("当前是第一页");
		}else if(num > pageNum){
			alert("当前是最后一页");
		}else{
			$(".page").removeClass("selected");
			$("#page" + num).addClass("selected");
		}
		itproot.pages.pageTurnAble();
	}
	//按钮可用性控制
	itproot.pages.pageTurnAble = function (){
		//var num = $(".page").length;
		if($("#page1").hasClass("selected")){				
			$("#previous").addClass("disable_p");
			$("#previous").attr("disabled","disabled");
		}else{
			$("#previous").removeClass("disable_p");
			$("#previous").removeAttr("disabled");
		}
		if($("#page" + pageNum).hasClass("selected")){
			$("#next").addClass("disable_p");
			$("#next").attr("disabled","disabled");
		}else{
			$("#next").removeClass("disable_p");
			$("#next").removeAttr("disabled");
		}
	}
});
