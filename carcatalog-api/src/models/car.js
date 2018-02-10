import mongoose from 'mongoose'
import Engine from './engine'

var vehicleTypes = ['car', 'truck']
var vehicleShapes = ['limousine', 'sedan', 'cabrio', 'pickup', 'van', 'bus']
var backTypes = ['hothatch', 'limousine']

var Body = {
    shape: { type: String, enum: vehicleShapes },
    doors: { type: Number, fractions: 0 },
    backType: { type: String, enum: backTypes },
    seats: { type: Number, fractions: 0 },
    tire: {
        front: String,
        back: String,
    },
    weight: {
        total: { type: Number, fractions: 0, unit: "kg" },
        self: { type: Number, fractions: 0, unit: "kg" },
    },
}

var CarSchema = new mongoose.Schema({
    type: { type: String, enum: vehicleTypes, required: true },
    name: { type: String, maxLength: 50, required: true },
    manufacture: String,
    series: String,
    model: String,
    codes: {
        manufacture: String,
        kba: {
            hsn: String,
            tsn: String,
        },
        ets: String,
        dat: String,
        afb: String,
    },
    basePrice: { type: Number, fractions: 2, unit:"EUR" },
    constructionTime: {
        from: Date,
        to: Date,
    },
    insurance: {
        liability: { type: Number, fractions: 0 },
        fullCover: { type: Number, fractions: 0 },
        partialCover: { type: Number, fractions: 0 },
    },
    engine: Engine,
    body: Body
})

export default mongoose.model("Car", CarSchema)