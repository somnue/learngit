$(function () {
    $.datetimepicker.setLocale('ch');
    var $startDate = $('#startDate');
    var $endDate = $('#endDate');
    var $infSearchSubmit = $("#infSearchSubmit"),
        $pages_pageHide = $("#pages_pageHide"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $downloadBtn = $("#downloadBtn"),
        $infSearchForm = $("#infSearchForm"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
		pageNum = getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10',
        startDate = getHashString('sD') || "",
        endDate = getHashString('eD') || "",
		OrgId = getHashString('orgId') || '',
        noteType = '1,2';

    function webInit() {
        $startDate.val(startDate);
        $endDate.val(endDate);
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
            ntcCgy: noteType
        };
		window.location.href = '#pN=' + pageNum +
			'&pS=' + pageSize +
			"&orgId=" + OrgId +
			"&sD=" + startDate +
			"&eD=" + endDate;
        akAjax('post','/akadmin/ntc/wrongListQuery',params,function(data){
	            $templateBox.html('');
	            if (data.state === 1) {
	                $noData.hide();
	                data.pageNum = pageNum;
	                data.pageSize = pageSize;
					data.list.map(function(v) {
						v.amtSmall = filterMoney(v.amtSmall);
						v.dtnTm && v.dtnTm != ""?v.sDate = new Date(v.dtnTm).toLocaleString('chinese',{hour12:false}):v.sDate = "";
						v.exdat && v.exdat != ""?v.eDate = new Date(v.exdat).toLocaleString('chinese',{hour12:false}):v.eDate = "";
						v.prtTm && v.prtTm != ""?v.pDate = new Date(v.prtTm).toLocaleString('chinese',{hour12:false}):v.pDate = "";
						v.invalTm && v.invalTm != ""?v.invalDate = new Date(v.invalTm).toLocaleString('chinese',{hour12:false}):v.invalDate = "";
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
	                $downloadBtn.prop('href','/akadmin/ntc/wrongListDownload?subOfficNo='+OrgId+'&sDate='+startDate+'&eDate='+endDate+'&ntcCgy='+noteType);
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
                getTableData();
            };
        }
    }

    /**
     * 时间选择器初始化
     * @type {Date}
     */
    $startDate.datetimepicker({
        format: 'Y/m/d',
        onShow: function (ct) {
            this.setOptions({
                maxDate: $endDate.val() ? $endDate.val() : false
            })
        },
        timepicker: false
    });
    $endDate.datetimepicker({
        format: 'Y/m/d',
        onShow: function (ct) {
            this.setOptions({
                minDate: $startDate.val() ? $startDate.val() : false
            })
        },
        timepicker: false
    });

    /**
     * form提交
     */
    $infSearchForm.submit(function () {
        //获取表单数据
        startDate = $startDate.val();
        endDate = $endDate.val();
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
    })
})