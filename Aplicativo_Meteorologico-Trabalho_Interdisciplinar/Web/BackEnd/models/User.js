const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true  
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('User', schema, 'user')