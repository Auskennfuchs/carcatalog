import mongoose from 'mongoose'
import Engine from './engine'

var vehicleTypes = ['car','truck']
var vehicleShapes = ['limousine', 'sedan', 'cabrio', 'pickup', 'van', 'bus']
var backTypes = ['hothatch','limousine']

var Body = {
    shape: { type: String, enum: vehicleShapes },
    doors: Number,
    backType: {type: String, enum: backTypes},
    seats: Number,
    tire : {
        front: String,
        back: String,
    },
    weight: {
        total: Number,
        self: Number,
    },    
}

var CarSchema = new mongoose.Schema({
    type: {type: String, enum: vehicleTypes, required: true},
    name: {type: String, maxLength: 50, required: true},
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
    basePrice: Number,
    constructionTime: {
        from: Date,
        to: Date,
    },
    insurance: {
        liability: Number, 
        fullCover: Number,
        partialCover: Number,
    },    
    engine: Engine,
    body: Body
})

export default mongoose.model("Car", CarSchema)