'use strict';

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const hotels = require('../../db').hotels;

const hotelsList = $('#hotelsList');
const hotelsModal = $('#hotelsModal');

$(document).ready(() => {

  hotels.find({}, function (err, docs) {

    _.each(docs, function (doc) {
      hotelsList.append(`
        <div class="panel panel-default" id="${doc._id}">
          <div class="panel-heading">
            ${doc.name}
            <button class="btn btn-danger btn-xs pull-right" onclick="removeRecord('${doc._id}', '${doc.name}')">x</button>
          </div>
          <div class="panel-body">
            <div class="roomsLayout">
              <b>Одиночная: </b>${doc.roomType.single.rub}р.
              <br/>
              <b>Двойная: </b>${doc.roomType.double.rub}р.
              <br/>
              <b>Тройная: </b>${doc.roomType.triple.rub}р.
            </div>
            <br/>
            <b>Доп. кровать: </b>${doc.extraBed}р.
          </div>
        </div>
      `);
    });
  });

  $('form#addHotel').submit(function (event) {

    event.preventDefault();

    const name = $(event.target['name']);
    const singleRoom = $(event.target['singleRoom']);
    const doubleRoom = $(event.target['doubleRoom']);
    const trippleRoom = $(event.target['trippleRoom']);
    const extraBed = $(event.target['extraBed']);

    hotels.insert({
      name: name.val(),
      roomType: {
        single: {
          rub: singleRoom.val()
        },
        double: {
          rub: doubleRoom.val()
        },
        triple: {
          rub: trippleRoom.val()
        }
      },
      extraBed: extraBed.val()
    }, function (err, newDoc) {
      BrowserWindow.getFocusedWindow().reload();
      // ipc.send('reload-main-window');
    });

    hotelsModal.modal('hide');

    name.val("");
    singleRoom.val("");
    doubleRoom.val("");
    trippleRoom.val("");
    extraBed.val("");

    return false;
  });
});

function removeRecord (id, name) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    message: `Удалить "${name}" ?`,
    buttons: ["OK", "Отменить"]
  }, function (index) {
    if (index === 0) {
      hotels.remove({ _id: id }, {}, function (err, numRemoved) {
        if (err)
        console.log(err);
        else
        $('#'+id).remove();
        // ipc.send('reload-main-window');
      });
    }
  });
};
