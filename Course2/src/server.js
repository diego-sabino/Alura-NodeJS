const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes')
require('dotenv').config();

const app = express();

routes(app);

const port = process.env.PORT;

app.listen(port, () => console.log(`localhost:${port}`))