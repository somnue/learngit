/**
 * @author TianHan
 */
//借记业务录入
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


    //点击新增按钮时候获取表单的值
    $("#addButton").click(function() {
        var arry = new Array();
        for (var i = 0; i < 5; i++) {
            arry[i] = $("#inputId" + i).val();
        }
        //获取table中最后一个tr
        var _index = $("#table_list tr").length - 2;
        var _htmlStr = "<tr id=''><td><input type='radio' name='radiobutton' value='radiobutton' /></td>";
        _htmlStr += "<td>" + arry[0] + "</td><td>" + arry[1] + "</td><td>" + arry[2] + "</td><td>" + arry[3] + "</td><td>" + arry[4] + "</td></tr>";
        getObjByIndex(_index).after(_htmlStr);
    })
    
    
    var _length=$("#table_list tr").length;
     
    //通过索引获取tr对象
    function getObjByIndex(_index) {
        return $("#table_list tr").eq(_index);
    }
    //获取选中的radio父元素的tr索引
    function getRadio() {
        return $('input:radio[name="radiobutton"]:checked');
    }

    function getTrIndex() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr").index();
    }

    function getTr() {
        return $('input:radio[name="radiobutton"]:checked').parent("td").parent("tr");
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
       $('input:radio[name="radiobutton"]').live("click",function(){ 
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
    function emptyInput(){ 
        for (var i = 0; i < _length; i++) {
             $("#inputId" + i).val("");
        }
        
    }
})
