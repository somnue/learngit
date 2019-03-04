$(function () {
    var $anKuanButtons = $('#anKuanButtons'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $operatorID = $('#operatorID'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $roleTemBox = $("#roleTemBox")
        $submitBtn = $('#submitBtn'),
        $id = $('#id'),
        blngIns = '',
        operatorID = getQueryString('opN');

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
        	}
		});
        akAjax('post','/ak/sysuser/userRoleList',{id:operatorID},function(data){
        	if (data) {
            	$id.val(data.user.userId);
                $operatorID.val(data.user.userName);
                $("#operatorName").val(data.user.name);
                $("#affiliation").val(data.user.blngInsNo);
                $("#cardID").val(data.user.crdtId);
                blngIns = data.user.blngIns;
                data.list.map(function (v) {
                    if (data.hasRole&&data.hasRole.indexOf(v.rlId) != -1) {
                        v.checked = true;
                    } else {
                        v.checked = false;
                    }
                });
                var html = template('roleTem', data);
                $("#roleTemBox").html(html);
            }
		});
    }

    webInit();

    $roleTemBox.on('click','input',function(){
    	var inslevel1 = $("#roleTemBox input[data-inslevel=1]");
    	var inslevel2 = $("#roleTemBox input[data-inslevel=2]");
    	if(inslevel1.length === 0||inslevel2.length === 0) return true;
    	var $this = $(this);
    	var insLevel = $this.data('inslevel');
		if(insLevel == 2){
			inslevel1.attr('checked',false);
		}else if(insLevel == 1){
			inslevel2.attr('checked',false);
		}
    });
    
    
    $submitBtn.click(function () {
        if ($id.val === '') return false;
        $anKuanAlert.hide();
        var radios = $('input[name=roleCheck]:checked'), radioVal = [];
        if (radios.length > 0) {
            radios.each(function (k, v) {
                radioVal.push(v.value);
            });
        }
        $submitBtn.prop('disabled', true);
        var obj = {
            operatorID: $id.val(),
            roles: radioVal
        };
       $.ajax({
        	type:'post',
        	url:'/ak/sysuser/updateRole',
        	data:obj,
        	dataType:'json',
        	traditional:true,
        	success:function(data){
                if (data && data.state == 1) {
                    showSucceed('角色授权成功！');
                } else {
                    showAlert('角色授权失败！原因：' + data.msg);
                }
                $submitBtn.prop('disabled', false);
        	}
        });
    });
});