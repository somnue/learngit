$(function () {
    $.datetimepicker.setLocale('ch');
    var $startDate = $('#startDate');

    $startDate.datetimepicker({
        format: 'Y/m/d',
        timepicker: false
    });
    var $operatorID = $("#operatorID"),
        $infSearchSubmit = $("#infSearchSubmit"),
    	$pages_pageHide = $("#pages_pageHide"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $infSearchForm = $("#infSearchForm"),
        $downloadBtn = $("#downloadBtn"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
        startDate = getHashString('sD') || "",
        operatorIDVal = getHashString('oId') ? unescape(getHashString('oId')) : '',
		OrgId = getHashString('orgId') || '',
		pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10';

    /**
     * 页面初始化
     */
    function webInit() {
        $startDate.val(startDate);
        $operatorID.val(operatorIDVal);
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
            mnpltTm: startDate,
            oprNm: operatorIDVal
        };
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&orgId=" + OrgId +
		"&sD=" + startDate +
		"&oId=" + escape(operatorIDVal);
        akAjax('post','/akadmin/log/query',params,function(data){
            $templateBox.html('');
            if (data.status == 1) {
                $noData.hide();
                data.pageNum = pageNum;
                data.pageSize = pageSize;

				data.list.map(function(v) {
					if(v.mnpltTm && v.mnpltTm != "") v.mnpltTm = new Date(v.mnpltTm).toLocaleString('chinese',{hour12:false}); 
				});
                templateBoxRender(data);
                resetBoxHeight();
                //按钮数据刷新
				$("#pages").data('page').refresh({
					pageNum:pageNum,
					pageSize:pageSize,
					count:data.count
					});
                gMaxPage = Math.ceil(data.count / pageSize);
                $page_total.html('共 '+ data.count +' 条');
                $pageNumIpt.val(pageNum);
                $downloadBtn.prop('href','/akadmin/log/listDownload?subOfficNo='+OrgId+'&oprNm='+operatorIDVal+'&mnpltTm='+startDate);
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
     * zTreeObj点击初始化
     */
    function zTreeObjClick() {
        if (!zTreeObj || zTreeObj === '') {
            setTimeout(function () {
                zTreeObjClick();
            }, 1000);
        } else {
            zTreeObj.setting.callback.onClick = function (event, treeId, treeNode) {
                OrgId = treeNode.id;
                pageNum = 1;
                $infSearchForm[0].reset();
                startDate = '';
                operatorIDVal = '';
                getTableData();
            };
        }
    }

    webInit();

    /**
     * form提交
     */
    $infSearchForm.submit(function () {
        //获取表单数据
        startDate = $startDate.val();
        operatorIDVal = $operatorID.val();
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

    $("#print").click(function () {
        $("#printContent").print();
    });

});