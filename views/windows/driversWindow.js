'use strict';

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const drivers = require('../../db').drivers;

const driversList = $('#driversList');
const driversModal = $('#driversModal');

$(document).ready(() => {

  drivers.find({}, function (err, docs) {

    _.each(docs, function (doc) {
      driversList.append(`
        <div class="panel panel-default" id="${doc._id}">
          <div class="panel-heading">
            ${doc.name}
            <button class="btn btn-danger btn-xs pull-right" onclick="removeRecord('${doc._id}', '${doc.name}')">x</button>
          </div>
          <div class="panel-body">
            <b>Цена: </b>${doc.price}р.
          </div>
        </div>
      `);
    });
  });

  $('form#addDriver').submit(function (event) {

    event.preventDefault();

    const name = $(event.target['name']);
    const price = $(event.target['price']);
    const pricePerHour = $(event.target['pricePerHour']);

    drivers.insert({
      name: name.val(),
      price: price.val(),
      pricePerHour: pricePerHour.val()
    }, function (err, newDoc) {
      BrowserWindow.getFocusedWindow().reload();
      // ipc.send('reload-main-window');
    });

    driversModal.modal('hide');

    name.val("");
    price.val("");
    pricePerHour.val("");

    return false;
  });
});

function removeRecord (id, name) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    message: `Удалить "${name}" ?`,
    buttons: ["OK", "Отменить"]
  }, function (index) {
    if (index === 0) {
      drivers.remove({ _id: id }, {}, function (err, numRemoved) {
        if (err)
        console.log(err);
        else
        $('#'+id).remove();
        // ipc.send('reload-main-window');
      });
    }
  });
};
