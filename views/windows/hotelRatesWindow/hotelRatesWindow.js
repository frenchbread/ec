'use strict';

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const hotelRates = require('../../../db').hotelRates;
const hotels = require('../../../db').hotels;

const hotelRatesList = $('#hotelRatesList');
const hotelRatesModal = $('#hotelRatesModal');

$(document).ready(() => {

  $('.input-daterange').datepicker({
    language: "ru",
    autoclose: true,
    todayHighlight: true
  });

  hotelRates.loadDatabase((err) => {

    hotelRates.find({}, function (err, docs) {

      if (docs.length > 0) {

        _.each(docs, function (doc) {
          hotelRatesList.append(`
            <div class="panel panel-default" id="${doc._id}">
              <div class="panel-heading">
                ${doc.name}
                <button class="btn btn-danger btn-xs pull-right" onclick="removeRecord('${doc._id}', '${doc.name}')">x</button>
              </div>
              <div class="panel-body">
                <div class="roomsLayout">
                  <p><b>Действие тарифа:</b></p>
                  ${doc.start} - ${doc.end}
                </div>
                <br/>
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
      } else {

        hotelRatesList.html('<div class="jumbotron text-center"><strong>Тарифы не найдены.</strong></div>');
      }
    });
  });

  updateHotelsList();

  $('form#addHotelRate').submit(function (event) {

    event.preventDefault();

    const name = $('#name').val();
    const start = $('#start').val();
    const end = $('#end').val();
    const singleRoom = $('#singleRoom').val();
    const doubleRoom = $('#doubleRoom').val();
    const trippleRoom = $('#trippleRoom').val();
    const extraBed = $('#extraBed').val();

    hotelRates.loadDatabase((err) => {

      hotelRates.insert({
        name: name,
        start: start,
        end: end,
        roomType: {
          single: {
            rub: singleRoom
          },
          double: {
            rub: doubleRoom
          },
          triple: {
            rub: trippleRoom
          }
        },
        extraBed: extraBed
      }, function (err, newDoc) {
        BrowserWindow.getFocusedWindow().reload();
      });
    });

    hotelRatesModal.modal('hide');

    this.reset();

    return false;
  });

  $('#updateHotelsList').on('click', () => {
    updateHotelsList();
  });
});

function removeRecord (id, name) {
  dialog.showMessageBox(BrowserWindow.getFocusedWindow(), {
    message: `Удалить "${name}" ?`,
    buttons: ["OK", "Отменить"]
  }, function (index) {
    if (index === 0) {
      hotelRates.loadDatabase((err) => {
        hotelRates.remove({ _id: id }, {}, function (err, numRemoved) {
          if (err)
            console.log(err);
          else
            $('#'+id).remove();
        });
      });
    }
  });
};

function updateHotelsList () {

  const hotelsList = $('#name');

  hotelsList.html('');

  hotels.loadDatabase((err) => {

    hotels.find({}, (err, docs) => {

      if (docs.length > 0) {
        $.each(docs, function(id, doc) {
          hotelsList
            .append($('<option>', { value : doc.name })
            .text(doc.name));
        });
      }
    });
  });
}
