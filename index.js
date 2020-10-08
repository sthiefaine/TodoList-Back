const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./queries')

const app = express()
app.use(cors())

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// ROUTES
app.get('/tasks', db.getTasks)
app.post('/task', db.createTask)
app.delete('/task', db.deleteTask)

// Start server
app.listen(process.env.PORT || 3002, () => {
    console.log(`Server listening`)
})