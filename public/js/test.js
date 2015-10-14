$(document).ready(function () {

    var accommodationForm = [
        '<div class="row accommodationForm">' +
            '<div class="col-md-8 placeForCol1">' +
            '</div>' +
            '<div class="col-md-4">' +
                '<div id="rooms"></div>' +
                '<hr/>' +
                '<a class="btn btn-xs btn-primary addRoom">+ Добавить тип комнаты</a>' +
            '</div>' +
            '<div class="col-lg-12">' +
                '<hr/>' +
                '<a class="btn btn-xs btn-danger removeAcc">x Убрать вариант проживания</a>' +
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

    var room = [
        '<div class="roomForm" >' +
            '<div class="form-group">' +
                '<label>Тип комнаты</label><br/>' +
                '<select class="form-control roomType">' +
                '</select>' +
            '</div>' +
            '<div class="form-group">' +
                '<label>Кол-во номеров</label><br/>' +
                '<input type="text" placeholder="Кол-во номеров" class="form-control roomsAmount"/>' +
            '</div>' +
            '<div class="form-group" style="padding:2px;padding-top:30px;">' +
                '<a class="btn btn-xs btn-danger removeRoom">x</a>' +
            '</div>' +
        '</div>'
    ].join();


    var labelAcc    = 'accommodation';
    var labelRoom   = 'room';

    var accIds = [];
    var accId = $('#playground>.accommodationForm').size();

    var roomIds = [];
    var roomId  = $('#rooms>.roomForm').size();

    addAcc = function () {

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

        $('.city', col).attr({
            'id': city,
            'name': city
        });

        $('.hotel', col).attr({
            'id': hotel,
            'name': hotel
        });

        $('.moveIn', col).attr({
            'id': moveIn,
            'name': moveIn
        }).datepicker({format : "dd-mm-yyyy"});

        $('.moveOut', col).attr({
            'id': moveOut,
            'name': moveOut
        }).datepicker({format : "dd-mm-yyyy"});

        $('.addRoom', form).attr('onclick', 'addRoom('+accId+');');

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

        accId++;

        return false;
    };

    removeAcc = function(accId) {

        $('#accommodationForm_'+accId).remove();

        var index   = accIds.indexOf(accId);
        var inList  = index > -1;
        if (inList) accIds.splice(index, 1);

        return false;
    };

    addRoom = function(accId) {

        var rm = $(room);

        var roomType;
        var roomsAmount;

        roomType    = labelRoom + "_roomType_" + accId + "_" +roomId;

        roomsAmount = labelRoom + "_roomAmount_" + accId + "_" + roomId ;
        var roomList = $('#roomList').html();

        $('.roomType', rm).html(roomList);
        rm.attr('id', 'roomForm_'+roomId);

        $('.roomType', rm).attr({
            'id': roomType,
            'name': roomType
        });

        $('.roomsAmount', rm).attr({
            'id': roomsAmount,
            'name': roomsAmount
        });
        $('.removeRoom', rm).attr('onlick', 'removeRoom('+accId+', '+roomId+');');


        $('#rooms', '#accommodationForm_'+accId).append(rm);

        roomIds.push(roomId);

        console.log(roomIds);

        roomId++;

        return false;
    };

    removeRoom = function (accId, roomId) {


        $('#'+labelRoom+'_roomType_'+accId+'_'+roomId).closest('.roomForm').remove();
        var index   = roomIds.indexOf(roomId);
        var inList  = index > -1;
        if (inList) roomIds.splice(index, 1);

        console.log(roomIds);

        return false;

    };

});