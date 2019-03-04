(function($){
	$.fn.iDraggable=function(){
		var disLeft = 0;
		var disRight = 0;
		var disTop = 0;
		var disDown = 0;
		var disX = 0;
		var disY = 0;
		var bool = false;
		var dragObj = $("#draggable");
		var cursor = "";
		var X = 0;
		var Y = 0;
		var dragObjWidth = 0;
		var dragObjHeight = 0;
		var dragObjoffsetLeft = 0;
		var dragObjoffsetTop = 0;
		
		/********只拖曳********/
		dragObj.find(".draggable_title").mousemove(function(){
			dragObj.css("cursor","move");
		});
		dragObj.find(".draggable_title").mouseleave(function(){
			dragObj.css("cursor","default");
		});
		
		dragObj.mousedown(function(event){
			cursor = dragObj.css("cursor");
			bool = true;
			X = event.clientX;
			Y = event.clientY;
			disX = parseInt(dragObj.css("left"));
			disY = parseInt(dragObj.css("top"));
			dragObjWidth = this.clientWidth;
			dragObjHeight = this.clientHeight;
			
			$(document).mouseup(function() {
				bool = false;
			});
			$(document).mousemove(function(event) {
				if (!bool) {
					return false;
				}else{
					var x = disX + event.clientX-X;
					var y = disY + event.clientY-Y;
					
					if(cursor == "move"){
						dragObj.css("left", x+"px");
						dragObj.css("top", y+"px");
					}else{
						return false;
					}
				}
			});
		});
		
		/*******拖曳和拖动大小******/
		/*dragObj.mousemove(function(event){
			disLeft=event.offsetX ;
			disRight=this.clientWidth-disLeft-1;
			disTop=event.offsetY ;
			disDown=this.clientHeight-disTop-1;
			if(disLeft < 1){
				if(disTop < 10){
					dragObj.css("cursor","nw-resize");
				}else{
					if(disDown < 10){
						dragObj.css("cursor","sw-resize");
					}else{
						dragObj.css("cursor","w-resize");
					}
				}
			}else if(disLeft >= 10){
				if(disRight < 1){
					if(disTop < 10){
						dragObj.css("cursor","ne-resize");
					}else{
						if(disDown < 10){
							dragObj.css("cursor","se-resize");
						}else{
							dragObj.css("cursor","e-resize");
						}
					}
				}else if(disRight >= 10){
					if(disTop < 1){
						dragObj.css("cursor","n-resize");
					}else if(disTop <= 24){
						dragObj.css("cursor","move");
					}else{
						if(disDown < 1){
							dragObj.css("cursor","s-resize");
						}else{
							dragObj.css("cursor","default");
						}
					}
				}else{
					if(disTop < 10){
						dragObj.css("cursor","ne-resize");
					}else if(disTop <= 24){
						dragObj.css("cursor","move");
					}else{
						if(disDown < 10){
							dragObj.css("cursor","se-resize");
						}else{
							dragObj.css("cursor","default");
						}
					}
				}
			}else{
				if(disTop < 10){
					dragObj.css("cursor","nw-resize");
				}else if(disTop <= 24){
					dragObj.css("cursor","move");
				}else{
					if(disDown < 10){
						dragObj.css("cursor","sw-resize");
					}else{
						dragObj.css("cursor","default");
					}
				}
			}
		});
		
		dragObj.mousedown(function(event){
			cursor = dragObj.css("cursor");
			bool = true;
			X = event.clientX;
			Y = event.clientY;
			disX = parseInt(dragObj.css("left"));
			disY = parseInt(dragObj.css("top"));
			dragObjWidth = this.clientWidth;
			dragObjHeight = this.clientHeight;
			dragObjoffsetLeft = disX + this.clientWidth - parseInt($(this).css("min-width"));
			dragObjoffsetTop = disY + this.clientHeight - parseInt($(this).css("min-height"));
			
			$(document).mouseup(function() {
				bool = false;
			});
			$(document).mousemove(function(event) {
				if (!bool) {
					return false;
				}else{
					var x = disX + event.clientX-X;
					var y = disY + event.clientY-Y;
					var right = dragObjWidth + event.clientX - X;
					var left = dragObjWidth - event.clientX + X;
					var top = dragObjHeight - event.clientY + Y;
					var bottom = dragObjHeight + event.clientY - Y;
					function moveRight(){
						dragObj.css("width", right+"px");
					}
					function moveLeft(){
						if(x > dragObjoffsetLeft){
							x = dragObjoffsetLeft;
						}
						dragObj.css("left", x+"px");
						dragObj.css("width", left+"px");
					}
					function moveTop(){
						if(y > dragObjoffsetTop){
							y = dragObjoffsetTop;
						}
						dragObj.css("top", y+"px");
						dragObj.css("height", top+"px");
					}
					function moveBottom(){
						dragObj.css("height", bottom+"px");
					}
					if(cursor == "move"){
						dragObj.css("left", x+"px");
						dragObj.css("top", y+"px");
					}else if(cursor == "e-resize"){
						moveRight();
					}else if(cursor == "ne-resize"){
						moveRight();
						moveTop();
					}else if(cursor == "n-resize"){
						moveTop();
					}else if(cursor == "nw-resize"){
						moveTop();
						moveLeft();
					}else if(cursor == "w-resize"){
						moveLeft();
					}else if(cursor == "sw-resize"){
						moveBottom();
						moveLeft();
					}else if(cursor == "s-resize"){
						moveBottom();
					}else if(cursor == "se-resize"){
						moveBottom();
						moveRight();
					}else{
						return;
					}
				}
			});
		});*/
		dragObj.find(".closeDrag").click(function(){
			dragObj.hide();
		});
		$("#showInfo").click(function(){
			dragObj.fadeIn(1000);;
		});
	};
})(jQuery);
$(document).ready(function(){
	$("#draggable").iDraggable();		
});