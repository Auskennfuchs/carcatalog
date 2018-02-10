import express from 'express'
import Car from '../models/car'
import Engine from '../models/engine'

var router = express.Router()

router.use((req, res, next) => {
    console.log('something is happening')
    next()
})

router.route('/cars')
    .get((req, res) => {
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
            if (err) {
                res.status(404).jsonp({ errors: { global: err } })
            }
            Object.assign(car, req.body)
            car.save((err, car) => {
                if (err) {
                    res.status(500).jsonp({ errors: { global: err } })
                }
                res.status(200).jsonp(car)
            })
        })
    })

export default router