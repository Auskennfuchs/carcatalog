import mongoose from 'mongoose'

var engineTypes = ['otto', 'diesel']
var driveTypes = ['front', 'back', 'awd_permanent']
var fuelTypes = ['petrol95', 'petrol98', 'diesel']
var gearTypes = ['tiptronic', 'manual', 'dsg']

var EngineSchema = {
    type: { type: String, enum: engineTypes },
    power: {
        ps: { type: Number, fractions: 0, unit: "PS" },
        kw: { type: Number, fractions: 0, unit: "KW" },
        rpm: { type: Number, fractions: 0, unit: "RPM" },
    },
    cylinder: String,
    capacity: { type: Number, fractions: 0, unit: "cm³" },
    drive: { type: String, enum: driveTypes },
    gears: { type: Number, fractions: 0 },
    gearType: { type: String, enum: gearTypes },
    fuel: { type: String, enum: fuelTypes },
    consumption: {
        city: Number,
        country: Number,
        combined: Number,
    },
    maxSpeed: { type: Number, fractions: 0 },
    acc0to100: { type: Number, unit:"s" },
    acc80to100: { type: Number, unit:"s" },
    acc80to120: { type: Number, unit:"s" },
    torque: {
        torque: { type: Number, fractions: 0 },
        rpm: { type: Number, fractions: 0 },
    },
    noise: {
        still: Number,
        drive: Number,
    },
    range: { type: Number, fractions: 0 },
    co2Emission: { type: Number, fractions: 0 },
}

export default EngineSchema