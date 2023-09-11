'use strict';

const fs = require('fs');

let authors = [];

const loadAuthors = () => {
  fs.readFile(__dirname + '/' + 'authors.json', 'utf8', (err, data) => {
    authors = JSON.parse(data)
  });
}

loadAuthors();

const saveAuthors = () => {
  let data = JSON.stringify(authors)
  fs.writeFileSync(__dirname + '/' + 'authors.json', data)
};

/**
 * Delete a author by ID.
 *
 * authorId Integer 
 * no response value expected for this operation
 **/
exports.authorAuthorIdDELETE = function(authorId) {
  return new Promise(function(resolve, reject) {
    let index = authors.findIndex(i => i.id == authorId);
    if (index == -1)
      return resolve();
    else {
      authors = authors.filter(i => i.id != authorId);
      saveAuthors();
      resolve();
    }
  });
}


/**
 * Update author information
 *
 * body Author Book data
 * authorId Integer 
 * no response value expected for this operation
 **/
exports.authorAuthorIdPUT = function(body,authorId) {
  return new Promise(function(resolve, reject) {
    let index = authors.findIndex(i => i.id == authorId);
    if (index == -1)
      return resolve();
    else {
      authors[index] = body;
      saveAuthors();
      resolve();
    }
  });
}


/**
 * Returns all authors.
 *
 * returns List
 **/
exports.authorsAllGet = function() {
  return new Promise(function(resolve, reject) {
    resolve(authors);
 });
}


/**
 * Returns a author by ID.
 *
 * authorId Integer 
 * returns Author
 **/
exports.authorsAuthorIdGET = function(authorId) {
  return new Promise(function(resolve, reject) {
    let author = authors.find(i => i.id == authorId);
    if (author == undefined)
      return resolve();
    else
     resolve(author);
  });
}


/**
 * Create a new author
 *
 * body Author Author data
 * no response value expected for this operation
 **/
exports.authorsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    let index = authors.findIndex(i => i.id == body.id);
    if (index != -1)
      return resolve();
    else {
      authors.push(body);
      saveAuthors();
      resolve();
    }
  });
}

