$(document).ready(function () {

    var timeFormat = {
        format : "dd-mm-yyyy"
    };

    $('#tripStarts').datepicker(timeFormat);
    $('#tripEnds').datepicker(timeFormat);
});