$(document).ready(function () {

    var ids = [];
    var rooms = $('#rooms');
    var id = $('#rooms>.roomForm').size();

    ids.push(id);

    addRoom = function () {

        id++;

        // TODO: fill up options for room types dynamically
        var form = [
            '<div class="roomForm">' +
                '<div id="roomType" class="form-group">' +
                    '<label for="roomType_'+id+'">Тип комнаты</label><br/>' +
                    '<select id="roomType_'+id+'" name="roomType_'+id+'" class="form-control">' +
                        '<option>Тип комнаты</option>' +
                    '</select>' +
                '</div>' +
                '<div id="roomAmount_'+id+'" class="form-group">' +
                    '<label for="roomsAmount">Кол-во номеров</label><br/>' +
                    '<input id="roomsAmount_'+id+'" type="text" placeholder="Кол-во номеров" name="roomAmount+'+id+'" class="form-control"/>' +
                '</div>' +
                '<div class="form-group" style="padding:2px;padding-top:30px;">' +
                    '<a href="#" class="btn btn-xs btn-danger" onclick="removeRoom('+id+')">x</a>' +
                '</div>' +
            '</div>'
        ].join();

        $(form).appendTo(rooms);

        ids.push(id);

        return false;
    };

    removeRoom  = function (idd) {

        $('#roomType_'+idd).closest('.roomForm').remove();

        var index = ids.indexOf(idd);

        var inList = index > -1;

        if(inList) ids.splice(index, 1);

        return false;
    }

})