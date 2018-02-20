import express from 'express'
import fs from 'fs'

import jwt from 'jsonwebtoken'
import path from 'path'
import multipart from 'connect-multiparty'
import mongoose from 'mongoose'

import Car from '../models/car'
import Engine from '../models/engine'
import Picture from '../models/picture'


var router = express.Router()

/*router.use((req, res, next) => {
    const authorization = req.header("authorization")
    let token
    if (authorization) {
        token = authorization.split(" ")[1]
    }
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("invalid JWT")
                res.status(401).sendFile(path.join(__dirname, '/../index.html'))
            } else {
                next()
            }
        })
    } else {
        next()
    }
})*/

router.use(multipart())

router.route('/cars')
    .get((req, res) => {
        console.log(req.headers)
        Car.find((err, cars) => {
            if (err) {
                res.send(err)
            }
            res.json({ cars })
        })
    })
    .post((req, res) => {
        var car = new Car(req.body)
        car.save((err, car) => {
            if (err) {
                res.status(500).jsonp({ errors: { global: err.message } })
            }
            res.status(200).jsonp(car)
        })
    })

router.route('/cars/:carId')
    .get((req, res) => {
        Car.findById(req.params.carId, (err, car) => {
            if (err || car === null) {
                res.status(404).json({ errors: { global: "car not found" } })
            } else {
                res.json(car)
            }
        })
    })
    .put((req, res) => {
        Car.findById(req.params.carId, (err, car) => {
            if (err || car === null) {
                res.status(404).jsonp({ errors: { global: err } })
            }
            Object.assign(car, req.body)
            car.save((err, car) => {
                if (err) {
                    res.status(500).jsonp({ errors: { global: err } })
                } else {
                    res.status(200).jsonp(car)
                }
            })
        })
    })

router.route('/cars/:carId/picture')
    .post((req, res) => {
        Car.findById(req.params.carId, (err, car) => {
            if (err) {
                res.status(404).jsonp({ errors: { global: err } })
            } else {
                if (req.files.files !== undefined) {
                    if (!Array.isArray(req.files.files)) {
                        req.files.files = [req.files.files]
                    }
                    const promiseList = []

                    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                        chunkSizeBytes: 1024,
                        bucketName: "carpics",
                    })

                    req.files.files.forEach(picture => {
                        const prom = new Promise((resolve, reject) => {
                            fs.createReadStream(picture.path)
                                .pipe(bucket.openUploadStream(picture.name, {
                                    contentType: picture.type
                                }))
                                .on('finish', file => {
                                    console.log(file)
                                    resolve(file._id)
                                })
                                .on('error', err => {
                                    console.log(err)
                                    reject(err)
                                })
                        })
                        promiseList.push(prom)
                    })
                    Promise.all(promiseList).then(values => {
                        if (!Array.isArray(car.pictures)) {
                            car.pictures = []
                        }
                        values.forEach(picId => car.pictures.push(picId))
                        car.save((err, c) => {
                            if (err) {
                                res.status(500).jsonp({ errors: { global: err } })
                            } else {
                                res.status(200).jsonp({ car: c })
                            }
                        })
                    })
                }
            }
        })
    })

router.route('/cars/:carId/picture/:picId')
    .delete((req, res) => {
        Car.findById(req.params.carId, (err, car) => {
            if (err || car === null) {
                res.status(404).jsonp({ errors: { global: err } })
            } else {
                car.pictures = car.pictures.filter(pic => pic != req.params.picId)
                car.save((err, c) => {
                    if (err) {
                        res.status(500).jsonp({ errors: { global: err } })
                    } else {
                        res.status(200).jsonp({ car: c })
                    }
                })
                const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                    chunkSizeBytes: 1024,
                    bucketName: "carpics",
                })
                bucket.delete(new mongoose.Types.ObjectId(req.params.picId))
            }
        })
    })

export default router