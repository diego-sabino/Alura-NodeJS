const { Router } = require('express');
const PersonController = require('../controllers/PersonController');

const router = Router();

router
  .get('/people', PersonController.findActivePerson)
  .get('/people/all', PersonController.findAll)
  .get('/people/:id', PersonController.findById)
  .get('/people/:person/enrollment/:id', PersonController.findEnrollmentById)
  .get('/people/:studentId/enrollment', PersonController.findEnrollment)
  .get('/people/enrollment/:classId/confirmed', PersonController.findEnrollmentByClass)
  .get('/people/enrollment/crowded', PersonController.findCrowdedClasses)
  .post('/people', PersonController.createPerson)
  .post('/people/:studentId/cancel', PersonController.cancelPerson)
  .post('/people/:id/enrollment', PersonController.createEnrollment)
  .post('/people/:id/restore', PersonController.restorePerson)
  .put('/people/:id', PersonController.updatePerson)
  .put('/people/:person/enrollment/:id', PersonController.updateEnrollment)
  .delete('/people/:id', PersonController.deletePerson)
  .delete('/people/:person/enrollment/:id', PersonController.deleteEnrollment);

module.exports = router;