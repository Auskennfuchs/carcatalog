import mongoose from 'mongoose'
import Engine from './engine'

var shapes = ['limousine', 'sedan', 'cabrio', 'pickup', 'van', 'bus']

var CarSchema = new mongoose.Schema({
    name: String,
    manufacture: String,
    shape: { type: String, enum: shapes },
    hsn: String,
    tsn: String,
    engine: Engine
})

export default mongoose.model("Car", CarSchema)