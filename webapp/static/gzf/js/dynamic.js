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
function changeV(_obj, _order) {
    alert("---");
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
        $("#" + _tdContainer).empty();
        $("#" + _trContainer).hide();
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
        if (_order == 1) {
            _tableHeadStr = '<table class="form_tab_content">';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                _htmlStr += '<tr id="tr' + _areaCount + '"> <th>背书人名称</th> <td><input name="input' + _areaCount + '" id="input' + _areaCount + '" type="text" class="text3" /> </td> </tr>';
                _areaCount += 1;
            }
        } else if (_order == 2) {
            _tableHeadStr = '<table class="table_list" > <tr id="headInfo">  <th>征收机关大类代码</th> <th>预算科目代码</th>  <th>发生额</th> </tr>  ';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                _htmlStr += '<tr id="tr' + _areaCount + '"><td><select name="" class="text3"> <option value="1111111111:国税">1111111111:国税</option>';
                _htmlStr += '<option value="2222222222:地税">2222222222:地税</option><option value="3333333333:海关">3333333333:海关</option>';
                _htmlStr += '<option value="4444444444:财政">4444444444:财政</option><option value="5555555555:其他">5555555555:其他</option>';
                _htmlStr += '</select> </td><td><input name="Input5" type="text" class="text3" /></td><td><input name="Input5" type="text" class="text3" /></td> </tr>';
                _areaCount += 1;
            }
        } else if (_order == 3) {
            _tableHeadStr = '<table class="table_list"> <tr> <th>兑付国债银行大类</th> <th>本金代码</th> <th>本金金额</th> <th>利息代码</th> <th>利息金额</th> </tr> ';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                _htmlStr += '<tr id="tr' + _areaCount + '"><td><select name="select" class="text3"> <option value="111111111:人行" selected="selected">人行</option><option value="222222222:工行" >工行</option>';
                _htmlStr += '<option value="333333333:农行" >农行</option> <option value="444444444:中行" >中行</option>  <option value="555555555:建行" >建行</option>';
                _htmlStr += '<option value="777777777:其他" >其他</option> <option value="666666666:交行" >交行</option></select></td>';
                _htmlStr += '<td><input name="name1-' + _areaCount + '" type="text" class="text3" value="CNY" size="6" /></td>';
                _htmlStr += '<td><input name="name2-' + _areaCount + '" type="text" class="text3" value="1000.00" /></td>';
                _htmlStr += '<td><input name="name3-' + _areaCount + '" type="text" class="text3" value="02" size="4" /></td>';
                _htmlStr += '<td><input name="name4-' + _areaCount + '" type="text" class="text3" value="56.00" /></td></tr>';
                _areaCount += 1;
            }
        } else if (_order == 4) {
            _tableHeadStr = ' <table class="form_tab_content">';
            _tableEndStr = '</table>';
            for (var i = 0; i < _newValue; i++) {
                 _htmlStr += '<tr id="tr' + _areaCount + '"> <th>清算行行号</th> <td><input name="Input52" type="text" class="text3" /></td>';
                 _htmlStr += ' <th>调整额度</th> <td><input name="Input52" type="text" class="text3" /></td>  </tr>';
                _areaCount += 1;
            }
        }  

        if (_historyValue == 0) {
            $("#" + _tdContainer).html(_tableHeadStr + _htmlStr + _tableEndStr);
        } else {
            $("#tr" + (_numh - 1)).after(_htmlStr);
        }
        _historyValue = _value;
        $("#" + _trContainer).show();
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

