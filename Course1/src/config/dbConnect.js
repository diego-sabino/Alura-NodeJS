const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://zephyr664:${process.env.PASSWORD}@cluster0.87x6vqi.mongodb.net/alura-node`);

const db = mongoose.connection;

module.exports = db;