const express = require('express');
const book = require('./bookRoutes');
const author = require('./authorRoutes');

const routes = (app) => {
  app.route('/').get((_req, res) => {
    res.status(200).send({ message: "home" })
  });
  app.use(express.json(), book, author)
}

module.exports = routes;