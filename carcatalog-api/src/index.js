import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import CarRoutes from './routes/car'

var app = express()
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/carcatalog')


app.use('/api', CarRoutes)

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, () => console.log('running on localhost:3000'))