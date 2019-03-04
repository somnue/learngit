$(function () {
    $.datetimepicker.setLocale('ch');
    var $startDate = $('#startDate');
    var $endDate = $('#endDate');

    $startDate.datetimepicker({
        format: 'Y/m/d',
        onShow: function () {
            this.setOptions({
                maxDate: $endDate.val() ? $endDate.val() : false
            })
        },
        timepicker: false
    });
    $endDate.datetimepicker({
        format: 'Y/m/d',
        onShow: function () {
            this.setOptions({
                minDate: $startDate.val() ? $startDate.val() : false
            })
        },
        timepicker: false
    });


    var $infSearchSubmit = $("#infSearchSubmit"),
		$pages_pageHide = $("#pages_pageHide"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        $infSearchForm = $("#infSearchForm"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
        startDate = getHashString('sD') || "",
        endDate = getHashString('eD') || "",
		OrgId = getHashString('orgId') || '',
        pageSize = getHashString('pS') || '10',
        $downloadBtn = $("#downloadBtn"),
		pageNum = getHashString('pN') || 1;

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
            eDate: endDate
        };
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
			"&orgId=" + OrgId +
			"&sD=" + startDate +
			"&eD=" + endDate;
        akAjax('post','/akadmin/caseAccon/geDepts',params,function(data){
            $templateBox.html('');
        	if (data&&data.list&&data.list.length>0) {
                $noData.hide();
                data.pageNum = pageNum;
                data.pageSize = pageSize;
				data.list.map(function(v) {
					v.deptSynctm && v.deptSynctm != ""?v.deptSynctm = new Date(v.deptSynctm).toLocaleString('chinese',{hour12:false}):v.deptSynctm = "";
					v.zjgxsj && v.zjgxsj != ""?v.zjgxsj = new Date(v.zjgxsj).toLocaleString('chinese',{hour12:false}):v.zjgxsj = "";
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
                $downloadBtn.prop('href','/akadmin/caseAccon/excByDeptSynctm?subOfficNo='+OrgId+'&sDate='+startDate+'&eDate='+endDate);
            } else {
                $noData.show();
    			$pages_pageHide.hide();
            }
            $infSearchSubmit.prop('disabled', false);
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
    });

});