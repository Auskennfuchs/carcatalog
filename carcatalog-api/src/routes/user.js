import express from 'express'
import bcrypt from 'bcrypt'

import User from '../models/user'

var router = express.Router()


router.route('/')
    .post((req, res) => {
        let user = new User(req.body)
        user.save((err, user) => {
            if (err) {
                res.status(500).jsonp({ errors: { global: err.message } })
            }
            res.status(200).jsonp(user).send()
        })
    })

router.route('/login')
    .post((req, res) => {
        User.findOne({ email: req.body.email }, (err, user) => {
            if (!err && user !== null) {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result) {
                        res.status(200).jsonp(user.toAuthJSON())
                    } else {
                        res.status(403).jsonp({ errors: { global: "login failed" } })
                    }
                })
            } else {
                res.status(403).jsonp({ errors: { global: "login failed" } })
            }
        })
    })

export default router