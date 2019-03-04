/**
 * @author TianHan
 */
$(function() {  
   
    //select中单独的级联
   $("#bigSelect").live("change", function() { 
        var _bigoptionId = $(this).find("option:selected").attr("id");
        if (_bigoptionId == 'bigSelected') {
            $("#smallSelect").show();
        }else{
            $("#smallSelect").hide()
        }
    });   
})
