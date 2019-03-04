$(function () {

    $.datetimepicker.setLocale('ch');
    var $intoDate = $('#intoDate');
    /**
     * 时间选择器初始化
     * @type {Date}
     */
    $intoDate.datetimepicker({
        format: 'Y/m/d',
        timepicker: false
    });
    var $account = $("#account"),
        $infSearchSubmit = $("#infSearchSubmit"),
        $pages = $("#pages"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $infSearchForm = $("#infSearchForm"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
    	$pages_pageHide = $("#pages_pageHide"),
		pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10',
		OrgId = getHashString('orgId') || '',
        accountVal = getHashString('acc') || '',
        intoDateVal = getHashString('iD') || '';

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

	            zTreeObjShi.setting.callback.onClick = function (event, treeId, treeNode) {
	                OrgId = treeNode.id;
	                pageNum = 1;
	                $infSearchForm[0].reset();
	                accountVal = '';
	                intoDateVal = '';
	                getTableData();
	            };
        	}
		});
    }


    /**
     * 页面初始化
     */
    function webInit() {
        $account.val(accountVal);
        $intoDate.val(intoDateVal);
        $pageSizeIpt.val(pageSize);
        $pageNumIpt.val(pageNum);
        getTableData();
        getOrgList();
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
            accno: accountVal,
            imptDate: intoDateVal
        };
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&orgId=" + OrgId +
		"&acc=" + accountVal +
		"&iD=" + intoDateVal;
        akAjax('post','/akadmin/caseAccon/accNo',params,function(data){
            $templateBox.html('');
            if (data && data.count > 0) {
                $noData.hide();
                data.list.map(function(v) {
					v.imptDate && v.imptDate != ""?v.imptDate = new Date(v.imptDate).toLocaleString('chinese',{hour12:false}):v.imptDate = "";
				});
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
     * 初始化获取table数据
     */
    webInit();

    /**
     * form提交
     */
    $infSearchForm.submit(function () {
        //获取表单数据
        accountVal = $account.val();
        intoDateVal = $intoDate.val();
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
});