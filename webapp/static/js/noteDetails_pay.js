$(function () {

    var $infForm = $('#infForm'),
        $seePics = $('#seePics'),
        bsnJrnlNo = getQueryString('bsnJrnlNo') || '';

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
            	data.ntc.tpcd==='0'?data.ntc.tpcd='现金':data.ntc.tpcd='转账';
                var infForm = $infForm[0];
                infForm.goodsNum.value = data.ntc.invlvAmtNo;
                infForm.dtnNtcId.value = data.ntc.dtnNtcId;
                infForm.caseName.value = data.ntc.caseNm;
                infForm.caseNum.value = data.ntc.caseId;
                infForm.name.value = data.ntc.invlvOprNm;
                infForm.IDcardType.value = data.ntc.ioCrdtTpcd;
                infForm.IDcard.value = data.ntc.ioCrdtId;
                infForm.caseTime.value = data.ntc.sD;
                infForm.doneTime.value = data.ntc.eD;
                infForm.moneyNum.value = filterMoney(data.ntc.invlvAmt);
                infForm.desc.value = data.ntc.remark;
                infForm.payAccount.value = data.ntc.accNo;
                infForm.payAccountName.value = data.ntc.accNm;
                infForm.payAccountAlias.value = data.ntc.accAls;

                infForm.payType.value = data.ntc.tpcd;
                infForm.operator.value = data.ntc.rspbPsnNm;
                infForm.payMoney.value = filterMoney(data.ntc.amtSmall);
                infForm.operatorIDType.value = data.ntc.crdtTpcd;
                infForm.payMoneyCapital.value = data.ntc.amtLarge;
                infForm.operatorID.value = data.ntc.crdtId;
                infForm.noteID.value = data.ntc.bsnJrnlNo;
                infForm.operatorName.value = data.ntc.addPs;
                infForm.printDate.value = data.ntc.pD;

                $seePics.prop('href', $seePics.data('akhref') + '?goodsNum=' + data.ntc.dtnNtcId);
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
});