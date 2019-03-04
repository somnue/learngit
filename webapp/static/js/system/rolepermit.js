var orgtype="";
var rolecode="";
var appcode="";
var isRevise=false;

$(document).ready(function(){
	orgtype = $.trim($("#hid_orgtype").val());
	rolecode = $.trim($("#hid_rolecode").val());
	appcode = $.trim($("#hid_appcode").val());
	if(appcode!=null){
		$(".itemlist.padding").children("div[class='item']").css({fontWeight:"normal"});
		$(".itemlist.padding").children("div[sign='app_"+appcode+"']").css({fontWeight:"bold"});
	}

	$("#tb_mod tr").each(function(i,v){
		if(i!=0){
			var actions = $.trim($(this).children("td:last").text());
			if(actions!=""){
				var html=""
				for(var i1=0;i1<actions.split(' ').length;i1++){
					var v1=actions.split(' ')[i1];
					var actCode=v1.split('-')[0];
					var actName=v1.split('-')[1]
					html+="<input type='checkbox' id='ckb_"+$(this).attr("id")+"_"+actCode+"' onclick='isRevise=true;'/>"+actName+"&nbsp;&nbsp;";
					//ckb_1_4_4_delete
					//appcode_modcode_modid_actcode
				}
				$(this).children("td:last").html(html);
			}
		}
	});

	if(orgtype==""){alert("没有部门参数。")}
	if(rolecode==""){alert("没有角色参数。")}
	if(orgtype!=""&&rolecode!=""){
		$.ajax({
		  type:"post",
		  //async:false,
		  url: "getRolePermit",
		  data:{orgtype:orgtype,rolecode:rolecode,appcode:appcode},
		  cache: false,
		  dataType:'json',
		  success: function(jsonData){
		    //[{"actcode":"add","appcode":"1","modcode":"002003001","modid":"SysUserCent","orgtype":1,"permitcode":"SysUserCent_Add","rolecode":"1"}]
			//var jsonData=eval("("+data+")");
			for(var i=0;i<jsonData.length;i++){
				var v=jsonData[i];
				var id=v.appcode+"_"+v.modcode+"_"+v.modid+"_"+v.actcode;
				$("#ckb_"+id).attr({"checked":"true"});
			}
		  }
		});
	}
});


$(window).bind('beforeunload',function(){
	if(isRevise){
		return "您还没有保存数据，确定要离开此页面吗?";
	}
});


function savePermit(){
	isRevise=true;
	if(orgtype!=""&&rolecode!=""){
		var json="[";
		$("#tb_mod input[type=checkbox]:checked").each(function(i,v){
			var ids=$(this).attr("id").split('_');
			json+="{";
			//ckb_1_4_4_delete
			//appcode_modcode_modid_actcode
			json+="\"appcode\":\""+ids[1]+"\",\"modcode\":\""+ids[2]+"\",\"modid\":\""+ids[3]+"\",\"actcode\":\""+ids[4]+"\",\"orgtype\":\""+orgtype+"\",\"rolecode\":\""+rolecode+"\",\"permitcode\":\""+ids[3]+"_"+ids[4]+"\""
			json+="},";
		});
		json=json.replace(/,$/gi,"");//去掉最后一个逗号
		json+="]";

		$.ajax({
		  type:"post",
		  //async:false,
		  url: "/system/saveRolePermit.html",
		  data:{orgtype:orgtype,rolecode:rolecode,appcode:appcode,json:json},
		  cache: false,
		  dataType:'json',
		  success: function(jsonData){
		    //[{"actcode":"add","appcode":"1","modcode":"002003001","modid":"SysUserCent","orgtype":1,"permitcode":"SysUserCent_Add","rolecode":"1"}]
			//var jsonData=eval("("+data+")");
			if(jsonData.result==1){
				alert("保存成功。");
				isRevise=false;
				window.location.reload();
			}
		  },
		  error:function(){
			  alert("服务器错误。");
		  }
		});
	}else{
		alert("没有部门参数或者没有角色参数,不能保存。");
	}
}

function checkAll() {
	$("input[type=checkbox]").attr("checked",true);
}

function removeAll() {
	$("input[type=checkbox]").removeAttr("checked");
}

function toUrl(baseUrl,appcode){
	window.location.href=baseUrl+"system/rolepermit.html?appcode="+appcode+"&orgtype="+orgtype+"&rolecode="+rolecode;
}