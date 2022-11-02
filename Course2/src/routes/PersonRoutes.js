const { Router } = require('express');
const PersonController = require('../controllers/PersonController');

const router = Router();

router
  .get('/people', PersonController.findAll)
  .get('/people/:id', PersonController.findById)
  .get('/people/:person/enrollment/:id', PersonController.findEnrollmentById)
  .put('/people/:person/enrollment/:id', PersonController.updateEnrollment)
  .post('/people', PersonController.createPerson)
  .post('/people/:id/enrollment', PersonController.createEnrollment)
  .put('/people/:id', PersonController.updatePerson)
  .delete('/people/:id', PersonController.deletePerson)
  .delete('/people/:person/enrollment/:id', PersonController.deleteEnrollment);

module.exports = router;