$(function () {
    var $affiliation = $('#affiliation'),
        $settPrincipalAcc = $('#settlementPrincipalAccount'),
        $settPrincipalAccName = $('#settlementPrincipalAccountName'),
        $settInterestAcc = $('#settlementInterestAccount'),
        $settInterestAccName = $('#settlementInterestAccountName'),
        $currency = $('#currency'),
        $desc = $('#desc'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        orgChecked=null;
        $submitBtn = $('#submitBtn');


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

    function webInit() {
    	if(!zTreeObj){
    		setTimeout(function() {
    			webInit();
			}, 200);
    		return false;
    	}else{
    		zTreeObj.destroy();
    	}
        akAjax('post','/ak/sysuser/instType','',function(data){
        	if(data&&data.state==1){
	            var zNodes;
	            var setting = {
	                data:
	                    {
	                        simpleData:
	                            {enable: true, idKey: 'id', pIdKey: 'pId'}
	                    }
	            };
	            var zTreeObjShi = $.fn.zTree.init($("#treeDemo"), setting, data.list);
	            zTreeObjShi.expandAll(true);
	            zTreeObjShi.setting.callback.onClick = function (event, treeId, treeNode) {
	                orgChecked = treeNode;
	                $affiliation.val(treeNode.name);
	            };
        	}
		});
    }
    webInit();

    $("#submitBtn").click(function () {
        $anKuanAlert.hide();
        var settPrincipalAccVal = $settPrincipalAcc.val().trim();
        var settPrincipalAccNameVal = $settPrincipalAccName.val().trim();
        var settInterestAccVal = $settInterestAcc.val().trim();
        var settInterestAccNameVal = $settInterestAccName.val().trim();
        var currencyVal = $currency.val().trim();
        var affiliationVal = orgChecked.id;
        var descVal = $desc.val().trim();

        if (settPrincipalAccVal === ""
            || settPrincipalAccNameVal === ""
            || affiliationVal === ""
            || settInterestAccVal === ""
            || settInterestAccNameVal === ""
            || currencyVal === "") {
            showAlert('红色星号的选项都是必填项,请填写！');
            return false;
        }
        $submitBtn.prop('disabled', true);
        var obj = {
            blngIns: affiliationVal,
            setlAccno: settPrincipalAccVal,
            setlAccnm: settPrincipalAccNameVal,
            intAmtAccno: settInterestAccVal,
            intAmtAccnm: settInterestAccNameVal,
            ccy: currencyVal,
            remark: descVal
        };

        akAjax('post','/akadmin/setlAcc/addSetlAcc',obj,function(data){
            if (data && data.status == 1) {
                showSucceed('新增成功！');
            } else {
                showAlert('新增失败！原因：' + data.msg);
            }
            $submitBtn.prop('disabled', false);
		});
    });
});