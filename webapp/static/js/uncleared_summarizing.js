$(function () {
    $.datetimepicker.setLocale('ch');
    var $startDate = $('#startDate');

    var $infSearchSubmit = $("#infSearchSubmit"),
		$pages_pageHide = $("#pages_pageHide"),
        $noData = $("#noData"),
        $templateBox = $("#templateBox"),
        /*$tableFoot = $("#tableFoot"),
        $accountNumTotal = $("#accountNumTotal"),
        $principalTotal = $("#principalTotal"),
        $interestTotal = $("#interestTotal"),
        $priAndIntTotal = $("#priAndIntTotal"),*/
        $infSearchForm = $("#infSearchForm"),
        $downloadBtn = $("#downloadBtn"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
        startDate = getHashString('sD') || "",
        OrgId = getHashString('orgId') || '',
        pageNum =  getHashString('pN') || 1,
        pageSize = getHashString('pS') || '10';

    $startDate.datetimepicker({
        format: 'Y/m',
        timepicker: false,
        validateOnBlur: false,     
        onChangeMonth: function(dateText, inst) {
            var d = $startDate.datetimepicker('getValue');
            $startDate.val(d.getFullYear()+'/'+(d.getMonth()+1));
         }
    });

    function webInit() {
    	$startDate.val(startDate);
        $pageSizeIpt.val(pageSize);
        $pageNumIpt.val(pageNum);
        getTableData();
        zTreeObjClick();
        $('.xdsoft_option').click(function(){
        	$startDate.datetimepicker('hide');
        });
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
            cDate: startDate
        }
		window.location.href = '#pN=' + pageNum +
		'&pS=' + pageSize +
		"&orgId=" + OrgId +
		"&sD=" + startDate;
        akAjax('post','/akadmin/NotClsCaseSmy/listQuery',params,function(data){
            $templateBox.html('');
            if (data.state === 1) {
                /*$accountNumTotal.html(data.sum.accNum);
                $principalTotal.html(filterMoney(data.sum.invlvAmtTot));
                $interestTotal.html(filterMoney(data.sum.intAmtTot));
                $priAndIntTotal.html(filterMoney(data.sum.intAmtTot + data.sum.invlvAmtTot));*/
            	data.sum.priAndIntTotal=Math.round( (data.sum.intAmtTot + data.sum.invlvAmtTot) *100)/100;
				data.sum.invlvAmtTot =filterMoney(data.sum.invlvAmtTot);
				data.sum.intAmtTot =filterMoney(data.sum.intAmtTot);
				
				data.list.map(function(v) {
					v.allTot = filterMoney(v.invlvAmtTot + v.intAmtTot);
					v.invlvAmtTot = filterMoney(v.invlvAmtTot);
					v.intAmtTot = filterMoney(v.intAmtTot);
				});
                gMaxPage = Math.ceil(data.count / pageSize);
                data.gMaxPage = gMaxPage;
                data.pageNum = pageNum;
                $noData.hide();
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
                $downloadBtn.prop('href','/akadmin/NotClsCaseSmy/listDownload?subOfficNo='+OrgId+'&cDate='+startDate);
            } else {
                $noData.show().html('暂无数据');
                $pages_pageHide.hide();
//                $tableFoot.hide();
            }
            $infSearchSubmit.prop('disabled', false);
		},
		function(err){
			$templateBox.html('');
            $noData.show().html('请求错误!原因:'+err.status+' 详情:'+err.responseJSON.error);
            $pages_pageHide.hide();
//            $tableFoot.hide();
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