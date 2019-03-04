$(function () {
    var $operatorID = $('#operatorID'),
        $operatorName = $('#operatorName'),
        $cardID = $('#cardID'),
        $affiliation = $('#affiliation'),
        $account = $('#account'),
        $desc = $('#desc'),
        $anKuanAlert = $('#anKuanAlert'),
        $anKuanAlertContent = $('#anKuanAlertContent'),
        $submitBtn = $('#submitBtn'),
        $anKuanAlertInf = $('#anKuanAlertInf'),
        $anKuanAlertBtns = $('#anKuanAlertBtns'),
        $anKuanButtons = $('#anKuanButtons'),
        $orgModal = $("#orgModal"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        orgData=null,
        orgChecked=null,
        operatorID = getQueryString('opN')||'';

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
    
    function getOrgList(){
    	if(!zTreeObj){
    		setTimeout(function() {
        		getOrgList();
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

	            /**
	             * 判断是新增还是修改
	             */
	            if (!operatorID || operatorID == '') {
		            zTreeObjShi.setting.callback.onClick = function (event, treeId, treeNode) {
		                orgChecked = treeNode;
		                $affiliation.val(treeNode.name);
		            };
	            }
        	}
		});
    }

    /**
     * 页面初始化
     */
    function webInit() {
        /**
         * 判断是新增还是修改
         */
        if (operatorID && operatorID != '') {
            $("#webBread").html('操作员修改');
            changeFn();
        } else {
            $("#webBread").html('操作员添加');
            $("#operatorID").parent().hide();
            addFn();
        }
        getOrgList();
    }

    /**
     * 新增函数
     */
    function addFn() {
        /**
         * 新增点击提交事件
         */
        $("#submitBtn").click(function () {
        	if(!orgChecked){
                showAlert('所属机构是必填项！请填写');
        		return false;
        	}
            $anKuanAlert.hide();
            var operatorNameVal = $operatorName.val().trim();
            var accountVal = $account.val().trim();
            var cardIDVal = $cardID.val().trim();
            var affiliationID = orgChecked.id;
            var descAVal = $desc.val().trim();
            if (operatorNameVal === "") {
                showAlert('操作员姓名是必填项！请填写');
                return false;
            }
            if (!accountVal||accountVal === "") {
                showAlert('操作员登陆账号！请填写');
                return false;
            }
            $submitBtn.prop('disabled', true);
            var obj = {
                operatorNameVal: operatorNameVal,
                cardIDVal: cardIDVal,
                affiliationVal: affiliationID,
                descAVal: descAVal,
                username:accountVal
            };
            akAjax('post','/ak/sysuser/SaOrUpAKuser',obj,function(data){
                if (data && data.state === 1) {
                    showSucceed('新增成功！');
                } else {
                    showAlert('新增失败！原因：' + data.msg);
                }
                $submitBtn.prop('disabled', false);
    		});
        });
    }

    /**
     * 修改函数
     */
    function changeFn() {
    	$account.parent().remove();
    	$("#checkOrgTip").hide();
    	var uid = null;
        akAjax('get','/ak/sysuser/userOne?id='+operatorID,'',function(data){
        	if(data){
	        	data = data.outVo;
	            $operatorID.val(data.userName);
	            $operatorName.val(data.name);
	            $cardID.val(data.crdtId);
	            uid=data.userId;
	            $affiliation.val(data.blngInsNo).attr('aid',data.blngIns);
	            $desc.val(data.remark)
        	}
		});

        $("#submitBtn").click(function () {
            var operatorIDVal = $operatorID.val().trim();
            if (operatorIDVal === "") return false;
            $anKuanAlert.hide();
            var operatorNameVal = $operatorName.val().trim();
            var cardIDVal = $cardID.val().trim();
            var affiliationVal = $affiliation.attr('aid').trim();
            var descAVal = $desc.val().trim();
            if (operatorNameVal === "") {
                showAlert('操作员姓名是必填项！请填写');
                return false;
            }
            if (affiliationVal === "") {
                showAlert('所属机构是必填项！请填写');
                return false;
            }
            $submitBtn.prop('disabled', true);
            var obj = {
                operatorIDVal: uid,
                operatorNameVal: operatorNameVal, 
                cardIDVal: cardIDVal,
                affiliationVal: affiliationVal,
                descAVal: descAVal
            };
            akAjax('post','/ak/sysuser/SaOrUpAKuser',obj,function(data){
                if (data && data.state === 1) {
                    showSucceed('修改成功！');
                } else {
                    showAlert('修改失败！原因：' + data.msg);
                }
                $submitBtn.prop('disabled', false);
    		});
        });
    }

    webInit();
});

