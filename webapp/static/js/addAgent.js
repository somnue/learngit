$(function () {
    var $affiliation = $('#affiliation'),
        $operatorName = $('#operatorName'),
        $agentIDType = $('#agentIDType'),
        $agentID = $('#agentID'),
        affiliation = '',
        affiliationId="",
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $anKuanButtons = $('#anKuanButtons'),
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

    /**
     * 初始化
     */
    function webInit() {
        akAjax('post','/akadmin/agent/blngNm','',function(data){
            if (data && data.status === 1) {
                affiliation = data.insFullname;
                affiliationId= data.blngIns;
                $affiliation.val(affiliation);
            }
		});
    }

    webInit();

    $("#submitBtn").click(function () {
        if (!affiliation || affiliation === '') return false;
        $anKuanAlert.hide();
        var agentIDVal = $agentID.val().trim();
        var operatorNameVal = $operatorName.val().trim();
        var agentIDTypeVal = $agentIDType.val().trim();
        if (agentIDVal === ""
            || agentIDTypeVal === ""
            || operatorNameVal === "") {
            showAlert('以上都是必填项,请填写！');
            return false;
        }
        $submitBtn.prop('disabled', true);
        var obj = {
        	crdtTpcd: agentIDTypeVal,
            name: operatorNameVal,
            crdtId: agentIDVal,
            blngIns: affiliationId,
            insFullname: affiliation
        };
        akAjax('post','/akadmin/agent/addagent',obj,function(data){
            if (data && data.status === '1') {
                showSucceed('新增成功！');
            } else {
                showAlert('新增失败！原因：' + data.msg);
            }
            $submitBtn.prop('disabled', false);
		});
    });
});