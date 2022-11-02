const books = require('../models/bookModel');


class bookController {
  static findAll = (_req, res) => {
    books.find()
     .populate('author')
     .exec((err, books) => {
      if (!err) return res.status(200).json(books)
      res.status(500).json({ message: err.message })
    })};

   static findById = (req, res) => {
    const { id } = req.params;
    books.findById(id)
        .populate('author', 'name')
        .exec((err, books) => {
      if(err) return res.status(404).send({ message: err.message });
      res.status(200).json(books)
    })};

  static findByTitle = (req, res) => {
    const { q } = req.query;
    books.find({ 'title': q }, {}, (err, books) => {
      if(err) return res.status(404).send({ message: err.message });
      res.status(200).json(books)
    })};
  
   static createBook = (req, res) => {
    const book = new books(req.body);
    book.save((err) => {
      if(err) return res.status(500).send({ message: err.message });
      res.status(201).json(book)
    })};

    static updateBook = (req, res) => {
     const { id } = req.params;
     books.findByIdAndUpdate(id, {$set: req.body}, (err) => {
       if(err) return res.status(500).send({ message: err.message });
       res.status(200).json({ message: "book successfully updated" })
      })};
    
    static deleteBook = (req, res) => {
      const { id } = req.params;
      books.findByIdAndDelete(id, (err) => {
        if(err) return res.status(500).send({ message: err.message });
        res.status(200).json({ message: "book successfully deleted" })
      })};
}

module.exports = bookController;