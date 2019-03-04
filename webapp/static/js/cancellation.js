$(function () {
    var $goodsNum = $("#goodsNum"),
        $withholdNum = $("#withholdNum"),
        $caseName = $("#caseName"),
        $name = $("#name"),
        $infSearchSubmit = $("#infSearchSubmit"),
        $pages = $("#pages"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $infSearchForm = $("#infSearchForm"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
    	$pages_pageHide = $("#pages_pageHide"),
        pageNum = getHashString('pN')||1,
        pageSize = getHashString('pS') || '10',
		goodsNumVal = getHashString('gdsId') || "",
		withholdNumVal = getHashString('wId') || '',
		caseNameVal = getHashString('cNm') ? unescape(getHashString('cNm')) : '',
		nameVal = getHashString('nm') ? unescape(getHashString('nm')) : '',
		OrgId = getHashString('orgId') || '',
        noteType = '1,2';

    /**
     * 页面初始化
     */
    function webInit() {
		
		$goodsNum.val(goodsNumVal);
		$withholdNum.val(withholdNumVal);
		$caseName.val(caseNameVal);
		$name.val(nameVal);
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
            invlvAmtNo: goodsNumVal,
            dtnNtcId: withholdNumVal,
            caseNm: caseNameVal,
            invlvOprNm: nameVal,
            ntcCgy: noteType
        }

		window.location.href = '#pN=' + pageNum +
			'&pS=' + pageSize +
			"&orgId=" + OrgId +
			"&gdsId=" + goodsNumVal +
			"&wId=" + withholdNumVal +	
			"&nm=" + escape(nameVal) +
			"&cNm=" + escape(caseNameVal);
        akAjax('post','/akadmin/ntc/listInvalQuery',params,function(data){
            $templateBox.html('');
            if (data.state === 1) {
                $noData.hide();
                data.pageNum = pageNum;
                data.pageSize = pageSize;
				data.list.map(function(v) {
					v.invlvAmt = filterMoney(v.invlvAmt);
					v.accba = filterMoney(v.accba);
					v.dtnTm && v.dtnTm != ""?v.sDate = new Date(v.dtnTm).toLocaleString('chinese',{hour12:false}):v.sDate = "";
					v.exdat && v.exdat != ""?v.eDate = new Date(v.exdat).toLocaleString('chinese',{hour12:false}):v.eDate = "";
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
        $templateBox.html(template('tabelTem', data));
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
                goodsNumVal = '';
                withholdNumVal = '';
                caseNameVal = '';
                nameVal = '';
                noteTypeStateVal = '';
                getTableData();
            };
        }
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
        goodsNumVal = $goodsNum.val();
        withholdNumVal = $withholdNum.val();
        caseNameVal = $caseName.val();
        nameVal = $name.val();
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