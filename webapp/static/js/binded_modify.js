$(function () {
    var $bindForm = $('#bindForm'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $toUnbound = $('#toUnbound'),
        $seePics = $('#seePics'),
        $moneyNum = $('#moneyNum'),
        $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        caseId = null,
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
                bindForm.advanceAccount.value = data.accno;
                bindForm.advanceAccountName.value = data.account.accNm;
                bindForm.advanceAccountAlias.value = data.account.accAls;
                caseId = data.caseId;
                goodsNum = data.invlvAmtId;

                $seePics.prop('href', $seePics.data('akhref') + '?goodsNum=' + data.dtnNtcId);

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
     * 数字函数
     * @param obj
     * @returns {*}
     */
    function onlyNumber(obj) {
        //先把非数字的都替换掉，除了数字和.
        obj = obj.replace(/[^\d\.]/g, '');
        //必须保证第一个为数字而不是.
        obj = obj.replace(/^\./g, '');
        //保证只有出现一个.而没有多个.
        obj = obj.replace(/\.{2,}/g, '.');
        //保证.只出现一次，而不能出现两次以上
        obj = obj.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
        //只能输入两位小数
        obj = obj.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        return obj
    }
    
    $moneyNum.on('keyup', function () {
        var value = this.value.trim();
        if (value === '') return false;
        var newValue = onlyNumber(value);
        this.value = newValue;
    });

    
    webInit();

    /**
     * 修改事件
     */
    $("#bindForm").submit(function () {
        if (!caseId || caseId === '') {
            return false;
        }
        var moneyNum = $moneyNum.val();
        if (!moneyNum || moneyNum === '') {
            showAlert('金额不能为空');
            return false;
        }
        if (!moneyNum || moneyNum === '0') {
            showAlert('应扣金额不能修改为0，请确认!');
            return false;
        }
        if (moneyNum < 0) {
            showAlert('金额不能为负');
            return false;
        }
        var obj = {
        	invlvAmtId: goodsNum,
            moneyNum: moneyNum
        };
        $anKuanAlert.hide();
        $toUnbound.prop('disabled', true);
        akAjax('post','/akadmin/caseAccon/updateMoneyNum',obj,function(data){
            if (data && data.status == 1) {
                showSucceed('修改成功！');
            } else {
                showAlert('修改失败！原因：' + data.msg);
            }
            $toUnbound.prop('disabled', false);
		});
        return false;
    });
});