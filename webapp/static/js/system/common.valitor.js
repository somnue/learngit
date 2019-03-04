var JsCore = new Object();
JsCore.$$ = function (id) {
    return "string" == typeof id ? document.getElementById(id) : id;
};


// 根据name获得元素数组
JsCore.ByName = function (name) {
    return document.getElementsByName(name);
};
// 根据tagName获得元素数组
JsCore.ByTagName = function (name) {
    return document.getElementsByTagName(name);
};
JsCore.DateFormat = function (d, f) {
    var t = {
        "y+": d.getFullYear(),
        "M+": d.getMonth() + 1,
        "d+": d.getDate(),
        "H+": d.getHours(),
        "m+": d.getMinutes(),
        "s+": d.getSeconds(),
        "S+": d.getMilliseconds()
    };
    var _t;
    for (var k in t) {
        while (new RegExp("(" + k + ")").test(f)) {
            _t = (RegExp.$1.length == 1) ? t[k] : ("0000000000".substring(0, RegExp.$1.length) + t[k]).substr(("" + t[k]).length);
            f = f.replace(RegExp.$1, _t + "");
        }
    }
    return f;
};
JsCore.Replace = function (str, t, u) {
    str = str + "";
    var i = str.indexOf(t);
    var r = "";
    while (i != -1) {
        r += str.substring(0, i) + u;// 已经匹配完的部分+替换后的字符串
        str = str.substring(i + t.length, str.length);// 未匹配的字符串内容
        i = str.indexOf(t);// 其余部分是否还包含原来的str
    }
    r = r + str;// 累加上剩下的字符串
    return r;
};

String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.ltrim = function () {
    return this.replace(/(^\s*)/g, "");
}
String.prototype.rtrim = function () {
    return this.replace(/(\s*$)/g, "");
}

//验证控件
JsCore.Valitor = {
    "Char": { "v": /^[A-Za-z0-9_]+$/, "msg": "允许字母、数字、下划线" },
    "Chinese": { "v": /^[\u4e00-\u9fa5]+$/, "msg": "只允许中文" },
    "Email": { "v": /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "msg": "电子邮箱格式错误" },
    "English": { "v": /^[A-Za-z]+$/, "msg": "只允许字母" },
    "Mobile": { "v": /^((0\d{2,3}\d{6,15})|(1[3578]{1}\d{9}))$/, "msg": "请输入手机号码(纯数字)" },
    "Money": { "v": /^(([1-9](\d+)?)|0)(\.\d+)?$/, "msg": "请输入金额" },
    "Numeral": { "v": /^\d+$/, "msg": "请输入数字" },
    "Phone": { "v": /^((0\d{2,3})|(\(0\d{2,3}\)))?(-)?[1-9]\d{6,7}(([\-0-9]+)?[^\D]{1})?$/, "msg": "请输入电话号码" },
    "Require": { "v": /\S+/, "msg": "必填" },
    "RequireCompact": { "v": /^\S+$/, "msg": "必填(无空格)" },//必填且不能有空格
    "RequireTrim": { "v": /(^[^\s]{1}(.+)?[^\s]{1}$)|(^[^\s]{1}$)/, "msg": "必填(无前后空格)" },//前后不能有空格
    "Url": { "v": /^http(s)?:\/\/[\w\-]+(\.[\w\-]+)*(:(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{1,3}|[1-9]))?(\/[\d\w\-\/\=\!\@\#\$\%\~\&\(\)\[\]\{\};\?\*\+\.]*)?$/, "msg": "格式错误" },
    "Zip": { "v": /^[1-9]\d{5}$/, "msg": "邮政编码不存在" },

    "Date": { "v": /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))$/, "msg": "日期格式错误" },
    "DateTime": { "v": /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/, "msg": "日期时间格式错误" },
    "Time": { "v": /(?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/, "msg": "时间格式错误" },

    "Number": { "v": "this._Number(value)", "msg": "请输入数值" },
    "NumberPlus": { "v": "this._NumberPlus(value)", "msg": "请输入正数" },
    "NumberMinus": { "v": "this._NumberMinus(value)", "msg": "请输入负数" },
    "Integer": { "v": "this._Integer(value)", "msg": "请输入整数" },
    "IntegerPlus": { "v": "this._IntegerPlus(value)", "msg": "请输入正整数" },
    "IntegerMinus": { "v": "this._IntegerMinus(value)", "msg": "请输入负整数" },

    "Custom": { "v": "this._Custom(value, getAttribute('regexp'))", "msg": "" },
    "Filename": { "v": "this._Filename(value)", "msg": "不能为空,且不能包含下列字符 \\ \/ \: \* \? \" < >" },
    "Filter": { "v": "this._Filter(value, getAttribute('accept'))", "msg": "" },
    "Function": { "v": "this._Function(value, getAttribute('fn'))", "msg": "自定义函数错误" },
    "Group": { "v": "this._Group(getAttribute('name'), getAttribute('min'), getAttribute('max'))", "msg": "至少选择一个" },
    "IdCard": { "v": "this._IdCard(value)", "msg": "身份证号码错误" },
    "Limit": { "v": "this._Limit(value.length, getAttribute('min'), getAttribute('max'))", "msg": "长度限制字数" },
    "LimitB": { "v": "this._Limit(this._LenB(value), getAttribute('min'), getAttribute('max'))", "msg": "长度限制字节" },
    "Password": { "v": "this._Password(value)", "msg": "密码不符合安全规则" },
    "Repeat": { "v": "value == JsCore.$$(getAttribute('to')).value", "msg": "输入不一致" },
    "Range": { "v": "this._Range(value, getAttribute('min'), getAttribute('max'))", "msg": "请输入正确整数" },

    ErrMsg: [],
    _msg: "",
    Num: 0,
    ChkForm: function () {
        var formID = arguments[0] || "";    //FormId
        var mode = arguments[1] || "";      //展示方式  1：底部提示（默认） 2：控件右侧提示

        var objArr = JsCore.$$(formID).getElementsByTagName('*');
        Num = 1;
        for (var i = 0; i < objArr.length; i++) {
            var _obj = objArr[i];
            with (_obj) {
                if (getAttribute("datatitle") || getAttribute("datatype") || getAttribute("required")) {
                    var _isRequired = "false";
                    var _dataTitle = getAttribute("datatitle");
                    if(_dataTitle){_dataTitle=_dataTitle.toString()}
                    var _dataType = getAttribute("datatype");
                    if(_dataType){_dataType=_dataType.toString()}
                    _isRequired = getAttribute("required");
                    _msg = "";
                    var isCustomErr = "false";

                    if (_isRequired && _isRequired == "true") {
                        if (value.trim() == "") {
                            _msg = "提示：" + _dataTitle + "不能为空！";
                        }
                    }
                    if (_msg == "") {
                        if (_dataType&&value.trim()!="") {

                            if (this[_dataType].v.toString().indexOf('/') > -1) {//正则表达式逻辑
                                if (!this[_dataType].v.test(value.trim())) {
                                    if (getAttribute("msg") && getAttribute("msg").toString() != "") {
                                        _msg = getAttribute("msg").toString();
                                    } else {
                                        _msg = this[_dataType].msg;
                                    }
                                }
                            } else {//执行自定义函数
                                if (!eval(this[_dataType].v)) {
                                    if (getAttribute("msg") && getAttribute("msg").toString() != "") {
                                        _msg = getAttribute("msg").toString();
                                    } else {
                                        _msg = this[_dataType].msg;
                                    }
                                }
                            }
                            if (getAttribute("iscustomerr") && getAttribute("iscustomerr").toString() != "") {
                                isCustomErr = getAttribute("iscustomerr").toString();
                                if (isCustomErr == "true") {
                                    _msg = "";
                                }
                            }
                        }
                    }
                    this.$Clear(_obj);
                    if (_msg && _msg != "") {
                        if (mode == 1) {
                            this._ShowError(_msg, mode);
                            return false;
                            break;
                        }
                        if (mode == 2) {//右侧提示
                            try {
                                var _o = document.createElement("SPAN");
                                this.Num++;
                                _o.id = "__ErrorMsgPanel" + this.Num;
                                _o.style.color = "#ff0000";
                                _o.innerHTML = _msg.replace("\u63d0\u793a\uff1a", "");//"*"
                                parentNode.appendChild(_o);// 把对象放进父容器
                            }
                            catch (e) {
                                alert(e.description);
                            }
                        }
                    }
                    Num++;
                }
            }
        }
        return true;
    },
    _ShowError: function (msg, mode) {
        JsCore.$$("error").innerHTML = msg;
    },
    // 尝试删除验证提示
    $Clear: function (o) {
        try {
            if (o || typeof (o) != undefined) {
                var _parentNode = o.parentNode;
                if (_parentNode.childNodes.length > 0) {
                    for (var i = 0; i < _parentNode.childNodes.length; i++) {
                        var child = _parentNode.childNodes[i];
                        if ((child || typeof (child) != undefined) && child.id && child.id.indexOf('__ErrorMsgPanel') > -1) {
                            _parentNode.removeChild(child);
                            break;
                        }
                    }
                }
            }

        }
        catch (e) {
            // alert(e.message);
        }
    },
    //判断是否为格式正确的数字,小数点后可带0(如可以为-1,1,1.1等等)
    _Number: function (v) {
        if (!isNaN(v)) {
            if (v.length == 0 || v.indexOf("+") != -1) {
                return false;
            }
            if (v.indexOf(".") == 0 || v.indexOf("-.") == 0 || v.indexOf("00") == 0 || v.indexOf("-00") == 0 || v.lastIndexOf(".") == v.length - 1) {
                return false;
            }
            return true;
        }
        return false;
    },
    //判断是否为正值数字(如可以为0,1.1等等)
    _NumberPlus: function (v) {
        if (this._Number(v)) {
            if (v.indexOf("-") != -1) {
                return false;
            }
            return true;
        }
        return false;
    },
    //判断是否为负值数字(如可以为-1.1,-2等等)
    _NumberMinus: function (v) {
        if (this._Number(v)) {
            if (v.indexOf("-") != -1) {
                return true;
            }
        }
        return false;
    },
    //判断是否为整数(如可以为-1,1等等)
    _Integer: function (v) {
        if (this._Number(v)) {
            if (v.indexOf(".") != -1) {
                return false;
            }
            return true;
        }
        return false;
    },
    //判断是否为正整数(如可以为2等等)
    _IntegerPlus: function (v) {
        if (this._Integer(v)) {
            if (v.indexOf("-") != -1) {
                return false;
            }
            return true;
        }
        return false;
    },
    //判断是否为负整数(如可以为-2,-0等等,注0只能为-0)
    _IntegerMinus: function (v) {
        if (this._Integer(v)) {
            if (v.indexOf("-") != -1) {
                return true;
            }
        }
        return false;
    },
    _Custom: function (op, reg) {
        return new RegExp(reg, "g").test(op);
    },
    _Group: function (name, min, max) {
        var _g = document.getElementsByName(name);
        var chk = 0;
        min = min || 1;
        max = max || _g.length;
        for (var i = _g.length - 1; i >= 0; i--) {
            if (_g[i].checked) {
                chk++;
            }
        }
        return min <= chk && chk <= max;
    },
    //合法文件名,文件名不能包含\/:*?"<>
    _Filename: function (v) {
        if (v.length == 0) {
            return false;
        }
        if (v.indexOf("\\") == -1
                && v.indexOf("\/") == -1
                && v.indexOf("\:") == -1
                && v.indexOf("\*") == -1
                && v.indexOf("\?") == -1
                && v.indexOf("\"") == -1
                && v.indexOf("<") == -1
                && v.indexOf(">") == -1
                && v.indexOf(".") != 0
                && v.lastIndexOf(".") != (v.length - 1)
            ) {
            return true;
        }
        return false;
    },
    _Filter: function (input, filter) {
        return new RegExp("^.+\.(?=EXT)(EXT)$".replace(/EXT/g, filter.split(/\s*,\s*/).join("|")), "gi").test(input);
    },
    _Function: function (value, fn) {
        var result = false;
        value = JsCore.Replace(value, "\"", "\\\"");
        value = JsCore.Replace(value, "\r", "");
        value = JsCore.Replace(value, "\n", "");
        eval("result = " + fn + "(\"" + value + "\")");
        return result;
    },
    _Group: function (name, min, max) {
        var _g = document.getElementsByName(name);
        var chk = 0;
        min = min || 1;
        max = max || _g.length;
        for (var i = _g.length - 1; i >= 0; i--) {
            if (_g[i].checked) {
                chk++;
            }
        }
        return min <= chk && chk <= max;
    },
    _IdCard: function (v) {
        //如果布尔对象没有初始值或是0,-0,null,"",false,无定义的或NaN,对象就设置为假.不然它就是真(哪怕是字符串值为"false")
        var _iSum = 0;
        //18位或15位
        if (!(/^\d{17}([a-z\d\*]{1})$/i.test(v) || /^\d{15}$/i.test(v))) {
            return false;// 号码位数不对
        }
        v = v.replace(/[a-z\*]{1}$/i, "a");//忽略大小写的以非数字结尾的替换为"a"，a为10(需要11进制)
        //"11":"北京","12":"天津","13":"河北","14":"山西","15":"内蒙古",
        //"21":"辽宁","22":"吉林","23":"黑龙江",
        //"31":"上海","32":"江苏","33":"浙江","34":"安徽","35":"福建","36":"江西","37":"山东",
        //"41":"河南","42":"湖北","43":"湖南","44":"广东","45":"广西","46":"海南",
        //"50":"重庆","51":"四川","52":"贵州","53":"云南","54":"西藏",
        //"61":"陕西","62":"甘肃","63":"青海","64":"宁夏","65":"新疆",
        //"71":"台湾",
        //"81":"香港","82":"澳门",
        //"91":"国外"
        //前两位数必须是上面定义的city
        if ("11_12_13_14_15_21_22_23_31_32_33_34_35_36_37_41_42_43_44_45_46_50_51_52_53_54_61_62_63_64_65_71_81_82_91".indexOf(v.substr(0, 2)) == -1) {
            return false;// 非法地区
        }
        // 15位身份证转换为18位
        if (v.length == 15) {
            v = v.substring(0, 6) + "19" + v.substring(6, 15);
            var _i = 0;
            var _ti = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var _tc = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
            for (var i = 0; i < 17; i++) {
                _i += v.substr(i, 1) * _ti[i];
            }
            v += _tc[_i % 11];
        }
        var _bd = v.substr(6, 4) + "/" + v.substr(10, 2) + "/" + v.substr(12, 2);//取出生日日期部分
        //判断生成的日期所转成的字符串是否与之前的字符串相同
        if (_bd != JsCore.DateFormat(new Date(_bd), "yyyy/MM/dd")) {
            return false;// 非法生日
        }
        for (var i = 17; i >= 0; i--) {
            _iSum += (Math.pow(2, i) % 11) * parseInt(v.charAt(17 - i), 11);
        }
        if (_iSum % 11 != 1) {
            return false;// 非法证号
        }
        return true;
    },
    _Limit: function (len, min, max) {
        min = min || 0;
        max = max || Number.MAX_VALUE;
        return min <= len && len <= max;
    },
    _LenB: function (v) {
        return v.replace(/[^\x00-\xff]/g, "***").length;
    },
    _Password: function (v) {
        return !(/^(([A-Z]*|[a-z]*|\d*|[-_\~!@#\$%\^&\*\.\(\)\[\]\{\}<>\?\\\/\'\"]*)|.{0,5})$|\s/.test(v));
    },
    _Range: function (v, min, max) {
        min = min || (-1 * Number.MAX_VALUE);
        max = max || Number.MAX_VALUE;
        return this._Integer(v) && parseInt(min) <= parseInt(v) && parseInt(v) <= parseInt(max);
    }
}