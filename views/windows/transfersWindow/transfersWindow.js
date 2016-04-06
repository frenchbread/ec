'use strict';

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const transfers = require('../../../db').transfers;

const transfersList = $('#transfersList');
const transfersModal = $('#transfersModal');

$(document).ready(() => {

  transfers.loadDatabase((err) => {

    transfers.find({}, function (err, docs) {

      if (docs.length > 0) {

        _.each(docs, function (doc) {
          transfersList.append(`
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
      } else {

        transfersList.html('<div class="jumbotron text-center"><strong>Тарифы не найдены.</strong></div>');
      }
    });
  });

  $('form#addTransfer').submit(function (event) {

    event.preventDefault();

    const name = $('#name').val();
    const price = $('#price').val();

    transfers.loadDatabase((err) => {
      transfers.insert({
        name: name,
        price: price
      }, function (err, newDoc) {
        BrowserWindow.getFocusedWindow().reload();
      });
    });

    transfersModal.modal('hide');

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
      transfers.loadDatabase((err) => {
        transfers.remove({ _id: id }, {}, function (err, numRemoved) {
          if (err)
            console.log(err);
          else
            $('#'+id).remove();
        });
      });
    }
  });
};
