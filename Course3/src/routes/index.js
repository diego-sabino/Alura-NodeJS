const bodyParser = require('body-parser');
const PersonRoutes = require('./PersonRoutes');
const ClassRoutes = require('./ClassRoutes');
const LevelRoutes = require('./LevelRoutes');
  
module.exports = app => {
  app.use(bodyParser.json());
  app.use(PersonRoutes);
  app.use(ClassRoutes);
  app.use(LevelRoutes);
}