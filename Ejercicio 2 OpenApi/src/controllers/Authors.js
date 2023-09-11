'use strict';

var utils = require('../utils/writer.js');
var Authors = require('../service/AuthorsService');

module.exports.authorAuthorIdDELETE = function authorAuthorIdDELETE (req, res, next, authorId) {
  Authors.authorAuthorIdDELETE(authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorAuthorIdPUT = function authorAuthorIdPUT (req, res, next, body, authorId) {
  Authors.authorAuthorIdPUT(body, authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorsAllGet = function authorsAllGet (req, res, next) {
  Authors.authorsAllGet()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorsAuthorIdGET = function authorsAuthorIdGET (req, res, next, authorId) {
  Authors.authorsAuthorIdGET(authorId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.authorsPOST = function authorsPOST (req, res, next, body) {
  Authors.authorsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
