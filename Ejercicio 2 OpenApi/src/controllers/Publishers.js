'use strict';

var utils = require('../utils/writer.js');
var Publishers = require('../service/PublishersService');

module.exports.publisherPublisherIdDELETE = function publisherPublisherIdDELETE (req, res, next, publisherId) {
  Publishers.publisherPublisherIdDELETE(publisherId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.publisherPublisherIdPUT = function publisherPublisherIdPUT (req, res, next, body, publisherId) {
  Publishers.publisherPublisherIdPUT(body, publisherId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.publishersAllGet = function publishersAllGet (req, res, next) {
  Publishers.publishersAllGet()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.publishersPOST = function publishersPOST (req, res, next, body) {
  Publishers.publishersPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.publishersPublisherIdGET = function publishersPublisherIdGET (req, res, next, publisherId) {
  Publishers.publishersPublisherIdGET(publisherId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
