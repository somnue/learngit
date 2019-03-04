$(function () {
    $.datetimepicker.setLocale('ch');

    var $startDate = $('#startDate');
    var $endDate = $('#endDate');
    var $infSearchSubmit = $("#infSearchSubmit"),
		$pages_pageHide = $("#pages_pageHide"),
        $noData = $("#noData"),
        $withholdNum = $("#withholdNum"),
        $name = $("#name"),
        $caseName = $("#caseName"),
        $templateBox = $("#templateBox"),
        $infSearchForm = $("#infSearchForm"),
        $downloadBtn = $("#downloadBtn"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
        withholdNumVal = getHashString('wId') || '',
		caseNameVal = getHashString('cNm') ? unescape(getHashString('cNm')) : '',
		nameVal = getHashString('nm') ? unescape(getHashString('nm')) : '',
        startDate = getHashString('sD') ||'',
        endDate = getHashString('eD') ||'',
		pageNum = getHashString('pN') || 1,
		OrgId = getHashString('orgId') || '',
        pageSize = getHashString('pS') || '10';

    function webInit() {
    	$startDate.val(startDate);
    	$endDate.val(endDate);
		$caseName.val(caseNameVal);
		$name.val(nameVal);
		$withholdNum.val(withholdNumVal);
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
            sDate: startDate,
            eDate: endDate,
            dtnNtcId: withholdNumVal,
            invlvOprNm: nameVal,
            caseNm: caseNameVal
        };
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&orgId=" + OrgId +
		"&sD=" + startDate +
		"&eD=" + endDate +
		"&wId=" + withholdNumVal +
		"&nm=" + escape(nameVal) +
		"&cNm=" + escape(caseNameVal);
        akAjax('post','/akadmin/ntc/pipeline',params,function(data){
            $templateBox.html('');
            if (data.status === 1) {
                $noData.hide();
                data.pageNum = pageNum;
                data.pageSize = pageSize;

				data.list.map(function(v) {
					v.genTm && v.genTm != ""?v.sDate = new Date(v.genTm).toLocaleString('chinese',{hour12:false}):v.sDate = "";
					if(v.ntcCgy && v.ntcCgy === "0"){
						v.payMoney = filterMoney(v.amtSmall);
						v.withdrawMoney = '';
					}else if(v.ntcCgy && v.ntcCgy === "1"){
						v.payMoney = '';
						v.withdrawMoney = filterMoney(v.amtSmall);
					}else{
						v.wIntCpt = filterMoney(v.amtSmall);
					}
					v.invlvAmt = filterMoney(v.invlvAmt);
				});
				data.sum.invlvAmt = filterMoney(data.sum.invlvAmt);
				data.sum.amtSmall = filterMoney(data.sum.amtSmall);
				data.sum.zqAmtSum = filterMoney(data.sum.zqAmtSum);
				
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
                $downloadBtn.prop('href','/akadmin/ntc/pipelineDown?subOfficNo='+OrgId+'&sDate='+startDate+'&eDate='+endDate+'&dtnNtcId='+withholdNumVal+'&caseNm='+caseNameVal+'&invlvOprNm='+nameVal);
                
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
                endDate = '';
                withholdNumVal = '';
                caseNameVal = '';
                nameVal = '';
                getTableData();
            };
        }
    }

    /**
     * form提交
     */
    $infSearchForm.submit(function () {
        //获取表单数据
        startDate = $startDate.val();
        endDate = $endDate.val();
        withholdNumVal = $withholdNum.val();
        nameVal = $name.val();
        caseNameVal = $caseName.val();
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

    webInit();

    $("#print").click(function () {
        $("#printContent").print();
    });


    $startDate.datetimepicker({
        format:'Y/m/d',
        onShow:function(){
            this.setOptions({
                maxDate:$endDate.val()?$endDate.val():false
            })
        },
        timepicker:false
    });
    $endDate.datetimepicker({
        format:'Y/m/d',
        onShow:function(){
            this.setOptions({
                minDate:$startDate.val()?$startDate.val():false
            })
        },
        timepicker:false
    });
});