// Servidor gRPC
const fs = require('fs')

const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const pkg_def = loader.loadSync(`${__dirname}/grpc-book.proto`);

const booksProto = grpc.loadPackageDefinition(pkg_def).books;

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;
const server = new grpc.Server();

let books = []

const loadBooks = () => {
  fs.readFile(`${__dirname}/books.json`, 'utf8', (err, data) => {
    books = JSON.parse(data)
  });
}
loadBooks()

const saveBooks = () => {
  let data = JSON.stringify(books)
  fs.writeFileSync(`${__dirname}/books.json`, data)
}

server.addService(booksProto.BooksService.service, {
  getAllBooks: (call, cb) =>{
    cb(null, {books});
  },
  getBook: (call, cb) => {
    let book = books.find(book => book.id == call.request.id);
    if (book == undefined)
      return cb(new Error(`unknown book ${call.request.id}`));
    else
      cb(null, book);
  },
  insertBook: (call, cb) =>{
    const newBook = call.request;
    const ResponseMessage = {
      messageResponse: ''
    };

    for (let i = 0; i < books.length; i++) {
      let book = books[i]
      if (book.id === newBook.id) {
        ResponseMessage.messageResponse = 'Book already exits';
        return cb(null, ResponseMessage);
      }
    }
    books.push(newBook)
    saveBooks()
    ResponseMessage.messageResponse = 'Book was added';
    cb(null, ResponseMessage);
  },
  updateBook: (call, cb) =>{
    const theBook  = call.request;
    const ResponseMessage = {
      messageResponse: ''
    };

    for (let i = 0; i < books.length; i++) {
      let book = books[i]
      if (book.id === theBook.id) {
        books[i] = theBook;
        saveBooks()
        ResponseMessage.messageResponse = 'Book was updated';
        return cb(null, ResponseMessage);
      }
    }
    ResponseMessage.messageResponse = 'Book not found';
    cb(null, ResponseMessage);
  },
  deleteBook: (call, cb) =>{

    let book = books.find(book => book.id == call.request.id);

    const ResponseMessage = {
      messageResponse: ''
    };
    if (book == undefined){
      ResponseMessage.messageResponse = 'Book not found';
      return cb(null, ResponseMessage);
    }
    books = books.filter(b => b.id !== book.id);
    saveBooks()
    ResponseMessage.messageResponse = 'Book was deleted';
    cb(null, ResponseMessage);
  }
});
server.bindAsync(`${HOST}:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    server.start();
    console.log(`Producer running at http://${HOST}:${port}/`);
});