$(document).ready(function () {

    var roomIds = [];
    var rooms   = $('#rooms');
    var roomId  = $('#rooms>.roomForm').size();

    var accommodationIds    = [];
    var accommodations      = $('#accommodations');
    var accommodationId     = $('#accommodations>.accommodationForm').size();

    roomIds.push(roomId);
    accommodationIds.push(accommodationId);

    addRoom = function () {

        roomId++;

        // TODO: fill up options for room types dynamically
        var form = [
            '<div class="roomForm">' +
                '<div id="roomType_"'+roomId+' class="form-group">' +
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

        $(form).appendTo(rooms);
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

        var form = '<div class="alert-danger row accommodationForm"><div id="accommodationField_'+accommodationId+'">Hello</div> '+ accommodationId +' <a href="#" class="btn btn-xs btn-danger" onclick="removeAccommodation('+accommodationId+')">x</a></div>';

        $(form).appendTo(accommodations);
        accommodationIds.push(accommodationId);

        return false;
    };

    removeAccommodation = function (accommodationIdd) {

        $('#accommodationField_'+accommodationIdd).closest('.accommodationForm').remove();

        var index   = accommodationIds.indexOf(accommodationIdd);
        var inList  = index > -1;
        if (inList) accommodationIds.splice(index, 1);

        return false;
    };

});