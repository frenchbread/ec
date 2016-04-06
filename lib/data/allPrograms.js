
module.exports = (data, err) => {

  let event = data.event;
  let programIds = data.programIds;
  let serviceIds = data.serviceIds;

  let allTransports = [];
  let allRestaurants = [];
  let allExcursions = [];

  _.each(programIds, (programId) => {

    _.each(serviceIds, (serviceId) => {

      const serviceType = $(event.target['service_serviceType_' + programId + '_' +serviceId]).val();
      const serviceTypeText = $('#' +  $(event.target['service_serviceType_' + programId + '_' +serviceId]).attr('id') + ' option:selected').text();

      let total, isNightMode;
      let discount = 1;

      if (serviceType === 'transfer') {

        const transferCarTypePrice = parseInt($(event.target['transferCarType_' + programId + '_' + serviceId]).val());
        const transferCarType = $('#' + $(event.target['transferCarType_' + programId + '_' + serviceId]).attr('id') + ' option:selected').text();
        const transferHours = $(event.target['transferHours_' + programId + '_' + serviceId]).val();
        const transferCarsAmount = parseInt($(event.target['transferCarsAmount_' + programId + '_' + serviceId]).val());
        const transferIsNightMode = $(event.target['transferNightMode_' + programId + '_' + serviceId]).is(':checked');

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

        const driverCarTypePrice = $(event.target['driverCarType_' + programId + '_' + serviceId]).val();
        const driverCarType = $('#' + $(event.target['driverCarType_' + programId + '_' + serviceId]).attr('id') + ' option:selected').text();
        const driverHours = parseInt($(event.target['driverHours_' + programId + '_' + serviceId]).val());
        const driverCarsAmount = parseInt($(event.target['driverCarsAmount_' + programId + '_' + serviceId]).val());
        const driverIsNightMode = $(event.target['driverNightMode_' + programId + '_' + serviceId]).is(':checked');

        let priceArr = driverCarTypePrice.split('/');

        if (driverIsNightMode) discount = 1.5;

        let pricePerOffer = parseInt(priceArr[0]);
        let pricePerAdditionalHour = parseInt(priceArr[1]);

        let additonalPrice = 0;

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

        const goingPlaceText = $('#' + $(event.target['goingPlace_'+programId+'_'+serviceId]).attr('id') + ' option:selected').text();
        const goingPlacePrice = parseInt($(event.target['goingPlace_'+programId+'_'+serviceId]).val());
        const pplAmount = parseInt($(event.target['pplAmount_'+programId+'_'+serviceId]).val());

        total = goingPlacePrice * pplAmount;

        allExcursions.push({
          "service": serviceTypeText,
          "goingPlace": goingPlaceText,
          "goingPlacePrice": goingPlacePrice,
          "pplAmount": pplAmount,
          "total": total
        });

      } else if (serviceType === 'restaurant') {

        const restaurantName= $('#' + $(event.target['restaurant_'+programId+'_'+serviceId]).attr('id') + ' option:selected').text();
        const restaurantPrice = parseInt($(event.target['restaurant_'+programId+'_'+serviceId]).val());
        const pplAmount = parseInt($(event.target['restaurantPeopleAmount_'+programId+'_'+serviceId]).val());

        total = restaurantPrice * pplAmount;

        allRestaurants.push({
          "service": serviceTypeText,
          "restaurant": restaurantName,
          "restaurantPrice": restaurantPrice,
          "pplAmount": pplAmount,
          "total": total
        });
      }
    });
  });

  return {
    allTransports: allTransports,
    allExcursions: allExcursions,
    allRestaurants: allRestaurants
  }
}
