/**
 * @author TianHan
 */
$(function() {
    
    $("#back_id").bankSelect({
        nodata:"none",
        required:false
    });

    $("#suggention, #suggention2, #suggention3, #suggention4").autocomplete(cities, {
        matchContains : true,
        minChars : 0
    });
    //进入页面select初始化   disabled
    $("#bigSelect").live("change", function() {
        var _bigoptionId = $(this).find("option:selected").attr("id");
        if (_bigoptionId != 'big0') {
            $("#" + _bigoptionId + "-s").show().siblings().hide();
            //初始化二级菜单
            var _secondId=$("#" + _bigoptionId + "-s").find("option:selected").attr("id");
            //smallSelect绑定监听事件
            $("#" + _bigoptionId + "-s").live("change", function() {
                var _optionId = $(this).find("option:selected").attr("id");
                if (_optionId != 'small0') {
                    $("tr[id^='big']").fadeOut("fast");
                    $("#" + _optionId + "-t").fadeIn("fast"); 
                } else {
                    $("tr[id^='big']").hide();
                }
            });
        }
    }); 
   //select中单独的级联
   $("#big1-s").live("change", function() { 
        var _bigoptionId = $(this).find("option:selected").attr("id");
        if (_bigoptionId == 'big1-12') {
            $("#big1-12-t").show();
        }else{
            $("#big1-12-t").hide()
        }
    });   
	
	
	   //select控制table显示  9-1.html的展示效果
   $("#typeID").live("change", function() { 
        var _dataId = $(this).find("option:selected").attr("dataid");  
        if (_dataId) {
			$("#tdT").show();
            $(_dataId).show().siblings().hide();
        }else{
			$("#tdT").hide();
		}
    }); 
	
	   //select控制table显示  9-1.html的展示效果
   $("#typeIDD").live("change", function() { 
        var _dataId = $(this).find("option:selected").attr("dataid");  
        if (_dataId) {
			$("#tdTT").show();
            $(_dataId).show().siblings().hide();
        }else{
			$("#tdTT").hide();
		}
    }); 
	
	//select控制table显示  9-1.html的展示效果
   $("#typeIDDD").live("change", function() { 
        var _dataId = $(this).find("option:selected").attr("dataid");  
        if (_dataId) {
			$("#tdTTT").show();
            $(_dataId).show().siblings().hide();
        }else{
			$("#tdTTT").hide();
		}
    }); 
   
})
