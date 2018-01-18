import mongoose from 'mongoose'

var types = ['otto','diesel']

var EngineSchema = {    
    type: {type: String, enum: types},
    powerPS: Number,
    powerKW: Number    
}

export default EngineSchema