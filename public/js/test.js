$(document).ready(function () {

    // Accommodations

    var labelAcc = 'accommodation';

    var accIds = [];
    var accId = $('#accommodations>.accommodationForm').size();

    var accommodationForm = [
        '<div class="row accommodationForm">' +
            '<div class="col-md-12">' +
                '<h3>Отель' +
                    '<a class="btn btn-xs btn-danger removeAcc pull-right">x Убрать отель</a>' +
                '</h3>' +
                '<div id="hotelInfo"></div>' +
            '</div>' +
            '<div class="col-md-12">' +
                '<h3>Комнаты</h3>' +
                '<div id="rooms"></div>' +
                '<hr/>' +
                '<a class="btn btn-xs btn-primary addRoom">+ Добавить тип комнаты</a>' +
            '</div>' +
        '</div>'
    ].join();

    var col1 = [
        '<div class="form-group">' +
            '<label>Город</label>' +
            '<br/>' +
            '<select class="form-control city input-sm">' +
            '</select>' +
        '</div>' +
        '<div class="form-group">' +
            '<label>Гостиница</label>' +
            '<br/>' +
            '<select class="form-control hotel input-sm">' +
            '</select>' +
        '</div>' +
        '<div class="form-group">' +
            '<label >Дата заселения</label>' +
            '<br/>' +
            '<input type="text" placeholder="dd-mm-yyyy" class="form-control moveIn input-sm"/>' +
        '</div>' +
        '<div class="form-group">' +
            '<label>Дата выезда</label>' +
            '<br/>' +
            '<input type="text" placeholder="dd-mm-yyyy" class="form-control moveOut input-sm"/>' +
        '</div>'
    ].join();

    // Rooms

    var labelRoom   = 'room';

    var roomIds = [];
    var roomId  = $('#rooms>.roomForm').size();

    var room = [
        '<div class="roomForm" >' +
        '<div class="form-group">' +
        '<label>Тип комнаты</label><br/>' +
        '<select class="form-control roomType input-sm">' +
        '</select>' +
        '</div>' +
        '<div class="form-group">' +
        '<label>Кол-во номеров</label><br/>' +
        '<input type="number" class="form-control roomsAmount input-sm"/>' +
        '</div>' +
        '<div class="form-group" style="padding:2px;padding-top:30px;">' +
        '<a class="btn btn-xs btn-danger removeRoom">x</a>' +
        '</div>' +
        '</div>'
    ].join();

    // Program

    var labelProgram = 'program';

    var programIds = [];
    var programId = $('#programs>.programForm').size();

    var programForm = [
        '<div class="row programForm">' +
            '<div class="col-md-12">' +
                '<h3>День <b id="programNum"></b>' +
                    '<a class="btn btn-xs btn-danger removeProgram pull-right">x Убрать день</a>' +
                '</h3>' +
                '<div id="programInfo">' +
                '</div>' +
            '</div>' +
        '</div>'
    ].join();

    var col2 = [
        '<div class="">' +
            '<hr/>' +
            '<label>Город</label>' +
            '<br/>' +
            '<select class="form-control cityProgram input-sm">' +
            '</select>' +
            '<hr/>' +
        '</div>' +
        '<h4>Трансфер</h4>' +
        '<div class="form-group">' +
            '<label>Класс авто</label>' +
            '<br/>' +
            '<select class="form-control transferAuto input-sm">' +
            '</select>' +
        '</div>' +
        '<div class="form-group">' +
            '<label >Откуда</label>' +
            '<br/>' +
            '<input type="text" class="form-control transferFrom input-sm"/>' +
        '</div>' +
        '<div class="form-group">' +
            '<label>Куда</label>' +
            '<br/>' +
            '<input type="text" class="form-control transferTo input-sm"/>' +
        '</div>' +

        '<h4>Аренда с водителем</h4>' +
        '<div class="form-group">' +
            '<label>Класс авто</label>' +
            '<br/>' +
            '<select class="form-control withDriverAuto input-sm">' +
            '</select>' +
        '</div>' +
        '<div class="form-group">' +
            '<label >С</label>' +
            '<br/>' +
            '<input type="text" class="form-control withDriverStart input-sm"/>' +
        '</div>' +
        '<div class="form-group">' +
            '<label>До</label>' +
            '<br/>' +
            '<input type="text" class="form-control withDriverEnd input-sm"/>' +
        '</div>' +

        '<h4>Экскурсия</h4>' +
        '<div class="form-group">' +
            '<label>Куда</label>' +
            '<br/>' +
            '<input type="text" class="form-control excursionTo input-sm" />' +
            '</select>' +
        '</div>' +
        '<div class="form-group">' +
            '<label >Кол-во человек</label>' +
            '<br/>' +
            '<input type="number" class="form-control excursionPeopleAmount input-sm"/>' +
        '</div>' +

        '<h4>Питание</h4>' +
            '<div class="form-group">' +
            '<label>Ресторан</label>' +
            '<br/>' +
            '<input type="text" class="form-control foodRestaurant input-sm" />' +
        '</div>' +
        '<div class="form-group">' +
            '<label >Название меню</label>' +
            '<br/>' +
            '<input type="text" class="form-control foodMenu input-sm"/>' +
        '</div>'
    ].join();

    var example = [
        {
            city: "",
            hotel: "",
            moveIn: moment,
            moveOut: moment(),
            rooms: [
                {
                    type: "",
                    amount: 0,
                    prisePerOne: 0,
                    prisePerAll: 0
                }
            ],
            prisePerDay: 0,
            priseTotal: 0
        }
    ];

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
        $('#hotelInfo', form).html(col);

        // publish
        $('#accommodations').append(form);

        accIds.push(accId);

        accId++;

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
        $('.removeRoom', rm).attr('onclick', 'removeRoom('+accId+', '+roomId+');');


        $('#rooms', '#accommodationForm_'+accId).append(rm);

        roomIds.push(roomId);

        roomId++;

        return false;
    };

    addProgram = function () {

        var cityProgram = labelProgram + "_cityProgram_" + programId;

        var transferAuto = labelProgram + "_transferAuto_" + programId;
        var transferFrom = labelProgram + "_transferFrom_" + programId;
        var transferTo = labelProgram + "_transferTo_" + programId;

        var withDriverAuto = labelProgram + "_withDriverAuto_" + programId;
        var withDriverStart = labelProgram + "_withDriverStart_" + programId;
        var withDriverEnd = labelProgram + "_withDriverEnd_" + programId;

        var excursionTo = labelProgram + "_excursionTo_" + programId;
        var excursionPeopleAmount = labelProgram + "_excursionPeopleAmount_" + programId;

        var foodRestaurant = labelProgram + "_foodRestaurant_" + programId;
        var foodMenu = labelProgram + "_foodMenu_" + programId;

        var form = $(programForm);
        var col = $(col2);

        form.attr('id', 'programForm_'+programId);

        // city
        $('.cityProgram', col).attr({
            'id': cityProgram,
            'name': cityProgram
        });

        // transfer
        $('.transferAuto', col).attr({
            'id': transferAuto,
            'name': transferAuto
        });

        $('.transferFrom', col).attr({
            'id': transferFrom,
            'name': transferFrom
        });

        $('.transferTo', col).attr({
            'id': transferTo,
            'name': transferTo
        });

        // with driver
        $('.withDriverAuto', col).attr({
            'id': withDriverAuto,
            'name': withDriverAuto
        });

        $('.withDriverStart', col).attr({
            'id': withDriverStart,
            'name': withDriverStart
        }).datepicker({format : "dd-mm-yyyy"});

        $('.withDriverEnd', col).attr({
            'id': withDriverEnd,
            'name': withDriverEnd
        }).datepicker({format : "dd-mm-yyyy"});

        // excursion
        $('.excursionTo', col).attr({
            'id': excursionTo,
            'name': excursionTo
        });

        $('.excursionPeopleAmount', col).attr({
            'id': excursionPeopleAmount,
            'name': excursionPeopleAmount
        });

        // food
        $('.foodRestaurant', col).attr({
            'id': foodRestaurant,
            'name': foodRestaurant
        });

        $('.foodMenu', col).attr({
            'id': foodMenu,
            'name': foodMenu
        });

        $('.removeProgram', form).attr('onclick', 'removeProgram('+programId+');');


        var cities = $('#cities').html();
        var cars = $('#cars').html();

        $('.cityProgram', col).html(cities);

        $('.transferAuto', col).html(cars);
        $('.withDriverAuto', col).html(cars);

        $('#programInfo', form).html(col);

        $('#programNum', form).text(programId);

        $('#programs').append(form);

        programIds.push(accId);

        programId++;

        return false;

    };

    removeAcc = function(accId) {

        $('#accommodationForm_'+accId).remove();

        var index   = accIds.indexOf(accId);
        var inList  = index > -1;
        if (inList) accIds.splice(index, 1);

        return false;
    };

    removeRoom = function (accId, roomId) {


        $('#'+labelRoom+'_roomType_'+accId+'_'+roomId).closest('.roomForm').remove();
        var index   = roomIds.indexOf(roomId);
        var inList  = index > -1;
        if (inList) roomIds.splice(index, 1);

        return false;

    };

    removeProgram = function(programId) {

        $('#programForm_'+programId).remove();

        var index   = programIds.indexOf(programId);
        var inList  = index > -1;
        if (inList) programIds.splice(index, 1);

        return false;
    };

    preview = function () {

        var data = parseStuff();

        $.getJSON('/api/hotels', function (prises) {

            var completeData = countStuff(data, prises);

            $('#myModal').modal('show');
            $('#checkoutData').html(renderStuff(completeData));
        });
    };

    checkout = function () {

        $.ajax({
            url: "/test",
            type: "POST",
            dataType: "json",
            data: JSON.stringify(completeData),
            contentType: "application/json",
            cache: false,
            timeout: 5000,
            complete: function() {
                //called when complete
                console.log('process complete');
            },

            success: function(data) {
                console.log('process sucess');

            },

            error: function(err) {
                console.log('process error');
                console.log(err);
            }
        });
    };

    function parseStuff () {

        var accs = [];

        var docFor = $('#documentFor').val();
        var tripStarts = $('#tripStarts').val();
        var tripEnds = $('#tripEnds').val();
        var guestsCount = $('#guestsCount').val();

        accIds.forEach(function (aid) {

            var city        = $("#" + labelAcc + "_city_" + aid);
            var hotel       = $("#" + labelAcc + "_hotel_" + aid);
            var moveIn      = $("#" + labelAcc + "_moveIn_" + aid);
            var moveOut     = $("#" + labelAcc + "_moveOut_" + aid);

            var momentIn, momentOut;

            // checks if acc has such fuekd and creates moment date obj
            if (moveIn.length) momentIn = moment(moveIn.val(), "DD-MM-YYYY");

            if (moveOut.length) momentOut = moment(moveOut.val(), "DD-MM-YYYY");

            var daysWithinAcc = momentOut.diff(momentIn, 'days');

            var rooms = [];

            roomIds.forEach(function (rid) {

                var roomType    = $("#" + labelRoom + "_roomType_" + aid + "_" + rid);
                var roomsAmount = $("#" + labelRoom + "_roomAmount_" + aid + "_" + rid);

                if (roomType.length || roomsAmount.length) {

                    rooms.push({
                        type: roomType.val(),
                        amount: roomsAmount.val()
                    });
                }
            });

            accs.push({
                city: city.val(),
                hotel: hotel.val(),
                days: daysWithinAcc,
                moveIn: moveIn.val(),
                moveOut: moveOut.val(),
                rooms: rooms
            });

        });

        return {
            documentFor : docFor,
            tripStarts : tripStarts,
            tripEnds : tripEnds,
            guestsCount : guestsCount,
            totalPriseForAccs : 0,
            accs : accs
        };
    }

    function countStuff (data, prises) {

        var accs = data.accs;

        var priseTotal = 0;

        accs.forEach(function (acc) {

            var prisePerRoomPerDay = 0;
            var prisePerAllRoomsPerDay = 0;
            var prisePerDay = 0;
            var prisePerAcc = 0;


            acc.rooms.forEach(function (r) {

                prises.forEach(function (pr) {

                    if (pr.hotelCodename == acc.hotel) {

                        console.log(pr);

                        // prise per day for current toomType and hotel
                        prisePerRoomPerDay = pr.roomType[r.type].eur;

                        acc.displayName = pr.hotelName;
                    }
                });

                // prise per all days within room
                prisePerAllRoomsPerDay = r.amount * prisePerRoomPerDay;

                // prise per all rooms per one day
                prisePerDay += prisePerAllRoomsPerDay;

                r.prisePerRoomPerDay = prisePerRoomPerDay;
                r.prisePerAllRoomsPerDay = prisePerAllRoomsPerDay;
            });

            prisePerAcc = prisePerDay * acc.days;
            priseTotal += prisePerAcc;

            acc.prisePerDay = prisePerDay;
            acc.prisePerAcc = prisePerAcc;

        });

        data.accs = accs;
        data.totalPriseForAccs = priseTotal;

        console.log(data);

        return data;
    }

    function renderStuff (trip) {

        var t = "";

        for (var i=0; i<trip.accs.length; i++) {

            var num = i+1;

            t += [
                '<tr class="info">' +
                    '<th scope="row">'+num+'</th>'+
                    '<td>' +
                        trip.accs[i].displayName +
                    '</td>'+
                    '<td>' +
                        trip.accs[i].days +
                    '</td>'+
                    '<td></td>'+
                    '<td></td>'+
                    '<td></td>'+
                '</tr>'
            ].join();

            for (var j=0; j<trip.accs[i].rooms.length; j++) {

                t += [
                    '<tr>' +
                        '<th scope="row"></th>'+
                        '<td></td>'+
                        '<td></td>'+
                        '<td>' +
                            trip.accs[i].rooms[j].type +
                        '</td>'+
                        '<td>' +
                            trip.accs[i].rooms[j].amount +
                        '</td>'+
                        '<td>' +
                            trip.accs[i].rooms[j].prisePerAllRoomsPerDay +
                        '</td>'+
                    '</tr>'
                ].join();

            }

        }



        var q = [
            '<p>' +
                'Для: ' + trip.documentFor +
            '<p>' +
            '<p>' +
                'Начало: ' + trip.tripStarts +
            '<p>' +
            '<p>' +
                'Конец: ' + trip.tripEnds +
            '<p>' +
            '<p>' +
                'Кол-во человек: ' + trip.guestsCount +
            '<p>' +
            '<table class="table table-bordered table-hover">' +
                '<thead>' +
                    '<tr>' +
                        '<th>#</th>' +
                        '<th>Отель</th>' +
                        '<th>Кол-во ночей</th>' +
                        '<th>Тип комнаты</th>' +
                        '<th>Кол-во комнат</th>' +
                        '<th>Стоимость</th>' +
                    '</tr>' +
                '</thead>' +
                '<tbody>' +
                    t +
                '</tbody>' +
            '</table>' +
            '<hr/>' +
            '<p>' +
                'Итого:' +
                '<b class="pull-right">' +
                    trip.totalPriseForAccs +
                '</b>' +
            '</p>'
        ];

        return q;
    }
});
