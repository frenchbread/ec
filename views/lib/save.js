const remote = require('electron').remote;
const dialog = remote.require('electron').dialog;
const fs = require('fs');
var excel = require('node-excel-export');

module.exports = function (headingInfo, allAccommodations, allPrograms) {

  var styles = {
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

  //Array of objects representing heading rows (very top)
  var heading = [
    [
      {value: 'Подготовлено для', style: styles.headerDark},
      {value: 'Город', style: styles.headerDark},
      {value: 'Даты', style: styles.headerDark},
      {value: 'Кол-во гостей', style: styles.headerDark}
    ],
    headingInfo
  ];

  //Here you specify the export structure
  var specification = {
    hotel: { // <- the key should match the actual data key
      displayName: 'Отель', // <- Here you specify the column header
      headerStyle: styles.headerDark, // <- Header style,
      width: 200 // <- width in pixels
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
    extraBed: {
      displayName: 'Доп. кровать',
      headerStyle: styles.headerDark,
      width: 100
    },
    roomsAmount: {
      displayName: 'Кол-во комнат',
      headerStyle: styles.headerDark,
      width: 100
    },
    price: {
      displayName: 'Цена (р.)',
      headerStyle: styles.headerDark,
      cellStyle: styles.cellPink, // <- Cell style [todo: allow function]
      width: 50 // <- width in pixels
    }
  };

  var report = excel.buildExport(
    [
      {
        name: 'Проживание',
        heading: heading,
        specification: specification,
        data: allAccommodations
      }
    ]
  );

  dialog.showSaveDialog({
    title: 'data.xlsx',
    defaultPath: __dirname,
    filters: [
      { name: 'Custom File Type', extensions: ['xlsx'] }
    ]
  }, function (filePath) {

    fs.writeFile(filePath, report, 'binary', function (err) {

      if (err) console.log(err);

      dialog.showMessageBox({
        message: "The file has been saved to " + filePath,
        buttons: ["OK"]
      });
    });
  });

};