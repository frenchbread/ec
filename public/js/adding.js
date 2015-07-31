$(document).ready(function () {
    var rooms = $('#rooms');
    var id = $('#rooms>.roomForm').size();

    var ids = [];

    ids.push(id);


    addRoom = function () {

        id++;

        var form = [
            '<div class="roomForm">' +
                '№' + id +
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
                '<div>' +
                    '<a href="#" onclick="removeRoom('+id+')">Remove</a>' +
                '</div>' +
            '</div>'
        ].join();

        $(form).appendTo(rooms);

        ids.push(id);

        console.log(ids);

        return false;
    };

    removeRoom  = function (idd) {

        $('#roomType_'+idd).closest('.roomForm').remove();

        var index = ids.indexOf(idd);

        var inList = index > -1;
        console.log(index);

        if(inList) ids.splice(index, 1);

        console.log(ids)

        return false;
    }

})