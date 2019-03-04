$(function () {
    var $bindForm = $('#bindForm'),
        $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $submitBtn = $('#submitBtn'),
        $seePics = $('#seePics'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        caseId = null,
        isSucceed = false,
        bndgAccno = null,
        timer = null,
        bndgSt = '',
        goodsNum = getQueryString('goodsNum');

    /**
     * 页面初始化
     */
    function webInit() {
        if (!goodsNum || goodsNum === '') {
            return false;
        }
        akAjax('post','/akadmin/caseAccon/selectByGdsId',{invlvAmtId: goodsNum},function(data){
        	if (data) {
                var bindForm = $bindForm[0];
                data.dtnTm && data.dtnTm != ""?data.sDate = new Date(data.dtnTm).toLocaleString('chinese',{hour12:false}):data.sDate = "";
                data.exdat && data.exdat != ""?data.eDate = new Date(data.exdat).toLocaleString('chinese',{hour12:false}):data.eDate = "";
			
                bindForm.goodsNum.value = data.invlvAmtId;
                bndgSt = data.bndgSt;
                bindForm.dtnNtcId.value = data.dtnNtcId;
                bindForm.caseName.value = data.caseNm;
                bindForm.caseNum.value = data.caseId;
                bindForm.name.value = data.invlvName;
                bindForm.IDcardType.value = data.crdtTpcd;
                bindForm.IDcard.value = data.crdtId;
                bindForm.caseTime.value = data.sDate;
                bindForm.doneTime.value = data.eDate;
                bindForm.moneyNum.value = data.invlvAmt;
                bindForm.desc.value = data.remark;
                data.bndgSt==='0'?bindForm.bindState.value='已绑定':bindForm.bindState.value='解绑中';
                bndgAccno = data.accno;
                bindForm.advanceAccount.value = data.accno;
                bindForm.advanceAccountName.value = data.account.accNm;
                bindForm.advanceAccountAlias.value = data.account.accAls;
                caseId = data.caseId;
                goodsNum = data.invlvAmtId;$seePics.prop('href', $seePics.data('akhref') + '?goodsNum=' + data.dtnNtcId);
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

    /**
     * 查询是否已经二解绑
     */
    function inquireSucceed() {
        var obj = {
            invlvAmtId: goodsNum,
            bndgAccno: bndgAccno
        };

        akAjax('post','/akadmin/caseAccon/selectUntieAcc',obj,function(data){
            if (data && data.status == 1) {
                showSucceed("账户解绑成功！");
                clearInterval(timer);
            } else if (data && data.status == -1) {
                showAlert('账户解绑失败，原因：' + data.msg);
                $anKuanAlertBtns.show();
                clearInterval(timer);
            }
		});
    }

    webInit();

    $("#bindForm").submit(function () {
        return false;
    });

    /**
     * 解绑事件
     */
    $submitBtn.click(function () {
    	if(bndgSt=='3'){
    		showAlert('该账号正在解绑中，不可以再解绑');
            return false;
    	}
    	if(bndgSt=='1'){
    		showAlert('该账号已解绑，不可以再解绑');
    		return false;
    	}
        if (!bndgAccno || bndgAccno === '') {
        	showAlert('绑定账号信息为空');
        	return false;
        }
        var obj = {
        	invlvAmtId: goodsNum,
            bndgAccno: bndgAccno
        };
        $submitBtn.attr('disabled', true);
        $anKuanAlert.hide();

        akAjax('post','/akadmin/caseAccon/untieAcc',obj,function(data){
            if (data && data.status == 1) {
                showSucceed('后台正在解绑子账户，请点击返回按钮返回已绑定列表或继续等待');

                timer = setInterval(inquireSucceed, 10000);
            } else {
                showAlert('解绑失败！原因：' + data.msg);
            }
            $submitBtn.attr('disabled', false);
		});
        return false;
    });
});