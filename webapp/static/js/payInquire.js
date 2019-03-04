$(function() {
	var $goodsNum = $("#goodsNum"),
		$withholdNum = $("#withholdNum"),
		$caseName = $("#caseName"),
		$name = $("#name"),
		$noteTypeState = $("#noteTypeState"),
		$infSearchForm = $("#infSearchForm"),
		$infSearchSubmit = $("#infSearchSubmit"),
		$pages = $("#pages"),
		$noData = $("#noData"),
		$templateBox = $("#templateBox"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
    	$pages_pageHide = $("#pages_pageHide"),
		pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10',
		goodsNumVal = getHashString('gdsId') || "",
		withholdNumVal = getHashString('wId') || '',
		caseNameVal = getHashString('cNm') ? unescape(getHashString('cNm')) : '',
		nameVal = getHashString('nm') ? unescape(getHashString('nm')) : '',
		noteTypeStateVal = getHashString('nTS') || '',
		OrgId = getHashString('orgId') || '',
		noteType = 0;

	/**
	 * 页面初始化
	 */
	function webInit() {
		$goodsNum.val(goodsNumVal);
		$withholdNum.val(withholdNumVal);
		$caseName.val(caseNameVal);
		$name.val(nameVal);
		$noteTypeState.val(noteTypeStateVal);
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
			invlvOprNm: nameVal,
			caseNm: caseNameVal,
			ntcCgy: noteType,
			prtSt: noteTypeStateVal
		};
		if(noteTypeStateVal == 2){
			$("#tm").show();
		}else{
			$("#tm").hide();
		}
		window.location.href = '#pN=' + pageNum +
			'&pS=' + pageSize +
			"&orgId=" + OrgId +
			"&gdsId=" + goodsNumVal +
			"&wId=" + withholdNumVal +
			"&nm=" + escape(nameVal) +
			"&cNm=" + escape(caseNameVal)+
			"&nTS=" + noteTypeStateVal;
        akAjax('post','/akadmin/ntc/ntcListQuery',params,function(data){
	            $templateBox.html('');
	            if(data.state === 1) {
					$noData.hide();
					data.pageNum = pageNum;
	                data.pageSize = pageSize;
					data.list.map(function(v) {
						v.invlvAmt = filterMoney(v.invlvAmt);
						v.accba = filterMoney(v.accba);
						v.invalTm && v.invalTm != ""?v.iDate = new Date(v.invalTm).toLocaleString('chinese',{hour12:false}):v.iDate = "";
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
		var html = null;
		if(noteTypeStateVal == 2){
			html = template('tabelTemPayZ', data);
		}else{
			html = template('tabelTemPay', data);
		}
		$templateBox.html(html);
		$pages_pageHide.show();
	}

	/**
	 * zTreeObj点击初始化
	 */
	function zTreeObjClick() {
		if(!zTreeObj || zTreeObj === '') {
			setTimeout(function() {
				zTreeObjClick();
			}, 500);
		} else {
			zTreeObj.setting.callback.onClick = function(event, treeId, treeNode) {
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
	$infSearchForm.submit(function() {

		//获取表单数据
		goodsNumVal = $goodsNum.val();
		withholdNumVal = $withholdNum.val();
		caseNameVal = $caseName.val();
		nameVal = $name.val();
		noteTypeStateVal = $noteTypeState.val();
		//清除pageNum
		pageNum = 1;
		if(noteTypeStateVal != 2){
			$("#tm").hide();
		}

		$infSearchSubmit.prop('disabled', true);
		getTableData();
		return false;
	});

	/**
	 * 按钮点击事件
	 */
	$("#pages").on("pageChanged", function(event, params) {
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