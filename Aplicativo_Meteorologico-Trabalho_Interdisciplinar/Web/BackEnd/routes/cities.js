const express = require('express')
const router = express.Router()
const controller = require('../controllers/city')

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:name', controller.retrieveOne)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router