'use strict';

const _ = require('underscore');

const ipc = require('electron').ipcRenderer;
const BrowserWindow = require('electron').remote.BrowserWindow;

const IPCs = require('../windows').IPCs;

const dbWindows = [
  $('#openHotelsWindow'),
  $('#openHotelRatesWindow'),
  $('#openTransfersWindow'),
  $('#openDriversWindow'),
  $('#openExcursionsWindow'),
  $('#openRestaurantsWindow'),
];

for (let i=0;i<dbWindows.length;i++) {
  dbWindows[i].on('click', () => {
    ipc.send(IPCs[i]);
  });
}

const db = require('../db');

const hotels = db.hotels;
const transfers = db.transfers;
const drivers = db.drivers;
const excursions = db.excursions;
const restaurants = db.restaurants;

const parseData = require('../lib/parseData');

const roomData = [
  {
    title: 'Одиночная',
    value: 'single'
  },
  {
    title: 'Двойная',
    value: 'double'
  },
  {
    title: 'Тройная',
    value: 'triple'
  }
];

// Accommodation & rooms
const accommodationForm = $('.accommodationForm');
const accommodationIds = [];
var accommodationId = $('#accommodations > .accommodationForm').size();
const roomForm = $('.roomForm');
const roomIds = [];
var roomId = $('#rooms > .roomForm').size();

// Program & services
const programForm = $('.programForm');
const programIds = [];
var programId = $('#programs > .programForm').size();
const serviceForm = $('.serviceForm');
const serviceIds = [];
var serviceId  = $('#services > .serviceForm').size();

$('#headingStartDate, #headingEndDate').datepicker({
    language: "ru"
});

function addAccommodation () {

  accommodationId++;

  var form = accommodationForm.clone();

  form.attr('id', 'accommodationForm_'+accommodationId);

  $('.accommodationNum', form).text(accommodationId);
  $('.removeAccommodation', form).attr('onclick', 'removeAccommodation('+accommodationId+');');
  $('.addRoom', form).attr('onclick', 'addRoom('+accommodationId+');');
  $('.hotel', form).attr('id', 'hotel_'+accommodationId);
  $('.moveIn', form).attr('id', 'moveIn_'+accommodationId).datepicker({language: "ru"});
  $('.moveOut', form).attr('id', 'moveOut_'+accommodationId).datepicker({language: "ru"});

  hotels.loadDatabase((err) => {
    hotels.find({}, function(err, docs){
      if (docs.length > 0) {
        $.each(docs, function(id, doc) {
          $('.hotel', form)
            .append($('<option>', { value : doc.name })
            .text(doc.name));
        });
      }
    });
  });

  $('#accommodations').append(form.css('display', 'block'));

  accommodationIds.push(accommodationId);

  return false;
};

function removeAccommodation (accommodationId) {

  $('#accommodationForm_'+accommodationId).remove();

  var index   = accommodationIds.indexOf(accommodationId);

  var inList  = index > -1;

  if (inList) accommodationIds.splice(index, 1);

  return false;
};

function addRoom (accommodationId) {

  roomId++;

  var form = $(roomForm).clone();

  form.attr('id', 'roomForm_'+roomId);

  $('.roomType', form).attr('id', 'roomType_' + accommodationId + '_' + roomId);
  $('.roomsAmount', form).attr('id', 'roomsAmount_' + accommodationId + '_' + roomId);
  $('.extraBed', form).attr('id', 'extraBed_' + accommodationId + '_' + roomId);
  $('.removeRoom', form).attr('onclick', 'removeRoom('+accommodationId+', '+roomId+')');
  $('#accommodationForm_'+accommodationId+' #rooms').append(form.css('display', 'block'));

  $.each(roomData, function(id, obj) {
    $('.roomType', form)
    .append($('<option>', { value : obj.value })
    .text(obj.title));
  });

  roomIds.push(roomId);
};

function removeRoom (accommodationId, roomId) {

  $('#roomType_'+accommodationId+'_'+roomId).closest('.roomForm').remove();

  var index   = roomIds.indexOf(roomId);

  var inList  = index > -1;

  if (inList) roomIds.splice(index, 1);

  return false;
};

function addProgram () {

  programId++;

  var form = programForm.clone();

  form.attr('id', 'programForm_'+programId);

  $('.removeProgram', form).attr('onclick', 'removeProgram('+programId+');');
  $('.addService', form).attr('onclick', 'addService('+programId+');');
  $('.programNum', form).text(programId);
  $('#programs').append(form.css('display', 'block'));

  programIds.push(programId);

  return false;
};

function removeProgram (programId) {

  $('#programForm_'+programId).remove();

  var index   = programIds.indexOf(programId);

  var inList  = index > -1;

  if (inList) programIds.splice(index, 1);

  return false;
};

function addService (programId) {

  serviceId++;

  var serviceType = 'service_serviceType_' + programId + '_' +serviceId;

  var form = $(serviceForm).clone();

  form.attr('id', 'serviceForm_'+serviceId);

  $('.serviceType', form).attr({
    'id': serviceType,
    'name': serviceType,
    'onchange': 'switchServiceType('+programId+', '+serviceId+')'
  });

  $('.dynamicPlace', form).attr('id', 'dynamicPlace_'+ serviceId);
  $('.removeService', form).attr('onclick', 'removeService('+programId+', '+serviceId+')');

  $('#programForm_'+programId+' #services').append(form.css('display', 'block'));

  serviceIds.push(serviceId);
};

function removeService (programId, serviceId) {

  $('#service_serviceType_'+programId+'_'+serviceId).closest('.serviceForm').remove();

  var index   = serviceIds.indexOf(serviceId);

  var inList  = index > -1;

  if (inList) serviceIds.splice(index, 1);

  return false;
};

function switchServiceType (programId, serviceId) {

  var serviceType   = 'service_serviceType_' + programId + '_' +serviceId;
  var value = $('#'+serviceType).val();
  var dynamicPlace = '#dynamicPlace_'+serviceId;
  var transferFields = $('#hiddenTransfer').html();
  var driverFields = $('#hiddenDriver').html();
  var excursionFields = $('#hiddenExcursion').html();
  var restaurantFields = $('#hiddenRestaurant').html();

  switch (value) {
    case "transfer":

    $(dynamicPlace).html(transferFields);

    transfers.loadDatabase((err) => {
      transfers.find({}, function(err, docs){
        if (docs.length > 0) {
          $.each(docs, function(id, obj) {
            $(dynamicPlace+' .transferCarType')
            .append($('<option>', { value : obj.price })
            .text(obj.name));
          });
        }
      });
    });

    $(dynamicPlace+' .transferCarType').attr('id', 'transferCarType_'+programId+'_'+serviceId);
    $(dynamicPlace+' .transferCarsAmount').attr('id', 'transferCarsAmount_'+programId+'_'+serviceId);
    $(dynamicPlace+' .transferNightMode').attr('id', 'transferNightMode_'+programId+'_'+serviceId);

    break;
    case "driver":

    $(dynamicPlace).html(driverFields);

    drivers.loadDatabase((err) => {
      drivers.find({}, function(err, docs){
        if (docs.length > 0) {
          $.each(docs, function(id, obj) {
            $(dynamicPlace+' .driverCarType')
            .append($('<option>', { value : obj.price + "/" + obj.pricePerHour })
            .text(obj.name));
          });
        }
      });
    });

    $(dynamicPlace+' .driverCarType').attr('id', 'driverCarType_'+programId+'_'+serviceId);
    $(dynamicPlace+' .driverHours').attr('id', 'driverHours_'+programId+'_'+serviceId);
    $(dynamicPlace+' .driverCarsAmount').attr('id', 'driverCarsAmount_'+programId+'_'+serviceId);
    $(dynamicPlace+' .driverNightMode').attr('id', 'driverNightMode_'+programId+'_'+serviceId);

    break;
    case "excursion":

    $(dynamicPlace).html(excursionFields);

    excursions.loadDatabase((err) => {
      excursions.find({}, function(err, docs){
        if (docs.length > 0) {
          $.each(docs, function(id, obj) {
            $(dynamicPlace+' .goingPlace')
            .append($('<option>', { value : obj.price })
            .text(obj.name));
          });
        }
      });
    });

    $(dynamicPlace+' .goingPlace').attr('id', 'goingPlace_'+programId+'_'+serviceId);
    $(dynamicPlace+' .pplAmount').attr('id', 'pplAmount_'+programId+'_'+serviceId);

    break;
    case "restaurant":

    $(dynamicPlace).html(restaurantFields);

    restaurants.loadDatabase((err) => {
      restaurants.find({}, function(err, docs){
        if (docs.length > 0) {
          $.each(docs, function(id, obj) {
            $(dynamicPlace+' .restaurant')
            .append($('<option>', { value : obj.price })
            .text(obj.name));
          });
        }
      });
    });

    $(dynamicPlace+' .restaurant').attr('id', 'restaurant_'+programId+'_'+serviceId);

    $(dynamicPlace+' .restaurantPeopleAmount').attr('id', 'restaurantPeopleAmount_'+programId+'_'+serviceId);
    break;
  }
};

$('form#mainForm').submit(function (event) {

  event.preventDefault();

  const data = parseData({
    event: event,
    accommodationIds: accommodationIds,
    roomIds: roomIds,
    programIds: programIds,
    serviceIds: serviceIds
  }, (err, data) => {

    if (err) console.log(err);

    console.log('done');

  });

  return false;
});

$('#reload-mainWindow').on('click', () => {
  BrowserWindow.getFocusedWindow().reload();
});
