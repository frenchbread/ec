'use strict';

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const excursions = require('../../db').excursions;

const excursionsList = $('#excursionsList');
const excursionsModal = $('#excursionsModal');

$(document).ready(() => {
  excursions.find({}, function (err, docs) {

    _.each(docs, function (doc) {
      excursionsList.append(`
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

  $('form#addExcursion').submit(function (event) {

    event.preventDefault();

    const name = $(event.target['name']);
    const price = $(event.target['price']);

    excursions.insert({
      name: name.val(),
      price: price.val()
    }, function (err, newDoc) {
      BrowserWindow.getFocusedWindow().reload();
      // ipc.send('reload-main-window');
    });

    excursionsModal.modal('hide');

    name.val("");
    price.val("");

    return false;
  });
});

function removeRecord (id, name) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    message: `Удалить "${name}" ?`,
    buttons: ["OK", "Отменить"]
  }, function (index) {
    if (index === 0) {
      excursions.remove({ _id: id }, {}, function (err, numRemoved) {
        if (err)
        console.log(err);
        else
        $('#'+id).remove();
        // ipc.send('reload-main-window');
      });
    }
  });
};
