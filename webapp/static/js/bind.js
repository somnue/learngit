$(function () {
    var $backModal = $('#backModal'),
        $bindForm = $('#bindForm'),
        $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $submitBtn = $('#submitBtn'),
        $seePics = $('#seePics'),
        $canUserAccount = $('#canUserAccount'),
        $advanceAccount = $('#advanceAccount'),
        $advanceAccountName = $('#advanceAccountName'),
        $advanceAccountAlias = $('#advanceAccountAlias'),
        $backReason = $('#backReason'),
        $choiceAccount = $("#choiceAccount"),
        caseId = null,
        goodsNum = null,
        advanceAccount = null,
        $backBtn = $('#backBtn'),
        $toPayingPage = $('#toPayingPage'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        isSucceed = false,
        timer = null,
        blngInsno = '',
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
                bindForm.dtnNtcId.value = data.dtnNtcId;
                blngInsno = data.blngInsNo;
                bndgSt = data.bndgSt;
                bindForm.caseName.value = data.caseNm;
                bindForm.caseNum.value = data.caseId;
                bindForm.name.value = data.invlvName;
                bindForm.IDcardType.value = data.crdtTpcd;
                bindForm.IDcard.value = data.crdtId;
                bindForm.caseTime.value = data.sDate;
                bindForm.doneTime.value = data.eDate;
                bindForm.moneyNum.value = data.invlvAmt;
                bindForm.desc.value = data.remark;
                bindForm.canUserAccount.value = data.count;
                caseId = data.caseId;
                goodsNum = data.invlvAmtId;

                $seePics.prop('href', $seePics.data('akhref') + '?goodsNum=' + data.dtnNtcId);

                var $toPayingPage = $("#toPayingPage");
                $toPayingPage.prop('href', $toPayingPage.data("akhref") + data.invlvAmtId);
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
        $toPayingPage.hide();
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
        $anKuanAlertBtns.show();
        $anKuanButtons.hide().remove();
    }

    /**
     * 查询是否已经绑定
     */
    function inquireSucceed() {
        var obj = {
        	invlvAmtId: goodsNum,
            bndgAccno: advanceAccount
        };

        akAjax('post','/akadmin/caseAccon/selectBindingAcc',obj,function(data){
            if (data && data.status == 1) {
                showSucceed("账户绑定成功！");
                $toPayingPage.show();
                clearInterval(timer);
            } else if (data && data.status == -1) {
                showAlert('账户绑定失败，原因：' + data.msg);
                clearInterval(timer);
            }
		});
    }

    webInit();

    /**
     * 选择账户点击事件
     */
    $choiceAccount.click(function () {
    	$choiceAccount.attr('disabled',true);
    	var obj = {
            	blngInsno: blngInsno
            };
        akAjax('post','/akadmin/caseAccon/selectByAkAcc',obj,function(data){
            if (data!=null) {
                advanceAccount = data.accno;
                $advanceAccount.val(data.accno);
                $advanceAccountName.val(data.accNm);
                $advanceAccountAlias.val(data.accAls);
            }
            $choiceAccount.attr('disabled',false);
		});
    });
    /**
     * 退回事件
     */
    $("#backOk").click(function () {
        if (!caseId || caseId === '') {
            return false;
        }
        var reasonVal = $backReason.val();
        if (reasonVal === '') {
            $backReason.css('borderColor', 'red');
            return false;
        }
        $backReason.css('borderColor', '#999');
        $backModal.modal('hide');
        $backBtn.attr('disabled', true);
        $submitBtn.attr('disabled', true);

        var obj = {
        	invlvAmtId: goodsNum,
            returnRemark: reasonVal
        };

        akAjax('post','/akadmin/caseAccon/returnAcc', obj,function(data){
            if (data && data.status == 1) {
                showSucceed('退回成功！');
            } else {
                showAlert('退回失败！原因：' + data.msg);
            }
            $backBtn.attr('disabled', false);
            $submitBtn.attr('disabled', false);
		});
    });

    /**
     * 绑定事件
     */
    $bindForm.submit(function () {
    	if(bndgSt=='2'){
    		showAlert('该账号正在绑定中，不可以再绑定');
            return false;
    	}
    	if(bndgSt=='0'){
    		showAlert('该账号已绑定，不可以再绑定');
    		return false;
    	}
        if ($backBtn.attr('disabled')) {
            return false;
        }
        if (this.advanceAccount.value === ''
            || this.moneyNum.value === '') {
            showAlert('预分配账号、应扣金额为空，不能完成绑定账号操作。');
            return false;
        }
        if (this.moneyNum.value == 0) {
            showAlert('应扣金额为0，不能完成绑定账号操作。');
            return false;
        }
        var obj = {
        	invlvAmtId: goodsNum,
            bndgAccno: advanceAccount
        };
        $submitBtn.attr('disabled', true);
        $anKuanAlert.hide();
        akAjax('post','/akadmin/caseAccon/bindingAcc', obj,function(data){
            if (data && data.status == 1) {
                showSucceed('后台正在绑定子账户，请点击返回按钮返回待绑定列表或继续等待');
                timer = setInterval(inquireSucceed, 10000);
            } else {
                showAlert('绑定失败！原因：' + data.msg);
            }
            $submitBtn.attr('disabled', false);
		});
        return false;
    });
});