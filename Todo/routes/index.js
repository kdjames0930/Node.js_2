const express = require('express')
const app = express()
const router = express.Router()

const TodoRouter = require('./todo')

// Refactoring
router.use('/todo', TodoRouter)

module.exports = router;