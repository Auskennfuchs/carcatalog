import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

import CarRoutes from './routes/car'
import SchemaRoutes from './routes/schema'
import UserRoutes from './routes/user'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
    .catch(() => {
        console.log("error connecting to mongoDB")
        process.exit(1)
    })
    .then(() => {
        var app = express()
        app.use(bodyParser.json())
        
        app.use('/api', CarRoutes)    

        app.use('/schema', SchemaRoutes)

        app.use('/user', UserRoutes)

        app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, 'index.html'))
        })

        app.listen(3000, () => console.log('running on localhost:3000'))
    })

