'use strict';

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const hotels = require('../../../db').hotels;

const hotelsList = $('#hotelsList');
const hotelsModal = $('#hotelsModal');

$(document).ready(() => {

  hotels.loadDatabase((err) => {

    hotels.find({}, function (err, docs) {

      if (docs.length > 0) {

        _.each(docs, function (doc) {
          hotelsList.append(`
            <div class="panel panel-default" id="${doc._id}">
              <div class="panel-body">
                ${doc.name}
                <button class="btn btn-danger btn-xs pull-right" onclick="removeRecord('${doc._id}', '${doc.name}')">x</button>
              </div>
            </div>
          `);
        });
      } else {

        hotelsList.html('<div class="jumbotron text-center"><strong>Отели не найдены.</strong></div>');
      }
    });
  });

  $('form#addHotel').submit(function (event) {

    event.preventDefault();

    const name = $('#name').val();
    const start = $('#start').val();
    const end = $('#end').val();
    const singleRoom = $('#singleRoom').val();
    const doubleRoom = $('#doubleRoom').val();
    const trippleRoom = $('#trippleRoom').val();
    const extraBed = $('#extraBed').val();

    hotels.loadDatabase((err) => {

      hotels.insert({
        name: name,
      }, function (err, newDoc) {
        BrowserWindow.getFocusedWindow().reload();
      });
    });

    hotelsModal.modal('hide');

    this.reset();

    return false;
  });
});

function removeRecord (id, name) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    message: `Удалить "${name}" ?`,
    buttons: ["OK", "Отменить"]
  }, function (index) {
    if (index === 0) {
      hotels.loadDatabase((err) => {
        hotels.remove({ _id: id }, {}, function (err, numRemoved) {
          if (err)
            console.log(err);
          else
            $('#'+id).remove();
        });
      });
    }
  });
};
