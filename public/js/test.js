$(document).ready(function () {

    var accommodationForm = [
        '<div class="row accommodationForm">' +
            '<div class="col-md-8 placeForCol1">' +
            '</div>' +
            '<div class="col-md-4">' +
                '<div id="rooms"></div>' +
                '<hr/>' +
                '<a id="addRoom" class="btn btn-xs btn-primary">+ Добавить тип комнаты</a>' +
            '</div>' +
            '<div class="col-lg-12">' +
                '<hr/>' +
                '<a href="#" class="btn btn-xs btn-danger removeAcc">x Убрать вариант проживания</a>' +
            '</div>' +
        '</div>'
    ].join();

    var col1 = [
        '<div class="form-group">' +
            '<label>Город</label>' +
            '<br/>' +
            '<select class="form-control city">' +
            '</select>' +
        '</div>' +
        '<div class="form-group">' +
            '<label>Гостиница</label>' +
            '<br/>' +
            '<select class="form-control hotel">' +
            '</select>' +
        '</div>' +
        '<div class="form-group">' +
            '<label >Дата заселения</label>' +
            '<br/>' +
            '<input type="text" placeholder="dd-mm-yyyy" class="form-control moveIn"/>' +
        '</div>' +
        '<div class="form-group">' +
            '<label>Дата выезда</label>' +
            '<br/>' +
            '<input type="text" placeholder="dd-mm-yyyy" class="form-control moveOut"/>' +
        '</div>'
    ].join();

    var labelAcc    = 'accommodation';
    var labelRoom   = 'room';

    var accIds = [];
    var accId = $('#playground>.accommodationForm').size();

    addAcc = function () {

        accId++;

        var city;
        var hotel;
        var moveIn;
        var moveOut;

        city        = labelAcc + "_city_" + accId;
        hotel       = labelAcc + "_hotel_" + accId;
        moveIn      = labelAcc + "_moveIn_" + accId;
        moveOut     = labelAcc + "_moveOut_" + accId;

        // accommodation
        var form = $(accommodationForm);
        var col  = $(col1);

        form.attr('id', 'accommodationForm_'+accId);

        $('.city', col).attr('id', city);
        $('.hotel', col).attr('id', hotel);
        $('.moveIn', col).attr('id', moveIn).datepicker({format : "dd-mm-yyyy"});
        $('.moveOut', col).attr('id', moveOut).datepicker({format : "dd-mm-yyyy"});

        $('.removeAcc', form).attr('onclick', 'removeAcc('+accId+');');

        // drop-down lists init
        var cities = $('#cities').html();
        var hotels = $('#hotels').html();

        // lists into fields
        $('.city', col).html(cities);
        $('.hotel', col).html(hotels);

        // fields into form
        $('.placeForCol1', form).html(col);

        // publish
        $('#playground').append(form);

        accIds.push(accId);

        console.log(accIds);

        return false;
    };

    removeAcc = function(accId) {

        $('#accommodationForm_'+accId).remove();

        var index   = accIds.indexOf(accId);
        var inList  = index > -1;
        if (inList) accIds.splice(index, 1);

        console.log(accIds);

        return false;
    }

});