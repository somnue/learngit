$(function () {
    var $infSearchSubmit = $("#infSearchSubmit"),
		$pages_pageHide = $("#pages_pageHide"),
        $noData = $("#noData"),
        $tableFoot = $("#tableFoot"),
        $goodsNum = $("#goodsNum"),
        $withholdNum = $("#withholdNum"),
        $name = $("#name"),
        $caseName = $("#caseName"),
        $templateBox = $("#templateBox"),
        $infSearchForm = $("#infSearchForm"),
        $downloadBtn = $("#downloadBtn"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
		goodsNumVal = getHashString('gdsId') || "",
		withholdNumVal = getHashString('wId') || '',
		caseNameVal = getHashString('cNm') ? unescape(getHashString('cNm')) : '',
		nameVal = getHashString('nm') ? unescape(getHashString('nm')) : '',
		OrgId = getHashString('orgId') || '',
        pageSize = getHashString('pS') || '10',
		pageNum = getHashString('pN') || 1;

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
        var params = params || {
            pageNum: pageNum,
            pageSize: pageSize,
			subOfficNo: OrgId,
			invlvAmtNo: goodsNumVal,
			dtnNtcId: withholdNumVal,
			invlvOprNm: nameVal,
			caseNm: caseNameVal
        };

		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
			"&orgId=" + OrgId +
			"&gdsId=" + goodsNumVal +
			"&wId=" + withholdNumVal +
			"&nm=" + escape(nameVal) +
			"&cNm=" + escape(caseNameVal);
        akAjax('post','/akadmin/clsCase/listQuery',params,function(data){
            $templateBox.html('');
            if (data.state === 1) {
                $noData.hide();
                $tableFoot.show();

				data.list.map(function(v) {
					v.allAmt = filterMoney(v.pnpAmt + v.intAmt);
					v.pnpAmt = filterMoney(v.pnpAmt);
					v.invlvAmt = filterMoney(v.invlvAmt);
					v.intAmt = filterMoney(v.intAmt);
					v.wIntAmt = filterMoney(v.wIntAmt);
				});
				data.sum.pnpAmt = filterMoney(data.sum.pnpAmt);
				data.sum.invlvAmt = filterMoney(data.sum.invlvAmt);
				data.sum.intAmt = filterMoney(data.sum.intAmt);
				data.sum.wIntAmt = filterMoney(data.sum.wIntAmt);
				data.sum.pnInt = filterMoney(data.sum.pnInt);
                data.pageNum = pageNum;
                data.pageSize = pageSize;
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
                $downloadBtn.prop('href','/akadmin/clsCase/Download?subOfficNo='+OrgId+'&invlvAmtNo='+goodsNumVal+'&dtnNtcId='+withholdNumVal+'&invlvOprNm='+nameVal+'&caseNm='+caseNameVal);
            } else {
                $noData.show().html('暂无数据');
				$pages_pageHide.hide();
                $tableFoot.hide();
            }
            $infSearchSubmit.prop('disabled', false);
		},
		function(err){
			$templateBox.html('');
            $noData.show().html('请求错误!原因:'+err.status+' 详情:'+err.responseJSON.error);
			$pages_pageHide.hide();
            $tableFoot.hide();
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
                goodsNumVal = '';
                withholdNumVal = '';
                caseNameVal = '';
                nameVal = '';
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


    $("#print").click(function () {
        $("#printContent").print();
    });

});