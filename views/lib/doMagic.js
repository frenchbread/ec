var hotelsData = require('../data/hotels');

module.exports = function (data) {

  var allAccommodations = [];
  var allTransport = [];
  var allRestaurants = [];

  var event = data.event;
  var accommodationIds = data.accommodationIds;
  var roomIds = data.roomIds;
  var programIds = data.programIds;
  var serviceIds = data.serviceIds;

/*  var maxDays = Math.max.apply(Math, programIds);
  var maxServices = Math.max.apply(Math, serviceIds);*/

  var headingInfo = [
    $(event.target['documentedFor']).val(),
    "",
    $(event.target['tripStarts']).val() + ' / ' + $(event.target['tripEnds']).val(),
    $(event.target['guestsAmount']).val()
  ];

  var totalAccommodationsPrice = 0;
  var programTotalPrice = 0;

  _.each(accommodationIds, function (accommodationId) {

    var hotel = $(event.target['hotel_'+accommodationId]).val();
    var hotelName = $('#' + $(event.target['hotel_'+accommodationId]).attr('id') + ' option:selected').text();
    var moveIn = $(event.target['moveIn_'+accommodationId]).val();
    var moveOut = $(event.target['moveOut_'+accommodationId]).val();

    var daysTotal = 1;

    if (moveIn.length && moveOut.length) {

      var momentMoveIn = moment(moveIn, "DD-MM-YYYY");
      var momentMoveOut = moment(moveOut, "DD-MM-YYYY");

      daysTotal = momentMoveOut.diff(momentMoveIn, 'days');

    }

    var roomsTotalPrice = 0;
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

    _.each(roomIds, function (roomId) {

      if ($(event.target['roomType_'+accommodationId+'_'+roomId]).length) {

        var roomType = $(event.target['roomType_'+accommodationId+'_'+roomId]).val();
        var roomTypeText = $('#' + $(event.target['roomType_'+accommodationId+'_'+roomId]).attr('id') + ' option:selected').text();
        var roomsAmount = $(event.target['roomsAmount_'+accommodationId+'_'+roomId]).val();
        var extraBed = $(event.target['extraBed_'+accommodationId+'_'+roomId]).is(':checked');

        var roomTypePrice = 0;
        var extraBedPrice = 0;

        var hasExtraBed = '';

        _.each(hotelsData, function (hotelData) {

          if (hotelData.codeName === hotel) {

            roomTypePrice = hotelData.roomType[roomType].rub;

            if (extraBed) {

              extraBedPrice = hotelData.extraBed.rub;
              hasExtraBed = 'Да';
            } else {
              hasExtraBed = 'Нет';
            }
          }
        });

        roomsTotalPrice += (roomTypePrice + extraBedPrice) * roomsAmount;

        allAccommodations.push({
          "hotel": "",
          "dates": "",
          "daysTotal": "",
          "roomType": roomTypeText + ' (' + roomTypePrice + 'р.)',
          "roomsAmount": roomsAmount,
          "extraBed": hasExtraBed + ' (' + extraBedPrice + 'р.)',
          "price": ""
        });

      }
    });

    singleAccommodationPrice = roomsTotalPrice * daysTotal;

    totalAccommodationsPrice += singleAccommodationPrice;

    allAccommodations.push({
      "hotel": "",
      "dates": "",
      "daysTotal": "",
      "roomType": "",
      "roomsAmount": "",
      "extraBed": "",
      "price": totalAccommodationsPrice
    });

  });

  _.each(programIds, function (programId) {

    _.each(serviceIds, function (serviceId) {

      var serviceType = $(event.target['service_serviceType_' + programId + '_' +serviceId]).val();
      var serviceTypeText = $('#' +  $(event.target['service_serviceType_' + programId + '_' +serviceId]).attr('id') + ' option:selected').text();

      var total, isNightMode;
      var discount = 1;

      if (serviceType === 'transfer') {

        var transferCarTypePrice = $(event.target['transferCarType_' + programId + '_' + serviceId]).val();
        var transferCarType = $('#' + $(event.target['transferCarType_' + programId + '_' + serviceId]).attr('id') + ' option:selected').text();
        var transferHours = $(event.target['transferHours_' + programId + '_' + serviceId]).val();
        var transferCarsAmount = $(event.target['transferCarsAmount_' + programId + '_' + serviceId]).val();
        var transferIsNightMode = $(event.target['transferNightMode_' + programId + '_' + serviceId]).is(':checked');

        if (transferCarsAmount < 1) transferCarsAmount = 1;
        if (transferHours < 1) transferHours = 1;

        if (transferIsNightMode) discount = 1.5;

        total = transferCarTypePrice * transferCarsAmount * transferHours * discount;

        isNightMode = (transferIsNightMode) ? 'Да' : 'Нет';

        allTransport.push({
          "service": serviceTypeText,
          "autoType": transferCarType,
          "hours": transferHours,
          "carsAmount": transferCarsAmount,
          "isNightMode": isNightMode,
          "price": total
        });

      } else if (serviceType === 'driver') {


        var driverCarTypePrice = $(event.target['driverCarType_' + programId + '_' + serviceId]).val();
        var driverCarType = $('#' + $(event.target['driverCarType_' + programId + '_' + serviceId]).attr('id') + ' option:selected').text();
        var driverHours = $(event.target['driverHours_' + programId + '_' + serviceId]).val();
        var driverCarsAmount = $(event.target['driverCarsAmount_' + programId + '_' + serviceId]).val();
        var driverIsNightMode = $(event.target['driverNightMode_' + programId + '_' + serviceId]).is(':checked');

        var priceArr = driverCarTypePrice.split('/');

        if (driverCarsAmount < 1) driverCarsAmount = 1;
        if (driverHours < 1) driverHours = 1;

        if (driverIsNightMode) discount = 1.5;

        total = (parseInt(priceArr[0]) + parseInt(priceArr[1]) * driverHours) * driverCarsAmount * discount;

        isNightMode = (driverIsNightMode) ? 'Да' : 'Нет';

        allTransport.push({
          "service": serviceTypeText,
          "autoType": driverCarType,
          "hours": driverHours,
          "carsAmount": driverCarsAmount,
          "isNightMode": isNightMode,
          "price": total
        });
      } else if (serviceType === 'restaurant') {

        var restaurantName= $('#' + $(event.target['restaurant_'+programId+'_'+serviceId]).attr('id') + ' option:selected').text();
        var restaurantPrice = $(event.targer['restaurant_'+programId+'_'+serviceId]).val();
        var pplAmount = $(event.target['restaurantPeopleAmount_'+programId+'_'+serviceId]).val();

        total = restaurant * pplAmount;

        allRestaurants.push({
          "service": serviceTypeText,
          "restaurant": restaurantName,
          "pplAmount": pplAmount,
          "total": total
        });

      }

      programTotalPrice += total;

    });

  });

  return {
    headingInfo: headingInfo,
    allAccommodations: allAccommodations,
    allTransport: allTransport,
    allRestaurants: allRestaurants
  }
};
