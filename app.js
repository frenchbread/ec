'use strict';

const app = require('electron').app;
const ipcMain = require('electron').ipcMain;

const _ = require('underscore');

const dbWindows = require('./windows').dbWindows;
const IPCs = require('./windows').IPCs;

function createWindow () {

  // Init main window
  let mainWindow = require('./windows').mainWindow();
  let windows = [];

  // Init all db windows
  _.each(dbWindows, function(dbWindow){

    let window = dbWindow();

    windows.push(window);

    window.on('close', function(event){
      event.preventDefault();
      this.hide();
    });
  });

  // Desroy all windows when main window closes
  mainWindow.on('closed', () => {

    mainWindow = null;

    _.each(windows, function (window) {

      window.destroy();
    });
  });

  // IPCs - show window depending on which ipc was received
  for (let i=0;i<IPCs.length;i++) {

    ipcMain.on(IPCs[i], (event, arg) => {

      windows[i].show();
    });
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});
