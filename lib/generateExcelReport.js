'use strict';

const excel = require('node-excel-export');

module.exports = function (data) {

  let headingInfo, allAccommodations, allTransports, allExcursions, allRestaurants;

  headingInfo = data.headingInfo;
  allAccommodations = data.allAccommodations;
  allTransports = data.allTransports;
  allExcursions = data.allExcursions;
  allRestaurants = data.allRestaurants;

  let styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFFFFFF'
        },
        sz: 14,
        bold: true,
        underline: true
      }
    },
    cellPink: {
      fill: {
        fgColor: {
          rgb: 'FFFFCCFF'
        }
      }
    }
  };

  let heading = [
    [
      { value: 'Подготовлено для', style: styles.headerDark },
      { value: 'Город', style: styles.headerDark },
      { value: 'Даты', style: styles.headerDark },
      { value: 'Кол-во гостей', style: styles.headerDark}
    ],
    headingInfo
  ];

  let specificationAccommodation = {
    hotel: {
      displayName: 'Отель',
      headerStyle: styles.headerDark,
      width: 200
    },
    dates: {
      displayName: 'Даты',
      headerStyle: styles.headerDark,
      width: 150
    },
    daysTotal: {
      displayName: 'Кол-во дней',
      headerStyle: styles.headerDark,
      width: 150
    },
    roomType: {
      displayName: 'Тип комнаты',
      headerStyle: styles.headerDark,
      width: 120
    },
    pricePerRoom: {
      displayName: 'Стоимость комнаты (р.)',
      headerStyle: styles.headerDark,
      width: 170
    },
    extraBed: {
      displayName: 'Доп. кровать',
      headerStyle: styles.headerDark,
      width: 100
    },
    extraBedPrice: {
      displayName: 'Стоимость доп. кровати (р.)',
      headerStyle: styles.headerDark,
      width: 200
    },
    roomsAmount: {
      displayName: 'Кол-во комнат',
      headerStyle: styles.headerDark,
      width: 150
    },
    price: {
      displayName: 'Итого (р.)',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink,
      width: 100
    }
  };

  let specificationProgram = {
    service: {
      displayName: 'Сервис',
      headerStyle: styles.headerDark,
      width: 200
    },
    autoType: {
      displayName: 'Тип авто',
      headerStyle: styles.headerDark,
      width: 150
    },
    offerPrice: {
      displayName: 'Стоимтость услуги (р.)',
      headerStyle: styles.headerDark,
      width: 150
    },
    offerPriceExtraHours: {
      displayName: 'Стоимтость за доп. часы (р./час)',
      headerStyle: styles.headerDark,
      width: 200
    },
    hours: {
      displayName: 'Кол-во доп. часов',
      headerStyle: styles.headerDark,
      width: 150
    },
    carsAmount: {
      displayName: 'Кол-во авто',
      headerStyle: styles.headerDark,
      width: 120
    },
    isNightMode: {
      displayName: 'Ночноый тариф (+50%)',
      headerStyle: styles.headerDark,
      width: 120
    },
    price: {
      displayName: 'Итого (р.)',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink,
      width: 100
    }
  };

  let specificationExcursions = {
    service: {
      displayName: 'Сервис',
      headerStyle: styles.headerDark,
      width: 200
    },
    goingPlace: {
      displayName: 'Куда',
      headerStyle: styles.headerDark,
      width: 200
    },
    goingPlacePrice: {
      displayName: 'Стоимтость экскурсии (р.)',
      headerStyle: styles.headerDark,
      width: 200
    },
    pplAmount: {
      displayName: 'Кол-во человек',
      headerStyle: styles.headerDark,
      width: 150
    },
    total: {
      displayName: 'Итого (р.)',
      headerStyle: styles.headerDark,
      width: 120
    }
  };

  let specificationFood = {
    service: {
      displayName: 'Сервис',
      headerStyle: styles.headerDark,
      width: 200
    },
    restaurant: {
      displayName: 'Ресторан',
      headerStyle: styles.headerDark,
      width: 200
    },
    restaurantPrice: {
      displayName: 'Стоимость (р)',
      headerStyle: styles.headerDark,
      width: 200
    },
    pplAmount: {
      displayName: 'Кол-во человек',
      headerStyle: styles.headerDark,
      width: 150
    },
    total: {
      displayName: 'Итого (р.)',
      headerStyle: styles.headerDark,
      width: 120
    }
  };

  let report = excel.buildExport(
    [
      {
        name: 'Проживание',
        heading: heading,
        specification: specificationAccommodation,
        data: allAccommodations
      },
      {
        name: "Программа",
        heading: heading,
        specification: specificationProgram,
        data: allTransports
      },
      {
        name: "Экскурсии",
        heading: heading,
        specification: specificationExcursions,
        data: allExcursions
      },
      {
        name: "Питание",
        heading: heading,
        specification: specificationFood,
        data: allRestaurants
      }
    ]
  );

  return report;
};
