/**
 * Author : 王帅
 * Version : 2012/12/21
 */
 
(function(window){
var root={};
//这里可以给其它的模块定义一个固定的名称使用
//例如，给消息模块提供一个“包” msgs
root.msgs={};
root.font_size={};
root.iframes={};
root.tabs={};
root.bgs={};
root.skin={};
root.pages={};
root.checkboxs={};
window.itproot=root;
/*
 * 在外部可以使用类似于itproot.msgs.foo=function(){}的方式创建属于消息模块的foo()方法
 * 使用itproot.msgs.foo()使用消息模块的foo()方法
 */
})(window);
