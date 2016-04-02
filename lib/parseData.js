'use strict';

const async = require('async');

const moment = require('moment');
const hotels = require('../db').hotels;

const allAccommodations = require('./data/allAccommodations');
const allPrograms = require('./data/allPrograms');

const saveFile = require('./saveFile');

module.exports = (data, done) => {

  async.waterfall([
    // Get heading Info
    (callback) => {

      let event = data.event;
      let headingInfo = [
        $(event.target['headingName']).val(),
        $(event.target['headingCity']).val(),
        $(event.target['headingStartDate']).val() + ' / ' + $(event.target['headingEndDate']).val(),
        $(event.target['headingPplAmount']).val()
      ];

      callback(null, {
        headingInfo: headingInfo
      });
    },
    // Parse, get prices and export obj for All Accommodations
    (tripInfo, callback) => {
      allAccommodations ({
        event: data.event,
        accommodationIds: data.accommodationIds,
        roomIds: data.roomIds
      }, (err, allAccs) => {

        if (err) console.log(err);

        tripInfo.allAccommodations = allAccs

        callback(null, tripInfo);
      });
    },
    // Parse, get prices and export obj for All Programs
    (tripInfo, callback) => {

      let allProgs = allPrograms({
        event: data.event,
        programIds: data.programIds,
        serviceIds: data.serviceIds
      });

      tripInfo.allTransports = allProgs.allTransports;
      tripInfo.allExcursions = allProgs.allExcursions;
      tripInfo.allRestaurants = allProgs.allRestaurants;

      callback(null, tripInfo);
    },
    (tripInfo, callback) => {

      callback(null, saveFile(tripInfo));
    }
  ], done);

};
