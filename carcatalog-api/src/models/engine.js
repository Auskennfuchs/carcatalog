import mongoose from 'mongoose'

var engineTypes = ['otto', 'diesel']
var driveTypes = ['front', 'back', 'awd_permanent']
var fuelTypes = ['petrol95', 'petrol98', 'diesel']

var EngineSchema = {
    type: { type: String, enum: engineTypes },
    power: {
        ps: Number,
        kw: Number,
        rpm: Number
    },
    cylinder: String,
    capacity: Number,
    drive: { type: String, enum: driveTypes },
    gears: Number,
    fuel: { type: String, enum: fuelTypes },
    consumptions: {
        city: Number,
        country: Number,
        combined: Number,
    },
    maxSpeed: Number,
    acc0to100: Number,
    acc80to100: Number,
    acc80to120: Number,
    torque: {
        torque: Number,
        rpm: Number,
    },
    noise: {
        stand: Number,
        drive: Number,
    },    
}

export default EngineSchema