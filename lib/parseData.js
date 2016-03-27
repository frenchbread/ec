'use strict';

const moment = require('moment');
const hotels = require('../db').hotels;

module.exports = function (data, callback) {

  var allAccommodations = [];
  var allTransports = [];
  var allRestaurants = [];
  var allExcursions = [];

  var event = data.event;
  var accommodationIds = data.accommodationIds;
  var roomIds = data.roomIds;
  var programIds = data.programIds;
  var serviceIds = data.serviceIds;

  /*  var maxDays = Math.max.apply(Math, programIds);
  var maxServices = Math.max.apply(Math, serviceIds);*/

  var headingInfo = [
    $(event.target['headingName']).val(),
    $(event.target['headingCity']).val(),
    $(event.target['headingStartDate']).val() + ' / ' + $(event.target['headingEndDate']).val(),
    $(event.target['headingPplAmount']).val()
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
      "pricePerRoom": "",
      "roomsAmount": "",
      "extraBed": "",
      "extraBedPrice": "",
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

        var pricesArr = hotel.split('/');

        roomsAmount = parseInt(roomsAmount);

        switch (roomType) {
          case 'single':

            roomTypePrice = parseInt(pricesArr[0]);

          break;
          case 'double':

            roomTypePrice = parseInt(pricesArr[1]);

          break;
          case 'triple':

            roomTypePrice = parseInt(pricesArr[2]);

          break;
        }

        if (extraBed) {

          extraBedPrice = parseInt(pricesArr[3]);
          hasExtraBed = 'Да';

        } else {

          hasExtraBed = 'Нет';
        }

        roomsTotalPrice += (roomTypePrice + extraBedPrice) * roomsAmount;

        allAccommodations.push({
          "hotel": "",
          "dates": "",
          "daysTotal": "",
          "roomType": roomTypeText,
          "pricePerRoom": roomTypePrice,
          "roomsAmount": roomsAmount,
          "extraBed": hasExtraBed,
          "extraBedPrice": extraBedPrice,
          "price": ""
        });

      }
    });

    singleAccommodationPrice = roomsTotalPrice * daysTotal;

    // totalAccommodationsPrice += singleAccommodationPrice;

    allAccommodations.push({
      "hotel": "",
      "dates": "",
      "daysTotal": "",
      "roomType": "",
      "pricePerRoom": "",
      "roomsAmount": "",
      "extraBed": "",
      "extraBedPrice": "",
      "price": singleAccommodationPrice
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

        transferCarTypePrice = parseInt(transferCarTypePrice);
        transferCarsAmount = parseInt(transferCarsAmount);

        if (transferCarsAmount < 1) transferCarsAmount = 1;
        if (transferIsNightMode) discount = 1.5;

        total = transferCarTypePrice * transferCarsAmount * discount;

        isNightMode = (transferIsNightMode) ? 'Да' : 'Нет';

        allTransports.push({
          "service": serviceTypeText,
          "autoType": transferCarType,
          "offerPrice": transferCarTypePrice,
          "offerPriceExtraHours": "-",
          "hours": "-",
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

        if (driverIsNightMode) discount = 1.5;

        var pricePerOffer = parseInt(priceArr[0]);
        var pricePerAdditionalHour = parseInt(priceArr[1]);
        driverHours = parseInt(driverHours);
        driverCarsAmount = parseInt(driverCarsAmount);

        var additonalPrice = 0;

        if (driverCarsAmount < 1) driverCarsAmount = 1;

        if (driverHours > 0) additonalPrice = pricePerAdditionalHour * driverHours;

        total = (pricePerOffer + additonalPrice) * driverCarsAmount * discount;

        isNightMode = (driverIsNightMode) ? 'Да' : 'Нет';

        allTransports.push({
          "service": serviceTypeText,
          "autoType": driverCarType,
          "offerPrice": pricePerOffer,
          "offerPriceExtraHours": pricePerAdditionalHour,
          "hours": driverHours,
          "carsAmount": driverCarsAmount,
          "isNightMode": isNightMode,
          "price": total
        });

      } else if (serviceType === 'excursion') {

        var goingPlaceText = $('#' + $(event.target['goingPlace_'+programId+'_'+serviceId]).attr('id') + ' option:selected').text();
        var goingPlacePrice = $(event.target['goingPlace_'+programId+'_'+serviceId]).val();
        var pplAmount = $(event.target['pplAmount_'+programId+'_'+serviceId]).val();

        goingPlacePrice = parseInt(goingPlacePrice);
        pplAmount = parseInt(pplAmount);

        total = goingPlacePrice * pplAmount;

        allExcursions.push({
          "service": serviceTypeText,
          "goingPlace": goingPlaceText,
          "goingPlacePrice": goingPlacePrice,
          "pplAmount": pplAmount,
          "total": total
        });

      } else if (serviceType === 'restaurant') {

        var restaurantName= $('#' + $(event.target['restaurant_'+programId+'_'+serviceId]).attr('id') + ' option:selected').text();
        var restaurantPrice = $(event.target['restaurant_'+programId+'_'+serviceId]).val();
        var pplAmount = $(event.target['restaurantPeopleAmount_'+programId+'_'+serviceId]).val();

        restaurantPrice = parseInt(restaurantPrice);
        pplAmount = parseInt(pplAmount);

        total = restaurantPrice * pplAmount;

        allRestaurants.push({
          "service": serviceTypeText,
          "restaurant": restaurantName,
          "restaurantPrice": restaurantPrice,
          "pplAmount": pplAmount,
          "total": total
        });

      }

      programTotalPrice += total;

    });

  });

  callback(null, {
    headingInfo: headingInfo,
    allAccommodations: allAccommodations,
    allTransports: allTransports,
    allExcursions: allExcursions,
    allRestaurants: allRestaurants
  });
};
