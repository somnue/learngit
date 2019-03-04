$(function () {
    var $infFrom = $('#infFrom'),
        $seePics = $('#seePics'),
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
                var infFrom = $infFrom[0];
                data.dtnTm && data.dtnTm != ""?data.sDate = new Date(data.dtnTm).toLocaleString('chinese',{hour12:false}):data.sDate = "";
                data.exdat && data.exdat != ""?data.eDate = new Date(data.exdat).toLocaleString('chinese',{hour12:false}):data.eDate = "";
                data.retTm && data.retTm != ""?data.rDate = new Date(data.retTm).toLocaleString('chinese',{hour12:false}):data.rDate = "";
                infFrom.goodsNum.value = data.invlvAmtId;
                infFrom.caseName.value = data.caseNm;
                infFrom.caseNum.value = data.caseId;
                infFrom.name.value = data.invlvName;
                infFrom.dtnNtcId.value = data.dtnNtcId;
                infFrom.IDcardType.value = data.crdtTpcd;
                infFrom.IDcard.value = data.crdtId;
                infFrom.caseTime.value = data.sDate;
                infFrom.doneTime.value = data.eDate;
                infFrom.desc.value = data.remark;
                infFrom.payMoney.value = filterMoney(data.invlvAmt);
                infFrom.returnDate.value = data.rDate;
                goodsNum = data.invlvAmtId;

                $seePics.prop('href', $seePics.data('akhref') + '?goodsNum=' + data.dtnNtcId);
            }
		});
    }

    webInit();

    $("#infFrom").submit(function () {
        return false;
    });

});