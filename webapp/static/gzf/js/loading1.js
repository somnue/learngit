/*
 * 
 * author :ren
 * time :2018/4/3
 * 
 * 
 ***/

// loading
function loading(type,text){	
	if(type){
		$("body").append(
				'<div class="loading">' +
					'<img class="loadingImg" src="/static/gzf/images/loading.gif" />' +
				'</div>'
				);
		$(".loading").css({"position": "absolute","top": "0px","left": "0px","right": "0px","bottom": "0px","textAlign":"center","background": "#333","opacity": "0.3"});
		$(".loadingImg").css({"marginTop":"300px"});
	}else{
		if($(".loading")){
			$(".loading").remove();
		}
	}
}