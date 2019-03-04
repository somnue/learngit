	$(document).ready(function(){
		/**
		 * 搜索下拉框
		 * Author : 王帅
		 * Version : 2012/12/21
		 */
		var val;
		var codes = ['100111','100112','100113','100121','100122','100123','100131'];
		var urls = ['template/textsel.html','template/table_list.html','template/main_form_3.html','template/main_form_4.html','template/main_form_5.html','template/main_form_6.html','template/main_form_ie7.html'];
		var labels = ['节点一一一','节点一一二','节点一一三','节点一2一','节点一2二','节点一2三','节点一3一'];
		$("#searchinput").focus(function(){
			val = $(this).val();
		});
		$("#searchinput").keyup(function(){
			if($(this).val().length == 0){
				$("#downBox a").remove();
				$("#downBox").hide();
				val = $(this).val();
			}else{
				if(val != $(this).val()){
					$("#downBox a").remove();
					$("#downBox").show();
					val = $(this).val();
					var flag = true;
					for(var i=0; i<codes.length; i++){
						if(codes[i].indexOf(val) >= 0){
							$("#downBox").append('<a href="javascript:void(0);" class="code">' + codes[i] + '</a>');
							flag = false;
						} 
					}
					if(flag){
						$("#downBox").hide();
					}
				}
			}
			$(".code").click(function(){
				$("#searchinput").val($(this).text());
				$("#downBox").hide();
				itproot.iframes.openIframe();
			});
		});
		$(".btnSearch").click(function(){
			String.prototype.trim=function(){return this.replace(/(^\s*)|(\s*$)/g,"");}
			if($("#searchinput").val().trim() == "" || ($("#searchinput").val() == "请输入交易码")){
				alert("交易码为空！");
				return false;
			}
			var code = $(".code");
			if(code.length == 0){
				alert("交易码不存在");
				return false;
			}else if(code.length == 1){
				$("#searchinput").val($(".code").text());
			}else if(code.length > 1){
				var val = $("#searchinput").val();
				if(codes.indexOf(val) == -1){
					alert("请输入完整交易码");
					return false;
				}
			}
			itproot.iframes.openIframe();
		});
		//打开iframe
		Array.prototype.index_of = function(n){   
			if("indexOf" in this){   
				return this["indexOf"](n);   
			}   
			for(var i=0;i<this.length;i++){   
				if(n===this[i]){   
					return i;   
				}   
			}   
			return -1;   
		}  
		itproot.iframes.openIframe = function (){
			var code = $("#searchinput").val();
			var index = codes.index_of(code);
			$("#mainFrame").attr("src",urls[index]);
			
		}

		$("#searchinput").blur(function(){
			if(!$("#downBox").is(":focus") && !$("#downBox a").is(":focus")){
				$("#downBox").hide();
			}
		});
		$("#downBox").blur(function(){
			if(!$("#searchinput").is(":focus")){
				$("#downBox").hide();
			}
		});
	});