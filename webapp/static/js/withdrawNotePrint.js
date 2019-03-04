$(function () {

    var $anKuanAlertContent = $('#anKuanAlertContent'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlert = $('#anKuanAlert'),
        $bsnJrnlNo = $("#bsnJrnlNo"),
        amtSmall=null,
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
    function webInit() {
        if (!bsnJrnlNo || bsnJrnlNo === '') {
            return false;
        }
        akAjax('post','/akadmin/ntc/printzq',{bsnJrnlNo:bsnJrnlNo},function(data){
            if (data.status == 1) {
                amtSmall = data.AkNtcDo.amtSmall;
                data.AkNtcDo.amtSmall = filterMoney(data.AkNtcDo.amtSmall);
                $("#NoteBox").html(template("NoteTem", data.AkNtcDo));
                resetBoxHeight();
            }
		});
    }

    webInit();

    $("#print").click(function () {
        if (!amtSmall || amtSmall === '') return false;
        var $this = $(this);
        $this.attr('disabled',true);
        var obj = {
        	bsnJrnlNo:bsnJrnlNo,
        	amtSmall:amtSmall
        };
        akAjax('post','/akadmin/ntc/jzprint',obj,function(data){
            if (data.status == 1) {
                $("#NoteBox").print({
                    stylesheet: '/static/css/printNotes.css'
                });
            }else{
            	showAlert('打印请求失败，原因：'+data.msg);
                $this.attr('disabled',false);
            }
		});
    });
});