import mongoose from 'mongoose'

var PictureSchema = new mongoose.Schema({
    data: Buffer,
    contentType: String
})

export default mongoose.model("Picture", PictureSchema)