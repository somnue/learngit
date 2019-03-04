//分页插件
/**
2014-08-05 ch
**/
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
				return (function(){
					obj.empty();
					//上一页
					if(args.current > 1){
						obj.append('<a href="javascript:;" id="firstPage" class="button8">首页</a>');
						obj.append('<a href="javascript:;" id="prevPage" class="button8">上一页</a>');
					}else{
						obj.remove('#firstPage');
						obj.remove('#prevPage');
						obj.append('<a href="javascript:;" class="button8">首页</a>');
						obj.append('<a href="javascript:;" class="button8">上一页</a>');
					}
					//中间页码
					if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
						obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
					}
					if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
						obj.append('<span>...</span>');
					}
					var start = args.current -2,end = args.current+2;
					if((start > 1 && args.current < 4)||args.current == 1){
						end++;
					}
					if(args.current > args.pageCount-4 && args.current >= args.pageCount){
						start--;
					}
					for (;start <= end; start++) {
						if(start <= args.pageCount && start >= 1){
							if(start != args.current){
								obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
							}else{
								obj.append('<a href="javascript:;" class="curr">'+ start +'</a>');
							}
						}
					}
					if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
						obj.append('<span>...</span>');
					}
					if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
						obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
					}
					//下一页
					if(args.current < args.pageCount){
						obj.append('<a href="javascript:;" id="nextPage" class="button8">下一页</a>');
						obj.append('<a href="javascript:;" id="endPage" class="button8">末页</a>');
						obj.append('<input value=\"'+args.current+'\" class="text1" style=\"text-align:center;width:30px;margin-right:10px;\" type=\"text\" id=\"topageNum\" />');
						obj.append('<a href="javascript:;" id=\"toPageBtn\" class="button8">确定</a><span style=\"margin-left:20px;\">');
						obj.append('共'+(args.totalCount == undefined ? 0 : args.totalCount)+'条</span>');
					}else{
						obj.remove('#nextPage');
						obj.remove('#endPage');
						obj.append('<a href="javascript:;" class="button8">下一页</a>');
						obj.append('<a href="javascript:;" class="button8">末页</a>');
						obj.append('<input value=\"'+args.current+'\" class="text1" style=\"text-align:center;width:30px;margin-right:10px;\" type=\"text\" id=\"topageNum\" />');
						obj.append('<a href="javascript:;" id=\"toPageBtn\" class="button8">确定</a><span style=\"margin-left:20px;\">');
						obj.append('共'+(args.totalCount == undefined ? 0 : args.totalCount)+'条</span>');
					}
			}
			)();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.on("click","a.tcdNumber",function(){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current);
					}
				});
				//首页
				obj.on("click","a#firstPage",function(){
					var current = parseInt(obj.children("a.curr").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(1);
					}
				});
				//上一页
				obj.on("click","a#prevPage",function(){
					var current = parseInt(obj.children("a.curr").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current-1);
					}
				});
				//下一页
				obj.on("click","a#nextPage",function(){
					var current = parseInt(obj.children("a.curr").text());
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(current+1);
					}
				});
				//末页
				obj.on("click","a#endPage",function(){
					var current = parseInt(obj.children("a.curr").text());
					ms.fillHtml(obj,{"current":args.pageCount,"pageCount":args.pageCount});
					if(typeof(args.backFn)=="function"){
						args.backFn(args.pageCount);
					}
				});
				//跳转
				obj.on("click","a#toPageBtn",function(){
					var topageNum = $.trim($("#topageNum").val());
					if(isPositiveNum(topageNum)) {
						if(topageNum <= args.pageCount) {
							$("#myPageNum").val(topageNum);
							$("#myPageForm").submit();
						}
					}
				});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
})(jQuery);

function isPositiveNum(s){//是否为正整数
	var re = /^[0-9]*[1-9][0-9]*$/ ;
	return re.test(s)
}