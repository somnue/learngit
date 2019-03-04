$(function () {
    var newDate = new Date();
    var currentDate = newDate.toLocaleDateString();
    $.datetimepicker.setLocale('ch');
    var $startDate = $('#startDate');
    var $endDate = $('#endDate');
        $startDate.datetimepicker({
            value: currentDate,
            format:'Y/m/d',
            onShow:function( ct ){
                this.setOptions({
                    maxDate:$endDate.val()?$endDate.val():false
                })
            },
            timepicker:false
        });
        $endDate.datetimepicker({
            value: currentDate,
            format:'Y/m/d',
            onShow:function( ct ){
                this.setOptions({
                    minDate:$startDate.val()?$startDate.val():false
                })
            },
            timepicker:false
        });

})