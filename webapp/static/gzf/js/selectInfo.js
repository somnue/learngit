/**
 * @author TianHan
 */
  
$(function(){ 
     //select根据链接进行跳转
      $("#selectContainer").live("change", function() {  
        var _Id = $(this).find("option:selected").attr("id");
        var _aciton=_Id+".html";   
        if(_Id!='pleaseDo'){  
             $('form:first').attr("action",_aciton);  
        }else{
             $('form:first').attr("action",""); 
        }  
    });   
    
    
    
    //根据报文类型跳转
})
