/**
 * @author TianHan
 */
//借记业务录入

jQuery.table = {
        //_coninterId:table的ID
    adu : function(_coninterId,_operate, _someStr) {
        // _operate--1:增加,2:修改,3:删除
        var _container=$("#"+_coninterId).children("tr").
        var operateArray = new Array("1", "2", "3");
        var somStrArray = new Array("1", "2", "3");
        if (_operate == operateArray[0]) {
            //点击新增按钮时候获取表单的值
            var arry = new Array();
            for (var i = 0; i < 5; i++) {
                arry[i] = $("#inputId" + i).val();
            }
            //获取table中最后一个tr
            var _index = _container.length - 2;
            var _htmlStr = "<tr id=''><td><input type='radio' name='radiobutton' value='radiobutton' /></td>";
            _htmlStr += "<td>" + arry[0] + "</td><td>" + arry[1] + "</td><td>" + arry[2] + "</td><td>" + arry[3] + "</td><td>" + arry[4] + "</td></tr>";
            getObjByIndex(_index).after(_htmlStr); 
        } else if (_operate == operateArray[1]) {
            
            
            

        } else if (_operate == operateArray[2]) {

        }

        alert("新增");
    }
}

$(function() {
    $("#inputId0").autocomplete(cities, {
        matchContains : true,
        minChars : 0,
        width : 150
    });

    $("#inputId1").autocomplete(cities, {
        matchContains : true,
        minChars : 0,
        width : 150
    });
    $("#inputId3").autocomplete(cities, {
        matchContains : true,
        minChars : 0,
        width : 150
    });

    var _length = $("#table_list tr").length;

    //通过索引获取tr对象
    function getObjByIndex(_index) {
        return _container.eq(_index);
    }

    //获取选中的radio
    function getRadio() {
        return $('input:radio[name="radiobutton"]:checked');
    }

    //获取tr
    function getTr() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr");
    }

    //获取tr的Index
    function getTrIndex() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr").index();
    }

    //修改
    $("#updateButton").click(function() {
        var arry = new Array();
        for (var i = 0; i < 5; i++) {
            arry[i] = $("#inputId" + i).val();
        }

        $('input:radio[name="radiobutton"]:checked').parent("td").nextAll().each(function(i) {
            $(this).text(arry[i]);
        });
    })
    //监听radio
    $('input:radio[name="radiobutton"]').live("click", function() {
        var arry = new Array();
        if (getTrIndex() > 0) {
            $('input:radio[name="radiobutton"]:checked').parent("td").nextAll().each(function(i) {
                arry[i] = $.trim($(this).text());
            });
        } else {
            alert("未选择对象!");
        }
        for (var i = 0; i < 5; i++) {
            $("#inputId" + i).val(arry[i]);
        }

    })
    //删除
    $("#deleteButton").click(function() {
        if (getTrIndex() > 0) {
            getObjByIndex(getTrIndex()).remove();
            emptyInput();
        } else {
            alert("未选择对象!");
        }
    })
    //点击删除之后清空input
    function emptyInput() {
        for (var i = 0; i < _length; i++) {
            $("#inputId" + i).val("");
        }

    }

})
