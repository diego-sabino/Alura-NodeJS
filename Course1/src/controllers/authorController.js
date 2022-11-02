const authors = require('../models/authorModel');


class authorController {
  static findAll = (_req, res) => {
    authors.find((err, author) => {
      if (!err) return res.status(200).json(author)
      res.status(500).json({ message: err.message })
    })};

   static findById = (req, res) => {
    const { id } = req.params;
    authors.findById(id, (err, author) => {
      if(err) return res.status(404).send({ message: err.message });
      res.status(200).json(author)
    })};

    static findByName = (req, res) => {
      const { q } = req.query;
      authors.find({ 'name': q }, {}, (err, author) => {
        if(err) return res.status(404).send({ message: err.message });
        res.status(200).json(author)
      })};

   static createAuthor = (req, res) => {
    const author = new authors(req.body);
    author.save((err) => {
      if(err) return res.status(500).send({ message: err.message });
      res.status(201).json(author)
    })};

    static updateAuthor = (req, res) => {
     const { id } = req.params;
     authors.findByIdAndUpdate(id, {$set: req.body}, (err) => {
       if(err) return res.status(500).send({ message: err.message });
       res.status(200).json({ message: "author successfully updated" })
      })};
    
    static deleteAuthor = (req, res) => {
      const { id } = req.params;
      authors.findByIdAndDelete(id, (err) => {
        if(err) return res.status(500).send({ message: err.message });
        res.status(200).json({ message: "author successfully deleted" })
      })};
}

module.exports = authorController;