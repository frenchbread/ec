module.exports = function (data) {

    var accommodations = [];

    for (var i = 0; i <= 10; i++) {

        var city = "accommodation_city_" + i;
        var hotel = "accommodation_hotel_" + i;
        var moveIn = "accommodation_moveIn_" + i;
        var moveOut = "accommodation_moveOut_" + i;

        var rooms = [];

        for (var j = 0; j <= 20; j++) {

            var roomType    = "room_roomType_"+i+"_"+j;
            var roomAmount   = "room_roomAmount_"+i+"_"+j;

            if (data.hasOwnProperty(roomType) || data.hasOwnProperty(roomAmount)) {

                rooms.push({
                    type: data[roomType],
                    amount: data[roomAmount]
                });

            }
        }

        if (data.hasOwnProperty(city) || data.hasOwnProperty(hotel) || data.hasOwnProperty(moveIn) || data.hasOwnProperty(moveOut)) {

            accommodations.push({
                city: data[city],
                hotel: data[hotel],
                moveIn: data[moveIn],
                moveOut: data[moveOut],
                rooms: rooms
            });

        }

    }

    return accommodations;
};