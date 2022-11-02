const express = require('express');
const booksController = require('../controllers/bookController')

const router = express.Router();

router
  .get('/books', booksController.findAll)
  .get('/books/title', booksController.findByTitle)
  .get('/books/:id', booksController.findById)
  .post('/books', booksController.createBook)
  .put('/books/:id', booksController.updateBook)
  .delete('/books/:id', booksController.deleteBook);

module.exports = router;