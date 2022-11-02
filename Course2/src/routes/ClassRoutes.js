const { Router } = require('express')
const ClassController = require('../controllers/ClassController')

const router = Router()
router
 .get('/classes', ClassController.findAll)
 .get('/classes/:id', ClassController.findById)
 .delete('/classes/:id', ClassController.deleteClass)
module.exports = router