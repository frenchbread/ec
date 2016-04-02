'use strict';

const moment = require('moment');
const hotelRates = require('../../db').hotelRates;

module.exports = function (data, callback) {

  const event = data.event;
  const accommodationIds = data.accommodationIds;
  const roomIds = data.roomIds;

  hotelRates.loadDatabase((err) => {

    if (err) console.log(err);

    hotelRates.find({}, (err, rates) => {

      if (err) console.log(err);

      let allAccommodations = [];

      _.each(accommodationIds, function (accommodationId) {

        const hotel = $(event.target['hotel_'+accommodationId]).val();
        const hotelName = $('#' + $(event.target['hotel_'+accommodationId]).attr('id') + ' option:selected').text();
        const moveIn = $(event.target['moveIn_'+accommodationId]).val();
        const moveOut = $(event.target['moveOut_'+accommodationId]).val();

        let daysTotal = 1, momentMoveIn, momentMoveOut;

        if (moveIn.length && moveOut.length) {

          momentMoveIn = moment(moveIn, "DD.MM.YYYY");
          momentMoveOut = moment(moveOut, "DD.MM.YYYY");

          daysTotal = momentMoveOut.diff(momentMoveIn, 'days');
        }

        var singleAccommodationPrice = 0;

        allAccommodations.push({
          "hotel": hotelName,
          "dates": moveIn + ' / ' + moveOut,
          "daysTotal": daysTotal,
          "roomType": "",
          "roomsAmount": "",
          "extraBed": "",
          "price": ""
        });

        _.each(roomIds, (roomId) => {

          if ($(event.target['roomType_'+accommodationId+'_'+roomId]).length) {

            const roomType = $(event.target['roomType_'+accommodationId+'_'+roomId]).val();
            const roomTypeText = $('#' + $(event.target['roomType_'+accommodationId+'_'+roomId]).attr('id') + ' option:selected').text();
            const roomsCount = parseInt($(event.target['roomsAmount_'+accommodationId+'_'+roomId]).val());
            const extraBed = $(event.target['extraBed_'+accommodationId+'_'+roomId]).is(':checked');

            let ittr = momentMoveIn;

            let hasExtraBed = 'Нет';
            let pricePerRoom = 0;
            let extraBedPrice = 0;

            for (let i = 0; i < daysTotal; i++) {

              _.each(rates, (rate) => {

                let start = ittr.toDate();
                let end = ittr.toDate();

                if (((start >= rate.start) && (start <= rate.end)) || ((end >= rate.start) && (end <= rate.end))) {

                  switch (roomType) {
                    case 'single':
                      pricePerRoom = parseInt(rate.single);
                    break;
                    case 'double':
                      pricePerRoom = parseInt(rate.double);
                    break;
                    case 'triple':
                      pricePerRoom = parseInt(rate.triple);
                    break;
                  }

                  if (extraBed) {
                    extraBedPrice = parseInt(rate.extraBed);
                    hasExtraBed = 'Да';
                  }

                  singleAccommodationPrice += (pricePerRoom + extraBedPrice) * parseInt(roomsCount);
                }

              });

              ittr = momentMoveIn.add(1, 'days');
            }

            allAccommodations.push({
              "hotel": "",
              "dates": "",
              "daysTotal": "",
              "roomType": roomTypeText,
              "roomsAmount": roomsCount,
              "extraBed": hasExtraBed,
              "price": ""
            });
          }
        });

        allAccommodations.push({
         "hotel": "",
         "dates": "",
         "daysTotal": "",
         "roomType": "",
         "roomsAmount": "",
         "extraBed": "",
         "price": singleAccommodationPrice
       });
      });

      // callback
      callback(null, allAccommodations);
    });
  });
}
