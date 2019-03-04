$(function () {
    var $templateBox = $("#templateBox"),
        $i_rightBody = $("#i_rightBody"),
        $i_unTotle = $("#i_unTotle");

    function webInit() {
        getTableData();
        zTreeObjClick();
    }


    /**
     * 获取table数据
     * @param params
     */

    function getTableData(param) {
    	param = param || '';
        akAjax('post','/akadmin/wilDo',{insId:param},function(data){
            if (data.state === 1) {
                $i_unTotle.show();
                $i_rightBody.css('background', '#fefefe');
                templateBoxRender(data);
            } else {
            	$templateBox.html('暂无代办事项').addClass('willDoNone');
            }
		});
    }

    /**
     * table页面渲染
     * @param data
     */
    function templateBoxRender(data) {
        var html = template('tabelTem', data);
        $templateBox.html(html).removeClass('willDoNone');
    }

    webInit();

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
                getTableData(OrgId);
            };
        }
    }
});