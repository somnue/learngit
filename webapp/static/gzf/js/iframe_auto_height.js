/**
 * iframe高度自适应屏幕大小
 * Author : 王帅
 * Version : 2012/12/21
 */
 
var iframeids=["menu_tree","mainFrame"]; 
 
itproot.iframes.dyniframesize = function() { 
	var dyniframe=new Array() 
	for (i=0; i<iframeids.length; i++) { 
		if (document.getElementById) { 
			//Զiframe߶ 
			dyniframe[dyniframe.length] = document.getElementById(iframeids[i]); 
			if (dyniframe[i] && !window.opera) { 
				dyniframe[i].style.display="block"; 
				//alert(document.documentElement.clientHeight);
				//alert(window.screen.availHeight);
				if(dyniframe[i].id == "menu_tree"){
					dyniframe[i].height = document.documentElement.clientHeight - 148;
					//dyniframe[i].height = window.screen.availHeight - 165;//dyniframe[i].contentDocument.body.offsetHeight; 
					
				}else if(dyniframe[i].id == "mainFrame"){
					dyniframe[i].height = document.documentElement.clientHeight - 118;
					//dyniframe[i].height = window.screen.availHeight -272;
				}
			} 
		}  
	} 
} 
if (window.addEventListener) 
window.addEventListener("load", itproot.iframes.dyniframesize, false); 
else if (window.attachEvent) 
window.attachEvent("onload", itproot.iframes.dyniframesize); 
else 
window.onload=itproot.iframes.dyniframesize; 


