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
function changeW(_obj, _order) { 
    if (checkKeyForInt(_obj.value, event))
        return;
    var _value = parseInt(_obj.value);
    var _valueStr = _obj.value;
    if (isNaN(_value))
        return;
    //根据_order来判断加载哪一个
    var _trContainer = 'trContainer';
    var _tdContainer = 'tdContainer';

    if (_value == 0 || _valueStr.length < 1) {
        _historyValue = _value;
        alert("#" + _tdContainer+_order);
        $("#" + _tdContainer+_order).empty();
        $("#" + _trContainer+_order).hide();
        return;
    }
    var _htmlStr = '';
    var _tableHeadStr = '';
    var _tableEndStr = '';
    var _newValue = _value - _historyValue;
    var _length = 0;
    var _numValue = 0;
    if (_historyValue == _value) {
        return;
    }

 
    //行添加
    if (_newValue > 0) {
        //获取最后一个元素
        var _numh = _areaCount;
          if (_order == 5) {
            _tableHeadStr = ' <table class="form_tab_content">';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                 _htmlStr += '<tr id="tr' + _areaCount +_order+'"> <th>清算行行号</th> <td><input name="Input52" type="text" class="text3" /></td>';
                 _htmlStr += ' <th>调整额度</th> <td><input name="Input52" type="text" class="text3" /></td>  </tr>';
                _areaCount += 1;
            }
          } else if (_order == 6) {
            _tableHeadStr = ' <table class="form_tab_content">';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                _htmlStr += '<tr id="tr' + _areaCount +_order+'">  <th>分支机构清算行行号</th> <td><input name="Input52" type="text" class="text3" /></td> </tr>';
                _areaCount += 1;
            }
        }  
        if (_historyValue == 0) {
            $("#" + _tdContainer+_order).html(_tableHeadStr + _htmlStr + _tableEndStr);
        } else {
            $("#tr" + (_numh - 1)+_order).after(_htmlStr);
        }
        _historyValue = _value;
        $("#" + _trContainer+_order).show();
    } else {
        //行删除    默认从后面开始删除
        _newValue = _historyValue - _value;
        for (var i = 1; i < _newValue + 1; i++) {
            $("#tr" + (_areaCount - 1)+_order).remove();
            _areaCount += -1;
        }
        _historyValue = _value;
        return;
    }
}

