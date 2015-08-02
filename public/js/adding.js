$(document).ready(function () {

    var roomIds = [];
    var rooms   = $('#rooms');
    var roomId  = $('#rooms>.roomForm').size();

    var accommodationIds    = [];
    var accommodations      = $('#accommodations');
    var accommodationId     = $('#accommodations>.accommodationForm').size();

    roomIds.push(roomId);
    accommodationIds.push(accommodationId);

    addRoom = function (accId) {

        roomId++;

        // TODO: fill up options for room types dynamically
        var form = [
            '<div class="roomForm" id="roomForm_'+roomId+'">' +
                '<div id="roomType_'+roomId+'" class="form-group">' +
                    '<label for="roomType_'+roomId+'">Тип комнаты</label><br/>' +
                    '<select id="roomType_'+roomId+'" name="roomType_'+roomId+'" class="form-control">' +
                        '<option>Тип комнаты</option>' +
                    '</select>' +
                '</div>' +
                '<div id="roomAmount_'+roomId+'" class="form-group">' +
                    '<label for="roomsAmount">Кол-во номеров</label><br/>' +
                    '<input id="roomsAmount_'+roomId+'" type="text" placeholder="Кол-во номеров" name="roomAmount+'+roomId+'" class="form-control"/>' +
                '</div>' +
                '<div class="form-group" style="padding:2px;padding-top:30px;">' +
                    '<a href="#" class="btn btn-xs btn-danger" onclick="removeRoom('+roomId+')">x</a>' +
                '</div>' +
            '</div>'
        ].join();

        $(form).appendTo($('#accommodationForm_'+accId+' #rooms'));
        roomIds.push(roomId);

        return false;
    };

    removeRoom  = function (RoomIdd) {

        $('#roomType_'+RoomIdd).closest('.roomForm').remove();
        var index   = roomIds.indexOf(RoomIdd);
        var inList  = index > -1;
        if (inList) roomIds.splice(index, 1);

        return false;
    };

    addAccommodation = function () {

        accommodationId++;

        //var form = '<div class="alert-danger row accommodationForm"><div id="accommodationField_'+accommodationId+'">Hello</div> '+ accommodationId +' <a href="#" class="btn btn-xs btn-danger" onclick="removeAccommodation('+accommodationId+')">x</a></div>';


        var col1 = [
            '<div class="form-group">' +
                '<label for="city">Город</label>' +
                '<br/>' +
                '<select id="city" class="form-control">' +
                    '<option>Город</option>' +
                    '<option value="spb">Санкт-Петербург</option>' +
                    '<option value="msk">Москва</option>' +
                '</select>' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="hotel">Гостиница</label>' +
                '<br/>' +
                '<input id="hotel" type="text" placeholder="Гостиница" class="form-control"/>' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="hotelStart">Дата заселения</label>' +
                '<br/>' +
                '<input id="hotelStarts" type="text" placeholder="Дата заселения" class="form-control"/>' +
            '</div>' +
            '<div class="form-group">' +
                '<label for="hotelEnds">Дата выезда</label>' +
                '<br/>' +
                '<input id="hotelEnds" type="text" placeholder="Дата выезда" class="form-control"/>' +
            '</div>'
        ].join();

        var col2 = [
            '<div id="rooms">' +
                '<div class="roomForm">' +
                    '<div id="roomType" class="form-group">' +
                        '<label for="roomType">Тип комнаты</label>' +
                        '<br/>' +
                        '<select id="roomType" name="roomType" class="form-control">' +
                            '<option>Тип комнаты</option>' +
                        '</select>' +
                    '</div>' +
                    '<div id="roomAmount" class="form-group">' +
                        '<label for="roomsAmount">Кол-во номеров</label>' +
                        '<br/>' +
                        '<input id="roomsAmount" type="text" placeholder="Кол-во номеров" name="roomAmount" class="form-control"/>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<a id="addRoom" onclick="addRoom('+accommodationId+')" class="btn btn-xs btn-primary">+ Добавить тип комнаты</a>'
        ].join();

        var form = [
            '<div class="row accommodationForm" id="accommodationForm_'+accommodationId+'">' +
                '<hr />' +
                '<div class="col-md-8">' +
                    col1 +
                '</div>' +
                '<div class="col-md-4">' +
                    col2 +
                '</div>' +
                '<a href="#" class="btn btn-xs btn-danger" onclick="removeAccommodation('+accommodationId+')">x Убрать вариант проживания</a>' +
            '</div>'
        ].join();

        $(form).appendTo(accommodations);
        accommodationIds.push(accommodationId);

        return false;
    };

    removeAccommodation = function (accommodationIdd) {

        $('#accommodationForm_'+accommodationIdd).remove();

        var index   = accommodationIds.indexOf(accommodationIdd);
        var inList  = index > -1;
        if (inList) accommodationIds.splice(index, 1);

        return false;
    };

});