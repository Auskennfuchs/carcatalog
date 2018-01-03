import express from 'express'
import Car from '../models/car'

var router = express.Router()

router.use((req, res, next) => {
    console.log('something is happening')
    next()
})

router.get('/', (req, res) => {
    res.json({ message: "läuft" })
})

router.post('/cars', (req, res) => {
    var car = new Car()
    car.name = req.body.name
    car.manufacture = req.body.manufacture
    car.powerPS = req.body.powerPS
    car.powerKW = req.body.powerKW
    car.shape = req.body.shape
    car.hsn = req.body.hsn
    car.tsn = req.body.tsn

    car.save((err) => {
        if (err) {
            res.send(err)
        }
        res.json({ message: "Car created" })
    })
})

router.route('/cars')
    .get((req, res) => {
        Car.find((err, cars) => {
            if (err) {
                res.send(err)
            }
            res.json(cars)
        })
    })

router.route('/cars/:carId')
    .get((req, res) => {
        Car.findById(req.params.carId, (err, car) => {
            if (err) {
                res.send(err)
            }
            res.json(car)
        })
    })
    .put((req, res) => {
        Car.findById(req.params.carId, (err, car) => {
            if (err) {
                res.send(err)
            }

            car.name = req.body.name
            car.manufacture = req.body.manufacture
            car.powerPS = req.body.powerPS
            car.powerKW = req.body.powerKW
            car.shape = req.body.shape
            car.hsn = req.body.hsn
            car.tsn = req.body.tsn

            car.save((err) => {
                if (err) {
                    res.send(err)
                }
                res.json({ message: "Car updated" })
            })
        })
    })


export default router