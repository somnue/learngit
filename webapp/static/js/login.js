$(function () {
    var $loginBtn = $("#loginBtn"),
        $account = $("#account"),
        $password = $("#password"),
        $loginTips = $("#loginTips");
    var CookieUtil = {
        // 设置cookie
        set: function (name, value, path, expires, domain, secure) {
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
        unset: function (name, domain, path, secure) {
            this.set(name, "", path, Date(0), domain, secure);
        }
    };

    $("#loginForm").submit(loginFn);

    function loginFn() {
        $loginTips.html('');
        var account = $account.val(),
            password = $password.val();
        if (!account || account.trim() === "" || !password || password.trim() === "") {
            $loginTips.html('操作员账号或密码不能为空');
            return false;
        }
        $loginBtn.prop('disabled', true);
        var obj = {
            username: account,
            code_rand: "1",
            userpassword:  hex_md5(password)
        };
        sessionStorage.clear();
        $.ajax({
        	type:'post',
        	url:'/user/login',
        	data: obj,
        	dataType:'json',
        	success:function (data) {
                if (data&&data.result === '1') {
                    CookieUtil.set('username', data.username, '/');
                    window.location.href = '/ak/index'
                } else {
                    $loginTips.html(data.msg);
                    $loginBtn.prop('disabled', false);
                }
            },
            error:function(err){
            	alert('请求错误!原因:'+err.status+' 详情:'+err.responseJSON.error);
            }
        });
        return false;
    }
});