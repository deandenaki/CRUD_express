const express = require('express')
const router = express.Router()
const indexRoute = require('./index') 

router.use(indexRoute)

module.exports = router;