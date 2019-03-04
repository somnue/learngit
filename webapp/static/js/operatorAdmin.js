$(function () {
    var $operatorNum = $("#operatorNum"),
        $operatorName = $("#operatorName"),
        $infSearchSubmit = $("#infSearchSubmit"),
        $pages = $("#pages"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $radioAlertModal = $("#radioAlertModal"),
        $writeOffModal = $("#writeOffModal"),
        $writeOffBody = $("#writeOffBody"),
        $writeOffOk = $("#writeOffOk"),
        $writeOnModal = $("#writeOnModal"),
        $writeOnBody = $("#writeOnBody"),
        $writeOnOk = $("#writeOnOk"),
        $resetPswModal = $("#resetPswModal"),
        $resetPswBody = $("#resetPswBody"),
        $resetPswOk = $("#resetPswOk"),
        $infSearchForm = $("#infSearchForm"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
    	$pages_pageHide = $("#pages_pageHide"),
		pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10',
		OrgId = getHashString('orgId') || '',
        operatorNumVal = getHashString('oNo') || '',
        operatorNameVal = getHashString('oNm') ? unescape(getHashString('oNm')) : '',
        radioNum = null;

    /**
     * 页面初始化
     */
    function webInit() {
    	$operatorNum.val(operatorNumVal);
    	$operatorName.val(operatorNameVal);
        $pageSizeIpt.val(pageSize);
        $pageNumIpt.val(pageNum);
        getTableData();
        zTreeObjClick();
    }

    /**
     * 获取table数据
     * @param params
     */
    function getTableData() {
        var params = {
            pageNum: pageNum,
            pageSize: pageSize,
            subOfficNo: OrgId,
            id: operatorNumVal,
            name: operatorNameVal
        };
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&orgId=" + OrgId +
		"&oNo=" + operatorNumVal +
		"&oNm=" + escape(operatorNameVal);
        akAjax('post','/ak/sysuser/userList',params,function(data){
            $templateBox.html('');
            if (data && data.state === 1) {
                $noData.hide();
                data.pageNum = pageNum;
                data.pageSize = pageSize;
                //按钮数据刷新
                templateBoxRender(data);

                resetBoxHeight();
				$("#pages").data('page').refresh({
					pageNum:pageNum,
					pageSize:pageSize,
					count:data.count
					});
                gMaxPage = Math.ceil(data.count / pageSize);
                $page_total.html('共 '+ data.count +' 条');
                $pageNumIpt.val(pageNum);
            } else {
                $noData.show().html('暂无数据');
    			$pages_pageHide.hide();
            }
            $infSearchSubmit.prop('disabled', false);
		},
		function(err){
			$templateBox.html('');
            $noData.show().html('请求错误!原因:'+err.status+' 详情:'+err.responseJSON.error);
			$pages_pageHide.hide();
		});
    }

    /**
     * table页面渲染
     * @param data
     */
    function templateBoxRender(data) {
        var html = template('tabelTem', data);
        $templateBox.html(html);
		$pages_pageHide.show();
    }

    function getRadioVal() {
        var radioIpt = $("input[name='operateRadios']:checked");
        var radioVal = radioIpt.val();
        if (!radioVal || radioVal === '') {
            $radioAlertModal.modal('toggle');
            return false;
        }
        var radioObj = {
        	radioVal: radioVal,
        	radioUnm: radioIpt.data('unm')
        }
        return radioObj;
    }


    /**
     * zTreeObj点击初始化
     */
    function zTreeObjClick() {
    	if(!zTreeObj){
    		setTimeout(function() {
    			zTreeObjClick();
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
	            zTreeObjShi.setting.callback.onClick = function (event, treeId, treeNode) {
	                OrgId = treeNode.id;
	                pageNum = 1;
	                $infSearchForm[0].reset();
	                operatorNumVal = '';
	                operatorNameVal = '';
	                getTableData();
	            };
        	}
		});
    }

    /**
     * 初始化获取table数据
     */
    webInit();

    /**
     * form提交
     */
    $("#infSearchForm").submit(function () {
        //获取表单数据
        operatorNumVal = $operatorNum.val();
        operatorNameVal = $operatorName.val();
        //清除pageNum
        pageNum = 1;
        OrgId = '';
        $infSearchSubmit.prop('disabled', true);
        getTableData();
        return false;
    });

    /**
     * 按钮点击事件
     */
    $("#pages").on("pageChanged", function (event, params) {
        pageNum = params.pageNum;
        pageSize = params.pageSize;
        getTableData();
    });
	$("#page_submit").click(function(){
		var ps = $pageSizeIpt.val();
		if(ps != pageSize){
			pageSize= ps;
			pageNum = '1';
			$pageNumIpt.val(pageNum);
		}else{
			pageNum = $pageNumIpt.val();
		}
		getTableData();
	});

    /**
     * 注销
     */
    $("#writeOff").click(function () {
        var radioObj = getRadioVal();
        if (!radioObj) {
            return false;
        }
        $writeOffOk.show();
        $writeOffBody.html('注销编号是 ' + radioObj.radioUnm + ' 的操作员，是否确定？');
        $writeOffModal.modal('toggle');
        radioNum = radioObj.radioVal;
    });
    /**
     * 点击注销
     */
    $writeOffOk.click(function () {
        if (!radioNum && radioNum === '') return false;
        $writeOffOk.prop('disabled', true);
        var obj ={
        		state:0,
        		id:radioNum
        };
        akAjax('post','/ak/sysuser/userUState',obj,function(data){
            $writeOffOk.prop('disabled', false).hide();
            radioNum = null;
            if (data && data.state == 1) {
                $writeOffBody.html('注销成功！');
                getTableData();
            } else {
                $writeOffBody.html('注销失败！原因：' + data.msg);
            }
		});
    });
    /**
     * 启用
     */
    $("#writeOn").click(function () {
        var radioObj = getRadioVal();
        if (!radioObj) {
            return false;
        }
        $writeOnOk.show();
        $writeOnBody.html('启用编号是 ' + radioObj.radioUnm + ' 的操作员，是否确定？');
        $writeOnModal.modal('toggle');
        radioNum = radioObj.radioVal;
    });
    /**
     * 点击启用
     */
    $writeOnOk.click(function () {
        if (!radioNum && radioNum === '') return false;
        $writeOnOk.prop('disabled', true);
        var obj ={
        		state:1,
        		id:radioNum
        };
        akAjax('post','/ak/sysuser/userUState',obj,function(data){
            $writeOnOk.prop('disabled', false).hide();
            radioNum = null;
            if (data && data.state === 1) {
                $writeOnBody.html('启用成功！');
                getTableData();
            } else {
                $writeOnBody.html('启用失败！原因：' + data.msg);
            }
		});
    });
    /**
     * 重置密码
     */
    $("#resetPsw").click(function () {
        var radioObj = getRadioVal();
        if (!radioObj) {
            return false;
        }
        $resetPswOk.show();
        $resetPswBody.html('重置编号是 ' + radioObj.radioUnm + ' 的操作员密码，是否确定？');
        $resetPswModal.modal('toggle');
        radioNum = radioObj.radioVal;
    });
    /**
     * 点击重置密码
     */
    $resetPswOk.click(function () {
        if (!radioNum && radioNum === '') return false;
        $resetPswOk.prop('disabled', true);
        akAjax('get','/ak/sysuser/userUPswd?id='+radioNum,'',function(data){
            $resetPswOk.prop('disabled', false).hide();
            radioNum = null;
            if (data && data.state == 1) {
                $resetPswBody.html('重置密码成功！初始密码为:' + data.pwd);
            } else {
                $resetPswBody.html('重置密码失败！原因：' + data.msg);
            }
		});
    });

    /**
     * x修改
     */
    $("#changeOperator").click(function () {
        var radioObj = getRadioVal();
        if (!radioObj) {
            return false;
        }
        window.location.href = './operateWeb?opN=' + radioObj.radioVal
    });


    /**
     * 角色分配
     */
    $("#operatorAllotRoleBtn").click(function () {
        var radioObj = getRadioVal();
        if (!radioObj) {
            return false;
        }
        window.location.href = './operatorAllotRole?opN=' + radioObj.radioVal
    });

});