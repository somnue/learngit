$(function () {
    var $principalAcc = $("#principalAcc"),
        $interestAcc = $("#interestAcc"),
        $infSearchSubmit = $("#infSearchSubmit"),
        $pages = $("#pages"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $radioAlertModal = $("#radioAlertModal"),
        $delAgentModal = $("#delAgentModal"),
        $delAgentBody = $("#delAgentBody"),
        $delAgentOk = $("#delAgentOk"),
        $infSearchForm = $("#infSearchForm"),
    	$pages_pageHide = $("#pages_pageHide"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
		pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10',
		OrgId = getHashString('orgId') || '',
        principalAccVal = getHashString('pA') || '',
        interestAccVal = getHashString('iA') || '',
        radioNum = null;

    /**
     * 页面初始化
     */
    function webInit() {
        $principalAcc.val(principalAccVal);
        $interestAcc.val(interestAccVal);
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
            setlAccno: principalAccVal,
            intAmtAccno: interestAccVal,
        };
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&orgId=" + OrgId +
		"&iA=" + interestAccVal +
		"&pA=" + principalAccVal;
        akAjax('post','/akadmin/setlAcc/settleAll',params,function(data){
            $templateBox.html('');
            if (data && data.status === '1' && data.list.length>0) {
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

    /**
     * 获取选中的值
     * @returns {*}
     */
    function getRadioVal() {
        var radioVal = $("input[name='accRadios']:checked").val();
        if (!radioVal || radioVal === '') {
            $radioAlertModal.modal('toggle');
            return false;
        }
        return radioVal;
    }

    /**
     * 初始化获取table数据
     */
    webInit();

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
	                principalAccVal = '';
	                interestAccVal = '';
	                getTableData();
	            };
        	}
		});
    }


    /**
     * form提交
     */
    $infSearchForm.submit(function () {
        //获取表单数据
        principalAccVal = $principalAcc.val();
        interestAccVal = $interestAcc.val();
        //清除pageNum
        pageNum = 1;

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
     * 删除
     */
    $("#delAcc").click(function () {
        var radioVal = getRadioVal();
        if (!radioVal) {
            return false;
        }
        $delAgentOk.show();
        $delAgentBody.html('删除结算账户，是否确定？');
        $delAgentModal.modal('toggle');
        radioNum = radioVal;
    });

    /**
     * 点击删除
     */
    $delAgentOk.click(function () {
        if (!radioNum && radioNum === '') return false;
        $delAgentOk.prop('disabled', true);
        akAjax('post','/akadmin/setlAcc/delSetlAcc',{setlAccno:radioNum},function(data){
            $delAgentOk.prop('disabled', false).hide();
            radioNum = null;
            if (data && data.status === '1') {
                $delAgentBody.html('删除成功！');
                getTableData();
            } else {
                $delAgentBody.html('删除失败！原因：' + data.msg);
            }
		});
    });
});