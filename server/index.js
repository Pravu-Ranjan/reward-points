const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()
app.use(express.json({limit:'50mb'}))
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)
const PORT = 3001

app.listen(PORT, ()=> console.log(`Server up and listening on port ${PORT}!`))