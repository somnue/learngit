/**
 * @author Tianhan
 */
 
;(function($) {  
    $.fn.extend({
        //表格隔行换色 
        "setBgColor" : function(options) {
            //设置默认值
            option = $.extend({
                odd : "odd", //奇数行
                even : "tr_even", //偶数行
                selected : "tr_selected",
                over : "tr_mouse_over"//鼠标移动上去时
            }, options);
            //隔行换色
            $("tbody>tr:even", this).addClass(option.even);
            $("tbody>tr:odd", this).addClass(option.odd);
            
            //单击行变色
            $("tbody>tr", this).click(function() {
               // $("tbody>tr").removeClass(option.selected);
                $(this).toggleClass(option.selected);  
                //给选中行添加样式 [hasSelected?"removeClass":"addClass"]根据是否包含移除和添加样式
            });
            
            
            //鼠标移动上去变色
            $("tbody>tr", this).mouseover(function() {
                $(this).addClass(option.over);
            });
            //鼠标移出时变回原来的样式
            $("tbody>tr", this).mouseout(function() {
                $(this).removeClass(option.over);
            });
            return this;
            //返回this，使方法可链 注意 这里必须返回 否则无法直接的调用方法
        }
    });
})(jQuery);
