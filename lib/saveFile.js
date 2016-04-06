const fs = require('fs');

const BrowserWindow = require('electron').remote.BrowserWindow;
const dialog = require('electron').remote.dialog;

const generateExcelReport = require('./generateExcelReport');

module.exports = (data) => {

  let dataToExport = generateExcelReport(data);

  dialog.showSaveDialog(BrowserWindow.getFocusedWindow(), {
    title: 'report.xlsx',
    defaultPath: __dirname,
    filters: [
      { name: 'Excel Workbook', extensions: ['xlsx'] }
    ]
  }, function (filePath) {

    if (filePath === undefined) return;

    fs.writeFile(filePath, dataToExport, 'binary', function (err) {

      if (err) console.log(err);

      dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
        message: "Файл сохранен в " + filePath,
        buttons: ["OK"]
      });
    });

  });
}
