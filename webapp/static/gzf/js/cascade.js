/**
 * @author TianHan
 */
//级联的初始化
$(function(){  
	// 级联
	 $("#back_id").bankSelect({
		  bankId:"bank",   //必须项
		  provId:"prov",   //必须项
		  cityId:"city",   //必须项
		  prov:"浦发银行",
		  nodata:"none"
	  });  
  	
	// //业务类型
 
	  $("#select_id").bankSelect({
		url:{"banklist":[
		{"b":"前端技术","p":[{"n":"HTML"},{"n":"CSS","a":[{"s":"CSS2.0"},{"s":"CSS3.0"}]},{"n":"JAVASCIPT"}]},"编程语言","p":[{"n":"C"},{"n":"C++"},{"n":"Objective-C"},{"n":"PHP"},{"n":"JAVA"}]},":[{"n":"Mysql"},{"n":"SqlServer"},{"n":"Oracle"},{"n":"DB2"}]},
	  ]},
	    bankId:"bigselect",   //必须项
		provId:"smallselect",   //必须项 
		prov:"浦发银行",
		nodata:"none"
   }); 
})
