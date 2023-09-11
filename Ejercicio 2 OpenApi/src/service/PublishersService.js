'use strict';

const fs = require('fs');

let publishers = [];

const loadPublishers = () => {
  fs.readFile(__dirname + '/' + 'publishers.json', 'utf8', (err, data) => {
    publishers = JSON.parse(data)
  });
}

loadPublishers();

const savePublishers = () => {
  let data = JSON.stringify(publishers)
  fs.writeFileSync(__dirname + '/' + 'publishers.json', data)
};


/**
 * Delete a publisher by ID.
 *
 * publisherId Integer 
 * no response value expected for this operation
 **/
exports.publisherPublisherIdDELETE = function(publisherId) {
  return new Promise(function(resolve, reject) {
    let index = publishers.findIndex(i => i.id == publisherId);
    if (index == -1)
      return resolve();
    else {
      publishers = publishers.filter(i => i.id != publisherId);
      savePublishers();
      resolve();
    }
  });
}


/**
 * Update publisher information
 *
 * body Publisher Book data
 * publisherId Integer 
 * no response value expected for this operation
 **/
exports.publisherPublisherIdPUT = function(body,publisherId) {
  return new Promise(function(resolve, reject) {
    let index = publishers.findIndex(i => i.id == publisherId);
    if (index == -1)
      return resolve();
    else {
      publishers[index] = body;
      savePublishers();
      resolve();
    }
  });
}


/**
 * Returns all publishers.
 *
 * returns List
 **/
exports.publishersAllGet = function() {
  return new Promise(function(resolve, reject) {
    resolve(publishers);
 });
}


/**
 * Returns a publisher by ID.
 *
 * publisherId Integer 
 * returns Publisher
 **/
exports.publishersPublisherIdGET = function(publisherId) {
  return new Promise(function(resolve, reject) {
    let publisher = publishers.find(i => i.id == publisherId);
    if (publisher == undefined)
      return resolve();
    else
     resolve(publisher);
  });
}


/**
 * Create a new publisher
 *
 * body Publisher Publisher data
 * no response value expected for this operation
 **/
exports.publishersPOST = function(body) {
  return new Promise(function(resolve, reject) {
    let index = publishers.findIndex(i => i.id == body.id);
    if (index != -1)
      return resolve();
    else {
      publishers.push(body);
      savePublishers();
      resolve();
    }
  });
}

