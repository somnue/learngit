/**
 * @author TianHan
 */
$(function(){  
      //loading效果  默认在body中加载该效果
      $('body').css('height', $(window).height());    
      jQuery('body').showLoading( { 
				    'afterShow': 
					function() {
						setTimeout( "jQuery('body').hideLoading()", 3000); 
					} 	
				 }
			)
    });