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
        city: { type: Number, unit: "l/100km", fractions: 1 },
        country: { type: Number, unit: "l/100km", fractions: 1 },
        combined: { type: Number, unit: "l/100km", fractions: 1 },
    },
    maxSpeed: { type: Number, fractions: 0, unit: "km/h" },
    acc0to100: { type: Number, unit: "s" },
    acc80to100: { type: Number, unit: "s" },
    acc80to120: { type: Number, unit: "s" },
    torque: {
        torque: { type: Number, fractions: 0, unit: "Nm" },
        rpm: { type: Number, fractions: 0, unit: "RPM" },
    },
    noise: {
        still: { type: Number, fractions: 0, unit: "dbA" },
        drive: { type: Number, fractions: 0, unit: "dbA" },
    },
    range: { type: Number, fractions: 0 },
    co2Emission: { type: Number, fractions: 0 },
}

export default EngineSchema