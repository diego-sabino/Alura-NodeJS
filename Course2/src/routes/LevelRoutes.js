const { Router } = require('express')
const LevelController = require('../controllers/LevelController')

const router = Router()

router
  .get('/levels', LevelController.findAll)
  .get('/levels/:id', LevelController.findById)
  .post('/levels', LevelController.createLevel)
  .delete('/levels/:id', LevelController.deleteLevel)

module.exports = router;