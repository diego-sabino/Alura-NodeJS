const { Router } = require('express')
const LevelController = require('../controllers/LevelController')

const router = Router()

router
  .get('/levels', LevelController.findAll)
  .get('/levels/:id', LevelController.findById)
  .post('/levels', LevelController.createLevel)
  .post('/levels/:id/restore', LevelController.restoreLevel)
  .delete('/levels/:id', LevelController.deleteLevel)

module.exports = router;