/**
 * @author TianHan
 */
   $(function(){
        var $td_li =$("#tdContainer a");
        $td_li.click(function(){
            $(this).addClass("select").siblings().removeClass("select");  
            var index =  $td_li.index(this);  
            $("table#tableAllContainer td.tdClass>table").eq(index).show().siblings().hide();   
        })
    })