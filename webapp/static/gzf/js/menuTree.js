
/**
 * 三级菜单树
 * Author : 王帅
 * 2013/01/15
 */
function MenuImageOnClickEvent(obj,a,clazz,b){
			var parentobj = $(obj).parent();
			if(clazz == "subItem"){
				$(obj).siblings(".subItem").removeClass("subItemOpen");
				$(obj).addClass("subItemOpen"); 
			}else{
			    //没有打开的
				if(!$(obj).hasClass("subFolderOpen")){ 
					$(obj).siblings(".sub").slideUp(300);
					$(obj).siblings("div").removeClass("subFolderOpen");
					$(obj).next(".sub").slideDown(300);
					if(clazz!='topFolder'){
					    $(obj).addClass("subFolderOpen");
					} 
				}else{ 
				    
				    $(obj).removeClass("subFolderOpen");
					$(obj).next(".sub").slideUp(300); 
				}
			}
		}
		$(document).ready(function(){
			$("#aMenu a").mouseover(function(){
				if(!$(this).parent().hasClass("open")){
					$(this).stop();
					$(this).fadeTo("fast",0.1);
					$(this).addClass("over");
					$(this).fadeTo("fast",1);
				}
			});
			$("#aMenu a").mouseout(function(){
				$(this).removeClass("over");
			});
			$("#aMenu a").each(function(){
				var text = $(this).text();
				if(text.length > 12){
					$(this).text(text.substring(0, 12) + '...');
				}
			});
		});
		
		
		
		//初始化状态
		$(document).ready(function(){
			//console.log(window.location.hash.split("#")[1])
			$("#menu_main a").each(function(){
				if($(this).attr('href') && $(this).attr('href') == window.location.pathname || $(this).attr('href') && $(this).attr('href') == window.location.hash.split("#")[1]){
					 $(this).parent().parent().css({'display':'block'})
					 $(this).css({'color':'#ff6600'})
				}				
			})
		})
