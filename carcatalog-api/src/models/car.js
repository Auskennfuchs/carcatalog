import mongoose from 'mongoose'
import Engine from './engine'

var vehicleTypes = ['car','truck']
var vehicleShapes = ['limousine', 'sedan', 'cabrio', 'pickup', 'van', 'bus']

var CarSchema = new mongoose.Schema({
    type: {type: String, enum: vehicleTypes, required: true},
    name: {type: String, maxLength: 50, required: true},
    manufacture: String,
    series: String,
    model: String,
    shape: { type: String, enum: vehicleShapes },
    codes: {
        manufacture: String,
        hsn: String,
        tsn: String,
        ets: String,
        dat: String,
        afb: String,
    },
    engine: Engine,
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
})

export default mongoose.model("Car", CarSchema)