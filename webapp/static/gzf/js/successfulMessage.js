function successfulMessage(type,text){
	if(type){
		$("body").append(
				'<div id="pop-success" class="modal successfulMessage"  style="display:block">' +
				'<div class="modal-dialog">' +
				    '<div class="modal-content">' +
				        '<div class="modal-header header-color-blue">' +
				            '<button type="button" class="modal-close white" onclick="closeSuccessMessage()">&times;</button>' +
				            '<h5>提示</h5>' +
				        '</div>' +
				        '<div class="modal-body">' +
				            '<div class="modal-left">' +
				            	'<img src="/static/gzf/images/icon-ok.png" />' +
				            '</div>' +
				            '<div class="modal-right">' +
				            	'<h3>操作成功</h3>' +
				            	'<p>' + text + '</p>' +
				                '<!--<button class="button3" onclick="closeSuccessMessage()">关闭</button>-->' +
				            '</div>' +
				            '<div class="clear"></div>' +
				        '</div>' +
				        '<div class="modal-footer">' +
				            '<button class="button3" onclick="closeSuccessMessage()">关闭</button>' +
				        '</div><!--/.modal-footer-->' +
				    '</div><!--/.modal-content-->' +
				'</div><!--/.modal-dialog-->' +
				'</div><!--/.modal-->' 
				);		
	}else{
		if($(".successfulMessage")){
			$(".successfulMessage").remove();
		}
	}
};
function closeSuccessMessage(){
	successfulMessage(false);
}







