const express = require('express')
const router = express.Router()
const controller = require('../controllers/weather')

router.post('/', controller.create)
router.get('/', controller.retrieveAll)
router.get('/:id', controller.retrieveOne)
router.get('/:nameCity/:data', controller.retrieveOneCity)
router.put('/:id', controller.update)
router.delete('/:id', controller.delete)

module.exports = router
