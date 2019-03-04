/**
 * @author TianHan
 */
//输入框只能输入数字
function checkRate(input)
{
     var re =/^[1-9]+[0-9]*]*$/;   //判断字符串是否为数字     //判断正整数 /^[1-9]+[0-9]*]*$/  
     if (!re.test(input.rate.value))
    {
        alert("请输入数字!");
        input.rate.focus();
        return false;
     }
}

function isNumber(){
  isNum = /^[0-9]*$/;
  alert(isNum.test($("minsize").value));
}