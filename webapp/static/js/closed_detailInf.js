$(function () {

    var $templateBox = $("#templateBox"),
        $goodsNum = $("#goodsNum"),
        $name = $("#name"),
        $withholdNum = $("#withholdNum"),
        $caseName = $("#caseName"),
        $noData = $("#noData"),
    	$pages_pageHide = $("#pages_pageHide"),
        $downloadBtn = $("#downloadBtn"),
        $pageSizeIpt = $("#pageSizeIpt"),
        $pageNumIpt = $("#pageNumIpt"),
        $page_total = $("#page_total"),
        pageSize = getParamsString('pS') || '10',
		pageNum = getParamsString('pN') || 1,
        goodsNum = getQueryString('goodsNum')|| '';
    
    /**
     * 页面初始化
     */
    function webInit() {
        $pageSizeIpt.val(pageSize);
        $pageNumIpt.val(pageNum);
        getTableData();
    }


    /**
     * 获取table数据
     * @param params
     */
    function getTableData() {
        if (!goodsNum || goodsNum === '') {
            return false;
        }
        var params = {
            pageNum: pageNum,
            pageSize: pageSize,
            invlvAmtNo: goodsNum,
        };
//        console.log(window.location.pathname)
        sessionStorage.setItem('pathname',window.location.pathname);
        sessionStorage.setItem('params','#pN=' + pageNum +'&pS=' + pageSize);
//		window.location.href = '#pN=' + pageNum +'&pS=' + pageSize;
        akAjax('post','/akadmin/ntc/cqDetail',params,function(data){
            $templateBox.html('');
            if (data && data.state === 1) {
                $noData.hide();
                $goodsNum.val(data.gdsId);
                $name.val(data.invlvOprNm);
                $withholdNum.val(data.dtnNtcId);
				data.list.map(function(v) {
					v.prtTm && v.prtTm != ""?v.prtTm = new Date(v.prtTm).toLocaleString('chinese',{hour12:false}):v.prtTm = "";
					if(v.ntcCgy === '0'){
						v.payMoney = filterMoney(v.amtSmall);
						v.withdrawMoney = '';
					}else if(v.ntcCgy === '1'){
						v.payMoney = '';
						v.withdrawMoney = filterMoney(v.amtSmall);
					}else{
						v.wIntCpt = filterMoney(v.amtSmall);
					}
				});
                $caseName.val(data.caseNm);
                data.pageNum = pageNum;
                data.pageSize = pageSize;
                templateBoxRender(data);
                //按钮数据刷新
				$("#pages").data('page').refresh({
					pageNum:pageNum,
					pageSize:pageSize,
					count:data.count
					});
                gMaxPage = Math.ceil(data.count / pageSize);
                $page_total.html('共 '+ data.count +' 条');
                $pageNumIpt.val(pageNum);
                $downloadBtn.prop('href','/akadmin/ntc/cqDetailDownload?invlvAmtNo='+goodsNum);
                
            }else {
                $noData.show().html('暂无数据');
                $pages_pageHide.hide();
            }
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

    webInit();

    $("#infSearchForm").submit(function () {
        return false;
    });

    $("#print").click(function () {
        $("#printContent").print();
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