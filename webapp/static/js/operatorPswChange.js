$(function () {
    var $operatorPsw = $('#operatorPsw'),
        $operatorNewPsw = $('#operatorNewPsw'),
        $operatorNewPswA = $('#operatorNewPswA'),
        $operatorID = $('#operatorID'),
        $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $submitBtn = $('#submitBtn');


    /**
     * 页面初始化
     */
    function webInit() {
        akAjax('post','/akadmin/sysuser/loginDetails','',function(data){
            if (data) {
                $operatorID.val(data.AkSysUserDo.userName);
            }
		});
    }

    function showAlert(msg) {
        if ($anKuanAlertInf.hasClass('alert-success')) $anKuanAlertInf.removeClass('alert-success');
        $anKuanAlertInf.addClass('alert-danger');
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
        $anKuanAlertBtns.hide();
    }

    function showSucceed(msg) {
        if ($anKuanAlertInf.hasClass('alert-danger')) $anKuanAlertInf.removeClass('alert-danger');
        $anKuanAlertInf.addClass('alert-success');
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
        $anKuanAlertBtns.show();
        $anKuanButtons.hide();
    }


    webInit();

    $("#submitBtn").click(function () {
        if($operatorID.val()==='') return false;
        $anKuanAlert.hide();
        var operatorPswVal = $operatorPsw.val().trim();
        var operatorNewPswVal = $operatorNewPsw.val().trim();
        var operatorNewPswAVal = $operatorNewPswA.val().trim();
        if (operatorPswVal === "" || operatorNewPswVal === "" || operatorNewPswAVal === "") {
            showAlert('以上都是必填项！请填写');
            return false;
        }
        if (operatorNewPswVal.trim().length <6) {
            showAlert('密码长度不能低于6位！');
            return false;
        }
        if (operatorNewPswVal !== operatorNewPswAVal) {
            showAlert('两次输入的密码不一致！');
            return false;
        }
        $submitBtn.prop('disabled', true);
        var obj = {
        	userId: $operatorID.val(),
            oldPwd: hex_md5(operatorPswVal),
            newPwd: hex_md5(operatorNewPswVal),
            qnewPwd: hex_md5(operatorNewPswAVal)
        };
        akAjax('post','/akadmin/sysuser/loginpw',obj,function(data){
            if(data&&data.status==1){
                showSucceed('修改密码成功！');
            }else {
                showAlert('修改密码失败！原因：' + data.msg);
            }
            $submitBtn.prop('disabled', false);
		});
    });
});