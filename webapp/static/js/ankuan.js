var CookieUtil = {
    // 设置cookie
    set: function (name, value, expires, domain, path, secure) {
        var cookieText = "";
        cookieText += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if (expires instanceof Date) {
            cookieText += "; expires=" + expires.toGMTString();
        }
        if (path) {
            cookieText += "; path=" + path;
        }
        if (domain) {
            cookieText += "; domain=" + domain;
        }
        if (secure) {
            cookieText += "; secure";
        }
        document.cookie = cookieText;
    },
    // name=value; expires=expiration_time; path=domain_path; domain=domain_name; secure
    // 获取cookie
    get: function (name) {
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = "";
        if (cookieStart > -1) {
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1) {
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }
        return cookieValue;
    },
    // 删除cookie
    unset: function (name, path, domain, secure) {
        this.set(name, "", Date(0), domain, path, secure);
    }
};
/**
 * 获取用户名--没有返回登陆界面
 */
var username = CookieUtil.get('username');
if (!username || username.trim() === "") {
    window.location = '/akadmin/login';
}


/**
 * 获取地址栏
 * @param name
 * @returns {*}
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/**
 * 获取锚点
 * @param name
 * @returns {*}
 */
function getHashString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.hash.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
/**
 * 获取sessionStorage-params的值
 * @param name
 * @returns {*}
 */
function getParamsString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var params = window.sessionStorage.getItem('params') || '';
    var r = params.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 金额过滤器
 */

function filterMoney(v) {
    if (!v || v === "") return '0.00';
    v = v + "";
    var vA = v.split(".");
    if (vA.length === 1) {
        v = vA[0] - 0;
    } else {
        v = Math.round((vA[0] + "." + vA[1]) * 100) / 100;
    }
    var b = vA[0]; //获取整数部分
    var c = b.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
    var d = ".00"; //预定义小数部分
    var value2Array = String.prototype.split.call(v, ".");
    //=2表示数据有小数位
    if (value2Array.length == 2) {
        d = value2Array[1].toString(); //拿到小数部分
        if (d.length == 1) { //补0,实际上用不着
            return c + "." + d + '0';
        } else {
        	d = d.substr(0,2);
            return c + "." + d;
        }
    } else {
        return c + d;
    }
}

function akAjax(type,url,params,success,error,traditional){
	if(!url || url === '') return false;
	type ==='' ? type = 'post' : type = type;
	params = params || {};
	success = success || function(){};
	error = error || function(err){
        alert('请求错误!原因:'+err.status+' 详情:'+err.responseJSON.error);
	};
	traditional = traditional || false;
	$.ajax({
		type: type,
		url: url,
		data:params,
		dataType: 'json',
		success: success,
		cache:false,
		traditional: traditional,
		error: error
	});
}


function resetBoxHeight(){
	var Eleftbody = $(".leftbody")[0];
    var Erightbody = $(".rightbody")[0];
    if(!Eleftbody){
    	return false;
    }
    rightbodyH = Erightbody.offsetHeight;
    if (rightbodyH > 750) {
    	$('.menusdiv')[0].style.height = (rightbodyH-35) + "px";
    }
}
/**
 * 全局变量
 */
var zTreeObj,gMaxPage=1;

$(function () {

    var zNodes;
    var setting = {
        data:
            {
                simpleData:
                    {enable: true, idKey: 'id', pIdKey: 'pId'}
            }
    };
    
    var pathname = sessionStorage.getItem('pathname');
    if(pathname && pathname != window.location.pathname) {
    	sessionStorage.removeItem('pathname');
    	sessionStorage.removeItem('params');
    }
    $("#welcomeName").html(username);

    resetBoxHeight();

    /**
     * 获取权限
     */
    function getJurisdiction() {
        var jdt = sessionStorage.getItem('jurisdiction');
        if (jdt && jdt != '') {
        	data = JSON.parse(jdt);
            jurisAfter(data);
            return false;
        }
        $.post('/akadmin/index.html', function (data) {
        	data = JSON.parse(data);
            if (data && data.state === 1) {
                data.orgList.map(function (v) {
                    if (!v.pId || v.pId === '') {
                        v.isP = false;
                    } else {
                        v.isP = true;
                    }
                });
                jurisAfter(data);
                sessionStorage.setItem('jurisdiction', JSON.stringify(data));
            }
        });
    }


    function jurisAfter (data){
        zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, data.orgList);
        zTreeObj.expandAll(true);
        $("#navTemBox").html(template('navTem', data));

        var pathname = window.location.pathname;
        if(pathname==="/ak/index"){
        	$("#nav_index").addClass('navActive');
        }else{
        	var search = window.location.search;
        	if(search&&search!=''){
        		$('.nav_item[href="'+ pathname + search +'"]').parent().parent().prev().addClass('navActive');
        	}else{
        		$('.nav_item[href="'+pathname+'"]').parent().parent().prev().addClass('navActive');
        	}
        }
    }
    /**
     * 退出事件
     */
    $("#logout").click(function () {
    	$.post('/logout.html',function(){
	        CookieUtil.unset('username', '/');
	        window.location = '/login.html';
	        sessionStorage.clear();
    	});
    });

    getJurisdiction();
    
    
    window.loaded= function(){
    	resetBoxHeight();
    }

    /**
     * 清除时间事件
     */

    $(".date_clearBtn").click(function(){
    	var $preEIpt = $(this).prev();
    	var val = $preEIpt.val();
    	if(val === ""){
    		return false;
    	}else {
			$preEIpt.datetimepicker('reset');
		}
    });

});