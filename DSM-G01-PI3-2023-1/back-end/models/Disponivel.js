const mongoose = require('mongoose')

const schema = mongoose.Schema({
  data: {
    type: Date,
    required: true  
  },
  hora:{
    type: String,
    required: true
  },
  local: {
    type: String,
    required: false
  }
})

/*
  Parâmetros de mongoose.model:
  1º: nome da model, para uso interno (convenção: primeira letra maiúscula e singular)
  2º: relação de campos do esquema (constante schema)
  3º: nome da collection no banco de dados (convenção: mesmo nome do model, mas com
      letra minúscula e no plural)
*/
module.exports = mongoose.model('Disponivel', schema, 'disponivel')