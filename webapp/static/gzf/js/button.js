/**
 * @author TianHan
 */
   $(function(){   
       //按钮变灰色，并显示loading效果
      $("#commonButton").live("click",function(){ 
          $(this).addClass("button_bg3_gray");   
          jQuery('body').showLoading( { 
                    'afterShow': 
                    function() {
                        setTimeout("jQuery('body').hideLoading()", 1500); 
                        //tr外面会默认加一个tbody 
                        setTimeout('$("#commonButton").parent("td").parent("tr").parent("tbody").parent("table").parent("form").submit();',1505);
                    }   
                 }
            )  
      }) 
  });  