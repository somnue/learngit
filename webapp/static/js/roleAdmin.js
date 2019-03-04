$(function () {
    var navNodes = [],
        navTreeObj,
        $submitBtn = $("#submitBtn"),
        $anKuanButtons = $("#anKuanButtons"),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $roleSelect = $("#roleSelect"),
        setting = {
            data:
                {
                    simpleData:
                        {enable: true, idKey: 'id', pIdKey: 'parentId'},
                },
            check: {
                enable: true
            },
            view: {
                showIcon: false
            },
            edit: {
                enable: false,
                editNameSelectAll: false
            }
        };


    function showAlert(msg) {
        if ($anKuanAlertInf.hasClass('alert-success')) $anKuanAlertInf.removeClass('alert-success');
        $anKuanAlertInf.addClass('alert-danger');
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
    }

    function showSucceed(msg) {
        if ($anKuanAlertInf.hasClass('alert-danger')) $anKuanAlertInf.removeClass('alert-danger');
        $anKuanAlertInf.addClass('alert-success');
        $anKuanAlertContent.html(msg);
        $anKuanAlert.show();
    }

    /**
     * 获取菜单树函数
     */
    function getNavListFn() {
    	$anKuanButtons.hide();
        var roleSelectVal = $roleSelect.val();
        if (navTreeObj) navTreeObj.destroy();
        if (roleSelectVal === '') return false;
        akAjax('get','/akadmin/menu/query?rlId='+roleSelectVal,'',function(data){
        	if(data&&data.status==='1'){
        		$anKuanButtons.show();
        		navNodes = data.list;
        		navTreeObj = $.fn.zTree.init($("#navTreeBox"), setting, navNodes);
        		navTreeObj.expandAll(true);
        	}
		});
    }

    $roleSelect.change(function () {
        getNavListFn();
    });

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
        akAjax('get','/akadmin/role/query','',function(data){
        	if (data && data.status === '1') {
                $roleSelect.html(template('tabelTem', data));
                getNavListFn();
            }
		});
    }

    webInit();

    $submitBtn.click(function () {
        var roleSelectVal = $roleSelect.val();
        var sendNodes = [];
        if (!roleSelectVal) return false;
        var checkedNodes = navTreeObj.getCheckedNodes();
        checkedNodes.map(function (v) {
            sendNodes.push(v.id);
        });
        $anKuanAlert.hide();
        var obj = {
            roleId: roleSelectVal,
            menuId: sendNodes
        };
        $submitBtn.prop('disabled', true);
        akAjax('post','/akadmin/roleMenu/update',obj,function(data){
        	if (data && data.status == 1) {
        		showSucceed('分配成功！');
        	} else {
        		showAlert("分配失败！原因：" + data.msg)
        	}
        	$submitBtn.prop('disabled', false);
		},null,true);
    });
});