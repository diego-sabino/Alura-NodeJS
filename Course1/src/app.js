const express = require('express');
const db = require('./config/dbConnect'); 
const routes = require('./routes/index')

db.on("error", console.log.bind(console, 'error connecting to DB'))
db.once("open", () => console.log("successful connecting to DB"));

const app = express();

routes(app);

module.exports = app;