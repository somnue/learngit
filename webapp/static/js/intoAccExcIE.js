$(function () {
    var $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $anKuanButtons = $('#anKuanButtons'), 
        $anKuanAlertContent = $('#anKuanAlertContent');

    var  $upfile = $('#upfile'),
    	$fileName = $('#fileName'),
    	$submintBtn = $('#submintBtn');
    	
    function showAlert(msg) {
        if ($anKuanAlertInf.hasClass('alert-success')) $anKuanAlertInf.removeClass('alert-success');
        if ($anKuanAlert.hasClass('alert-info')) $anKuanAlert.removeClass('alert-info');
        $anKuanAlertInf.addClass('alert-danger');
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
        $anKuanAlertBtns.hide();
    }

    function showSucceed(msg) {
        if ($anKuanAlertInf.hasClass('alert-danger')) $anKuanAlertInf.removeClass('alert-danger');
        if ($anKuanAlert.hasClass('alert-info')) $anKuanAlert.removeClass('alert-info');
        $anKuanAlertInf.addClass('alert-success');
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
        $anKuanAlertBtns.show();
        $anKuanButtons.hide();
    }

    function showInfo(msg) {
        if ($anKuanAlertInf.hasClass('alert-danger')) $anKuanAlertInf.removeClass('alert-danger');
        if ($anKuanAlertInf.hasClass('alert-success')) $anKuanAlertInf.removeClass('alert-success');
        $anKuanAlertInf.addClass('alert-info');
        $anKuanAlert.show();
        $anKuanAlertContent.html(msg);
        $anKuanAlertBtns.hide();
    }
    
    $("#upIptShow").remove();
    $upfile.addClass('upfileIe');

    $("#ajaxForm").ajaxForm({
		 url:'/akadmin/caseAccon/uploadFile',
		 type:'post',
         dataType : 'json',
         beforeSubmit: function (formData, jqForm, options) {
	        	$anKuanAlert.hide();
	        	if(formData[0].value.indexOf('xls') == -1 ){
	        		showAlert('仅支持xls、xlsx文件');
    			return false; 
	        	}
			    return true; 
 	    },
        success : function (data) {
            if (data.status == '0') {
                showSucceed(data.msg);
            } else {
                showAlert('上传失败！原因：' + data.msg);
            }
            $submintBtn.prop('disabled', false);
        },
        error : function(err){
        	showAlert('请求错误!');
            $submintBtn.prop('disabled', false);
        }
	 });
});