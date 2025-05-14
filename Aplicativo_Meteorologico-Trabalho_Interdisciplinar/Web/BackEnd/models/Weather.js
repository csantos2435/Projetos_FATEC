const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name_city: {
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
        hora12:{
            type: Number,
            required: true 
        },
        hora15:{
            type: Number,
            required: true 
        },
        hora19:{
            type: Number,
            required: true 
        },
        hora23:{
            type: Number,
            required: true 
        },
        hora4:{
            type: Number,
            required: true 
        }
    }
})
module.exports = mongoose.model('Weather', schema, 'weather')
