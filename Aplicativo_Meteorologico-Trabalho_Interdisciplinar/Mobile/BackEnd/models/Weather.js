const mongoose = require('mongoose')

const schema = mongoose.Schema({
    id_city: {
        type: String,
        required: true  
    },
    longitude: {
        type: Number,
        required: true  
    },
    latidute: {
        type: Number,
        required: false
    },
    climate: {
        type: String,
        required: true
    },
    temperature: {
        type: Number,
        required: true
    },
    temperature_min: {
        type: String,
        required: true
    },
    temperature_max: {
        type: String,
        required: true
    },
    pressure: {
        type: Number,
        required: true
    },
    humidity: {
        type: Number,
        required: true
    },
    visibility: {
        type: Number,
        required: true
    },
    data: {
        type: Date,
        required: true
    },
    dia: {
        type: String,
        required: true
    },
    horarioDia:{
        12:{
            type: Number,
            required: true 
        },
        15:{
            type: Number,
            required: true 
        },
        19:{
            type: Number,
            required: true 
        },
        23:{
            type: Number,
            required: true 
        },
        4:{
            type: Number,
            required: true 
        }
    }
})
module.exports = mongoose.model('Weather', schema, 'weather')
