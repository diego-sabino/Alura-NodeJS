const express = require('express');
const authorController = require('../controllers/authorController')

const router = express.Router();

router
  .get('/author', authorController.findAll)
  .get('/author/name', authorController.findByName)
  .get('/author/:id', authorController.findById)
  .post('/author', authorController.createAuthor)
  .put('/author/:id', authorController.updateAuthor)
  .delete('/author/:id', authorController.deleteAuthor);

module.exports = router;