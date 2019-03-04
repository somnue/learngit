$(function () {
    var $infForm = $('#infForm'),
        $submitBtn = $('#submitBtn'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        goodsId = null,
        bsnJrnlNo = getQueryString('bsnJrnlNo') || '';

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
     * 页面初始化
     */
    function webInit() {
        if (!bsnJrnlNo || bsnJrnlNo === '') {
            return false;
        }
        akAjax('get','/akadmin/ntc/ntcDetailQuery?bsnJrnlNo='+bsnJrnlNo,'',function(data){
        	if (data && data.state === 1) {
            	if(data.ntc.dtnTm&&data.ntc.dtnTm!=""){
            		data.ntc.sD = new Date(data.ntc.dtnTm).toLocaleString('chinese',{hour12:false});
            	}else{
            		data.ntc.sD = "";
            	}
            	if(data.ntc.exdat&&data.ntc.exdat!=""){
            		data.ntc.eD = new Date(data.ntc.exdat).toLocaleString('chinese',{hour12:false});
            	}else{
            		data.ntc.eD = "";
            	}
            	if(data.ntc.prtTm&&data.ntc.prtTm!=""){
            		data.ntc.pD = new Date(data.ntc.prtTm).toLocaleString('chinese',{hour12:false});
            	}else{
            		data.ntc.pD = "";
            	}
            	data.ntc.tpcd ==0?data.ntc.tpcd='现金':data.ntc.tpcd='转账';
                $('#goodsNum')[0].value = data.ntc.invlvAmtNo;
                $('#dtnNtcId')[0].value = data.ntc.dtnNtcId;
                $('#caseName')[0].value = data.ntc.caseNm;
                $('#caseNum')[0].value = data.ntc.caseId;
                $('#name')[0].value = data.ntc.invlvOprNm;
                $('#IDcardType')[0].value = data.ntc.ioCrdtTpcd;
                $('#IDcard')[0].value = data.ntc.ioCrdtId;
                $('#caseTime')[0].value = data.ntc.sD;
                $('#doneTime')[0].value = data.ntc.eD;
                $('#desc')[0].value = data.ntc.remark;
                $('#payAccount')[0].value = data.ntc.accNo;
                $('#payAccountName')[0].value = data.ntc.accNm;
                $('#payAccountAlias')[0].value = data.ntc.accAls;
                $('#payType')[0].value = data.ntc.tpcd;
                $('#operator')[0].value = data.ntc.rspbPsnNm;
                $('#payMoney')[0].value = filterMoney(data.ntc.amtSmall);
                $('#operatorIDType')[0].value = data.ntc.crdtTpcd;
                $('#payMoneyCapital')[0].value = data.ntc.amtLarge;
                $('#operatorID')[0].value = data.ntc.crdtId;
                $('#noteID')[0].value = data.ntc.bsnJrnlNo;
                $('#printDate')[0].value = data.ntc.pD;

                $('#affiliation')[0].value = data.ntc.blngIns;
                $('#department')[0].value = data.ntc.caseDept;
                $('#payeeAccount')[0].value = data.ntc.rcvPymtPsAccno;
                $('#payeeAccountName')[0].value = data.ntc.rcvPymtPsAccnm;
                $('#recipientBank')[0].value = data.ntc.rpyBkNm;
                $('#recipientBankID')[0].value = data.ntc.rpyBkAccNo;
                $('#administratorID')[0].value = data.ntc.addPs;

                goodsId = data.ntc.gdsId;
            }
		});
    }

    webInit();
    /**
     * form阻止
     */
    $infForm.submit(function () {
        return false;
    });
    /**
     * 作废事件
     */

    $("#ModalOk").click(function () {
        if (!goodsId || goodsId === '') {
            return false;
        }
        $anKuanAlert.hide();
        $("#backModal").modal('hide');
        $submitBtn.prop('disabled', true);
        akAjax('get','/akadmin/ntc/ntcInval?bsnJrnlNo='+bsnJrnlNo,'',function(data){
            if (data && data.status === 1) {
                showSucceed('作废成功！');
            } else {
                showAlert('作废失败！原因：' + data.msg);
            }
            $submitBtn.prop('disabled', false);
		});
    });
});