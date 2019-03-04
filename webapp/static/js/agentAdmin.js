$(function () {
    var $agentName = $("#agentName"),
        $agentID = $("#agentID"),
        $infSearchSubmit = $("#infSearchSubmit"),
        $pages = $("#pages"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $radioAlertModal = $("#radioAlertModal"),
        $delAgentModal = $("#delAgentModal"),
        $delAgentBody = $("#delAgentBody"),
        $delAgentOk = $("#delAgentOk"),
    	$pages_pageHide = $("#pages_pageHide"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
		pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10',
        agentNameVal = getHashString('aNm') ? unescape(getHashString('aNm')) : '',
        agentIDVal = getHashString('aNo') || "",
        radioNum = null;

    /**
     * 获取table数据
     * @param params
     */
    function getTableData() {
        var params = {
            pageNum: pageNum,
            pageSize: pageSize,
            name: agentNameVal,
            crdtId: agentIDVal
        };
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&aNm=" + escape(agentNameVal) +
		"&aNo=" + agentIDVal;
        akAjax('post','/akadmin/agent/query',params,function(data){
            $templateBox.html('');
            if (data && data.status === '1') {
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
        var radioIpt = $("input[name='agentRadios']:checked");
        var radioVal = radioIpt.val();
        if (!radioVal || radioVal === '') {
            $radioAlertModal.modal('toggle');
            return false;
        }
        var radioObj = {
        	radioName: radioIpt.data("anm"),
        	radioVal: radioVal
        }
        return radioObj;
    }

    /**
     * 初始化获取table数据
     */
    function webInit(){
    	$agentName.val(agentNameVal);
    	$agentID.val(agentIDVal);
        $pageSizeIpt.val(pageSize);
        $pageNumIpt.val(pageNum);
    	getTableData();
    }

    webInit();
    /**
     * form提交
     */
    $("#infSearchForm").submit(function () {
        //获取表单数据
        agentNameVal = $agentName.val();
        agentIDVal = $agentID.val();
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
     * 删除经办人
     */
    $("#delAgent").click(function () {
        var radioObj = getRadioVal();
        if (!radioObj) {
            return false;
        }
        $delAgentOk.show();
        $delAgentBody.html('删除经办人: ' + radioObj.radioName + ' ，是否确定？');
        $delAgentModal.modal('toggle');
        radioNum = radioObj;
    });

    /**
     * 删除经办人
     */
    $delAgentOk.click(function () {
        if (!radioNum) return false;
        $delAgentOk.prop('disabled', true);

        akAjax('post','/akadmin/agent/delagent',{id:radioNum.radioVal},function(data){
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