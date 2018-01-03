import mongoose from 'mongoose'

var shapes = ['limousine', 'sedan', 'cabrio', 'pickup', 'van', 'bus']

var CarSchema = new mongoose.Schema({
    name: String,
    manufacture: String,
    powerPS: Number,
    powerKW: Number,
    shape: { type: String, enum: shapes },
    hsn: String,
    tsn: String
})

export default mongoose.model("Car", CarSchema)