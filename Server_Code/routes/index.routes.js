const express = require('express')
const router = express.Router()

router.use('/api/v1/students', require('./stdents.routes'))

module.exports = router