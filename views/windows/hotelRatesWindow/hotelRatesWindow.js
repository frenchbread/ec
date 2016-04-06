'use strict';

const _ = require('underscore');
const moment = require('moment');

const ipc = require('electron').ipcRenderer;
const dialog = require('electron').remote.dialog;
const BrowserWindow = require('electron').remote.BrowserWindow;

const hotelRates = require('../../../db').hotelRates;
const hotels = require('../../../db').hotels;

const hotelRatesList = $('#hotelRatesList');
const hotelRatesModal = $('#hotelRatesModal');

$(document).ready(() => {

  let pickerOtps = {
    format: "dd.mm.yyyy",
    language: "ru",
    autoclose: true,
    todayHighlight: true
  };

  $('.input-daterange').datepicker(pickerOtps);

  hotelRates.loadDatabase((err) => {

    hotelRates.find({}, function (err, docs) {

      if (docs.length > 0) {

        _.each(docs, function (doc) {

          moment.locale('ru');

          let start = moment(doc.start).format("DD MMM YYYY");
          let end = moment(doc.end).format("DD MMM YYYY")

          hotelRatesList.append(`
            <div class="panel panel-default" id="${doc._id}">
              <div class="panel-heading">
                ${doc.title}
                <button class="btn btn-danger btn-xs pull-right" onclick="removeRecord('${doc._id}', '${doc.name}')">x</button>
              </div>
              <div class="panel-body">
                <p>
                  <b>Отель: </b>${doc.name}
                </p>
                <div class="roomsLayout">
                  <p><b>Действие тарифа:</b></p>
                  ${start} - ${end}
                </div>
                <br/>
                <div class="roomsLayout">
                  <b>Одиночная: </b>${doc.single}р.
                  <br/>
                  <b>Двойная: </b>${doc.double}р.
                  <br/>
                  <b>Тройная: </b>${doc.triple}р.
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

    const title = $('#title').val();
    const name = $('#name').val();
    const start = $('#start').val();
    const end = $('#end').val();
    const singleRoom = $('#singleRoom').val();
    const doubleRoom = $('#doubleRoom').val();
    const trippleRoom = $('#trippleRoom').val();
    const extraBed = $('#extraBed').val();

    hotelRates.loadDatabase((err) => {

      hotelRates.insert({
        title: title,
        name: name,
        start: moment(start, "DD.MM.YYYY").toDate(),
        end: moment(end, "DD.MM.YYYY").toDate(),
        single: singleRoom,
        double: doubleRoom,
        triple: trippleRoom,
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

  $('#name').on('change', () => {
    hotelRates.loadDatabase(() => {
      hotelRates.find({name: $('#name').val()}, (err, rates) => {

        let datesDisabled = [];

        _.each(rates, (rate) => {
          let start = moment(rate.start);
          let end = moment(rate.end);

          let diff = end.diff(start, 'days');

          let ittr = start;

          for (let i = 0; i <= diff; i++) {

            datesDisabled.push(ittr.format('DD.MM.YYYY'));

            ittr = start.add(1, 'days')
          }
        });

        $('#start, #end').datepicker('setDatesDisabled', datesDisabled);
      });
    });
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
