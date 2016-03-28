'use strict';

window.$ = window.jQuery = require('../../bower_components/jquery/dist/jquery.min.js');

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const restaurants = require('../../db').restaurants;

const restaurantsList = $('#restaurantsList');
const restaurantsModal = $('#restaurantsModal');

$(document).ready(() => {

  restaurants.find({}, function (err, docs) {

    _.each(docs, function (doc) {
      restaurantsList.append(`
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

  $('form#addRestaurant').submit(function (event) {

    event.preventDefault();

    const name = $(event.target['name']);
    const price = $(event.target['price']);

    restaurants.insert({
      name: name.val(),
      price: price.val()
    }, function (err, newDoc) {
      BrowserWindow.getFocusedWindow().reload();
      // ipc.send('reload-main-window');
    });

    restaurantsModal.modal('hide');

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
      restaurants.remove({ _id: id }, {}, function (err, numRemoved) {
        if (err)
        console.log(err);
        else
        $('#'+id).remove();
        // ipc.send('reload-main-window');
      });
    }
  });
};
