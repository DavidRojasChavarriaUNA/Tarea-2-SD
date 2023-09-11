// Cliente RPC
const util = require('util');
const express = require('express');

const grpc = require('@grpc/grpc-js');
const loader = require('@grpc/proto-loader');
const pkg_def = loader.loadSync(`${__dirname}/grpc-book.proto`);

const booksProto = grpc.loadPackageDefinition(pkg_def).books;


const app = express()
app.use(express.json())

const port = process.env.PORT || 1337 
const target = process.env.TARGET || 'localhost:4000';

const client = new booksProto.BooksService(
  target,
  grpc.credentials.createInsecure()
);

const getAllBooks = util.promisify(client.getAllBooks.bind(client));
const getBook = util.promisify(client.getBook.bind(client));
const insertBook = util.promisify(client.insertBook.bind(client));
const updateBook = util.promisify(client.updateBook.bind(client));
const deleteBook = util.promisify(client.deleteBook.bind(client));

app.get('/book', (req,res) => {
	Promise.resolve(getAllBooks(null))
	.then(data => {
	  res.json(data.books)
	})
	.catch(reason => {
	  console.log(reason)
	});
})

app.get('/book/:id', (req,res) => {
	Promise.resolve(getBook({id: req.params.id}))
	.then(book => {
	  res.json(book)
	})
	.catch(reason => {
	  console.log(reason)
	});
})

app.post('/book', (req, res) => {
    const theBook = req.body
	Promise.resolve(updateBook(theBook))
	.then(ResponseMessage => {
	  res.json(ResponseMessage)
	})
	.catch(reason => {
	  console.log(reason)
	});
})

app.put('/book', (req, res) => {
    const newBook = req.body
	Promise.resolve(insertBook(newBook))
	.then(ResponseMessage => {
	  res.json(ResponseMessage)
	})
	.catch(reason => {
	  console.log(reason)
	});
})

app.delete('/book/:id', (req, res) => {
	Promise.resolve(deleteBook({id: req.params.id}))
	.then(ResponseMessage => {
	  res.json(ResponseMessage)
	})
	.catch(reason => {
	  console.log(reason)
	});
})

app.listen(port, () => console.log(`Server listening on port ${port}`))