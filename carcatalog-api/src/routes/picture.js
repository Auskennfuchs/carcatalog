import express from 'express'
import Picture from '../models/picture'
import mongoose from 'mongoose'

var router = express.Router()

router.route('/:id')
    .get((req, res) => {
        const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
            chunkSizeBytes: 1024,
            bucketName: "carpics",
        })

        let count = 0;
        bucket.find({ _id: new mongoose.Types.ObjectId(req.params.id) }).forEach(pic => {
            count += 1
            bucket.openDownloadStream(pic._id).
                pipe(res)
                .on('error', err => {
                    res.status(404).json({ errors: { global: "picture not found" } })
                })
        }, () => {
            if (count === 0) {
                res.status(404).json({ errors: { global: "picture not found" } })
            }
        })
    })

export default router