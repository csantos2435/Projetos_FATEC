const mongoose = require('mongoose')

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true  // Campo obigatório
  },
  state: {
    type: String,
    required: false
  },
  country: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('City', schema, 'city')