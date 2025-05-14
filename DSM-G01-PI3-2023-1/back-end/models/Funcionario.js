const mongoose = require('mongoose')

const schema = mongoose.Schema({
  nome: {
    type: String,
    required: true  
  },
  telefone: {
    type: String,
    required: true
  },
  endereco: {
    type: String,
    required: true
  },
  salario: {
    type: String,
    min: 0.01,
    require: true 
  }
})

/*
  Parâmetros de mongoose.model:
  1º: nome da model, para uso interno (convenção: primeira letra maiúscula e singular)
  2º: relação de campos do esquema (constante schema)
  3º: nome da collection no banco de dados (convenção: mesmo nome do model, mas com
      letra minúscula e no plural)
*/
module.exports = mongoose.model('Funcionario', schema, 'funcionarios')