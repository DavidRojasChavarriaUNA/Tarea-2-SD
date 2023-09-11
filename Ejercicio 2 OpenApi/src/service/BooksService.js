'use strict';

const fs = require('fs');

let books = [];

const loadBooks = () => {
  fs.readFile(__dirname + '/' + 'books.json', 'utf8', (err, data) => {
    books = JSON.parse(data)
  });
}

loadBooks();

const saveBooks = () => {
  let data = JSON.stringify(books)
  fs.writeFileSync(__dirname + '/' + 'books.json', data)
};

/**
 * Delete a book by ID.
 *
 * bookId String 
 * no response value expected for this operation
 **/
exports.booksBookIdDELETE = function(bookId) {
  return new Promise(function(resolve, reject) {
    let index = books.findIndex(i => i.id == bookId);
    if (index == -1)
      return resolve();
    else {
      books = books.filter(i => i.id != bookId);
      saveBooks();
      resolve();
    }
  });
}

/**
 * Update book information
 *
 * body Book Book data
 * bookId String 
 * no response value expected for this operation
 **/
exports.booksBookIdPUT = function(body,bookId) {
  return new Promise(function(resolve, reject) {
    let index = books.findIndex(i => i.id == bookId);
    if (index == -1)
      return resolve();
    else {
      books[index] = body;
      saveBooks();
      resolve();
    }
  });
}

/**
 * Returns all books.
 *
 * returns List
 **/
exports.booksAllGet = function() {
  return new Promise(function(resolve, reject) {
     resolve(books);
  });
}

/**
 * Returns a book by ID.
 *
 * bookId String 
 * returns Book
 **/
exports.booksBookIdGET = function(bookId) {
  return new Promise(function(resolve, reject) {
    let book = books.find(i => i.id == bookId);
    if (book == undefined)
      return resolve();
    else
     resolve(book);
  });
}


/**
 * Create a new book
 *
 * body Book Book data
 * no response value expected for this operation
 **/
exports.booksPOST = function(body) {
  return new Promise(function(resolve, reject) {
    let index = books.findIndex(i => i.id == body.id);
    if (index != -1)
      return resolve();
    else {
      books.push(body);
      saveBooks();
      resolve();
    }
  });
}