/*
Ajax 三级省市联动
http://code.ciaoca.cn/
日期：2012-7-18

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
nodata:无数据状态
required:必选项
------------------------------ */
(function($){
	$.fn.bankSelect=function(settings){ 
		if(this.length<1){return;}; 
		// 默认值
		settings=$.extend({
			url:"../js/bank.js",
			bank:null,
			prov:null,
			city:null, 
			nodata:null,
			required:true 
		},settings);
 
		var box_obj=$(this); 
		var bank_obj=box_obj.find(".bank"); 
		var prov_obj=box_obj.find(".prov");
		var city_obj=box_obj.find(".city");
		var bank_val=settings.bank;
		var prov_val=settings.prov;
		var city_val=settings.city;
		var select_prehtml=(settings.required) ? "" : "<option value=''>请选择</option>";
		var prov_json;
      // 赋值省级函数
		var provStart=function(){
			var bank_id=bank_obj.get(0).selectedIndex; 
			if(!settings.required){
				bank_id--;
			};
			prov_obj.empty().attr("disabled",true);
			city_obj.empty().attr("disabled",true);
             
			if(bank_id<0||typeof(prov_json.banklist[bank_id].p)=="undefined"){
				
				if(settings.nodata=="none"){
					prov_obj.css("display","none");
					city_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					prov_obj.css("visibility","hidden");
					city_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值省级下拉列表
			temp_html=select_prehtml;
			$.each(prov_json.banklist[bank_id].p,function(i,bank){
				temp_html+="<option value='"+bank.n+"'>"+bank.n+"</option>";
			});
			prov_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
			cityStart();
		};


			// 赋值市级函数
		var cityStart=function(){
			var bank_id=bank_obj.get(0).selectedIndex;
			var prov_id=prov_obj.get(0).selectedIndex;
			if(!settings.required){
				bank_id--;
				prov_id--; 
			};
			city_obj.empty().attr("disabled",true);  
			if(bank_id<0||prov_id<0||typeof(prov_json.banklist[bank_id].p[prov_id].c)=="undefined"){
				if(settings.nodata=="none"){
					city_obj.css("display","none");
				}else if(settings.nodata=="hidden"){
					city_obj.css("visibility","hidden");
				};
				return;
			};
			
			// 遍历赋值市级下拉列表
			temp_html=select_prehtml;
			$.each(prov_json.banklist[bank_id].p[prov_id].c,function(i,prov){
				temp_html+="<option value='"+prov.s+"'>"+prov.s+"</option>";
			});
			city_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
		};


		var init=function(){
			// 遍历赋值省份下拉列表
			temp_html=select_prehtml;
			$.each(prov_json.banklist,function(i,bank){
				 temp_html+="<option value='"+bank.b+"'>"+bank.b+"</option>";
			});   
			// $("#"+settings.bankId).html(temp_html);
			  bank_obj.html(temp_html);  
			// 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
			setTimeout(function(){
				if(settings.bank!=null){
					bank_obj.val(settings.bank);
					provStart();
					setTimeout(function(){
						if(settings.prov!=null){
							prov_obj.val(settings.prov);
							cityStart();
							setTimeout(function(){
								if(settings.city!=null){
									city_obj.val(settings.city);
								};
							},1);
						};
					},1);
				};
			},1);
			// 选择银行时候时发生事件
			bank_obj.bind("change",function(){
				provStart();
			});

			// 选择市级时发生事件
			prov_obj.bind("change",function(){
				cityStart();
			});
		};
 

		// 设置省市json数据
		if(typeof(settings.url)=="string"){ 
			$.getJSON(settings.url,function(json){   
				prov_json=json; 
				init();
			});
		}else{ 
			prov_json=settings.url;
			init();
		};
	};
})(jQuery);