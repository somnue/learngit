function errorMessage(type,text){
	if(type){
		$("body").append(
				'<div id="pop-fail" class="modal errorMessage" style="display:block">' +
				'<div class="modal-dialog">' +
				    '<div class="modal-content">' +
				        '<div class="modal-header header-color-blue">' +
				            '<button type="button" class="modal-close white" onclick="closeMessage()"></button>' +
				            '<h5>提示</h5>' +
				       	'</div>' +
				        '<div class="modal-body">' +
				            '<div class="modal-left">' +
				            	'<img src="/static/gzf/images/icon-alert.png" />' +
				            '</div>' +
				            '<div class="modal-right">' +
				            	'<h3>操作失败</h3>' +
				                '<p>' + text +'</p>' +
				            '</div>' +
				            '<div class="clear"></div>' +
				        '</div>' +
				        '<div class="modal-footer">' +
				            '<button class="button3" onclick="closeMessage()">关闭</button>' +
				        '</div><!--/.modal-footer-->' +
				    '</div><!--/.modal-content-->' +
				'</div><!--/.modal-dialog-->' +
				'</div><!--/.modal-->' 
				);		
	}else{
		if($(".errorMessage")){
			$(".errorMessage").remove();
		}
	}
};
function closeMessage(){
	errorMessage(false);
}

function errorMessage2(type,text){
	if(type){
		$("body").append(
				'<div id="pop-fail" class="modal errorMessage" style="display:block">' +
				'<div class="modal-dialog">' +
				    '<div class="modal-content">' +
				        '<div class="modal-header header-color-blue">' +
				            '<button type="button" class="modal-close white" onclick="closeMessage()"></button>' +
				            '<h5>提示</h5>' +
				       	'</div>' +
				        '<div class="modal-body">' +
				            '<div class="modal-left">' +
				            	'<img src="/static/gzf/images/icon-alert.png" />' +
				            '</div>' +
				            '<div class="modal-right">' +
				            	'<h3>操作成功</h3>' +
				                '<p>' + text +'</p>' +
				                '<!--<button class="button3" onclick="failclose()">关闭</button>-->' +
				            '</div>' +
				            '<div class="clear"></div>' +
				        '</div>' +
				        '<div class="modal-footer">' +
				            '<button class="button3" onclick="closeMessage()">关闭</button>' +
				        '</div><!--/.modal-footer-->' +
				    '</div><!--/.modal-content-->' +
				'</div><!--/.modal-dialog-->' +
				'</div><!--/.modal-->' 
				);		
	}else{
		if($(".errorMessage")){
			$(".errorMessage").remove();
		}
	}
};

var callbacks,params;
function isConfirm(cftitle,callback,jsonData){
	callbacks = callback
	   params = jsonData
	$("body").append(
			'<div id="pop-fail" class="modal errorMessage" style="display:block">' +
			'<div class="modal-dialog">' +
			    '<div class="modal-content">' +
			        '<div class="modal-header header-color-blue">' +
			            '<button type="button" class="modal-close white" onclick="closeMessage()"></button>' +
			            '<h5>提示</h5>' +
			       	'</div>' +
			        '<div class="modal-body">' +
			            '<div class="modal-left">' +
			            	'<img src="/static/gzf/images/icon-alert.png" />' +
			            '</div>' +
			            '<div class="modal-right">' +
			            	'<h3>'+cftitle+'</h3>' +
			                '<p></p>' +
			                '<!--<button class="button3" onclick="removeDom()">关闭</button>-->' +
			            '</div>' +
			            '<div class="clear"></div>' +
			        '</div>' +
			        '<div class="modal-footer">' +
			            '<button class="button3" onclick="sure()" >确定</button>' +
			            '<button class="button3" onclick="removeDom()">取消</button>' +
			        '</div><!--/.modal-footer-->' +
			    '</div><!--/.modal-content-->' +
			'</div><!--/.modal-dialog-->' +
			'</div><!--/.modal-->' 
			);		
}
function sure(){
	$(".errorMessage").remove();
	callbacks(params)
}
function removeDom(){
	$(".errorMessage").remove();
	
}






