import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import CarRoutes from './routes/car'
import SchemaRoutes from './routes/schema'
import UserRoutes from './routes/user'
import PictureRoutes from './routes/picture'

dotenv.config()

mongoose.connect(process.env.MONGODB_URL)
    .catch(() => {
        console.log("error connecting to mongoDB")
        process.exit(1)
    })
    .then(() => {
        mongoose.Promise = Promise
        var app = express()
        app.use(bodyParser.json())
        app.use(cookieParser())
        app.use(cors())

        app.use('/api', CarRoutes)

        app.use('/schema', SchemaRoutes)

        app.use('/user', UserRoutes)
        app.use('/picture', PictureRoutes)

        app.use('/*', (req, res) => {
            res.status(404).sendFile(path.join(__dirname, 'index.html'))
        })

        app.listen(3000, () => console.log('running on localhost:3000'))
    })

