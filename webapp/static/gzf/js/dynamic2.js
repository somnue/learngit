/**
 * @author TianHan
 * 动态生成td
 */

//只允许输入数字
function checkKeyForInt(value, e) {
    var isOK = false;
    var key = window.event ? e.keyCode : e.which;
    if ((key > 95 && key < 106) || //小键盘上的0到9
    (key > 47 && key < 60) || //大键盘上的0到9
    key == 8 || key == 9 || key == 46 || key == 37 || key == 39 //不影响正常编辑键的使用(8:BackSpace;9:Tab;46:Delete;37:Left;39:Right)
    ) {
        isOK = true;
    } else {
        if (window.event)//IE
        {
            e.returnValue = false;
            //event.returnValue=false 效果相同.
        } else//Firefox
        {
            e.preventDefault();
        }
    }
    return isOK;
}

    var _historyValue = parseInt(0);
    var _areaCount = 0;
    function changeX(_obj) {  
        if (checkKeyForInt(_obj.value,event))return;
        var _value = parseInt(_obj.value); 
        var _valueStr = _obj.value; 
        if(isNaN(_value))return;  
        if (_value == 0) {
            _historyValue = _value;
            $("#divContainer").empty();
            $("#trContainer").hide();
            return;
        }  
        var _htmlStr = '';
        var _newValue = _value - _historyValue;
        var _length = 0;
        var _numValue = 0;
        if (_historyValue == _value) {
            return;
        } 

     var _tableHeadStr='<table class="table_list" > <tr id="headInfo">  <th>征收机关大类代码</th> <th>预算科目代码</th>  <th>发生额</th> </tr>  ';
     var _tableStrEnd='</table>';
    //行添加
    if (_newValue > 0) {
        //获取最后一个元素
        var _numh = _areaCount;
        for (var i = 0; i < _newValue; i++) {
             _htmlStr +='<tr id="tr' + _areaCount + '"><td><select name="" class="text3"> <option value="1111111111:国税">1111111111:国税</option>';
             _htmlStr +='<option value="2222222222:地税">2222222222:地税</option><option value="3333333333:海关">3333333333:海关</option>';
             _htmlStr +='<option value="4444444444:财政">4444444444:财政</option><option value="5555555555:其他">5555555555:其他</option>';
             _htmlStr +='</select> </td><td><input name="Input5" type="text" class="text3" /></td><td><input name="Input5" type="text" class="text3" /></td> </tr>';
             _areaCount += 1;
        }
        if (_historyValue == 0) {
            $("#divContainer").html(_tableHeadStr+_htmlStr+_tableStrEnd);
        } else {
            $("#tr" + (_numh - 1)).after(_htmlStr);
        }
        _historyValue = _value;
        $("#trContainer").show();
    } else {
        //行删除    默认从后面开始删除
        _newValue = _historyValue - _value;
        for (var i = 1; i < _newValue + 1; i++) {
            $("#tr" + (_areaCount - 1)).remove();
            _areaCount += -1;
        }
        _historyValue = _value;
        return;
    }
}
