const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  { 
    id: {type: String},
    title: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'authors', required: true},
    pageQuantity: {type: Number, required: true}
});


const books = mongoose.model('books', bookSchema);

module.exports = books;