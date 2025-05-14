const mongoose = require('mongoose')

const schema = mongoose.Schema({
  funcionario: {
    type: mongoose.ObjectId,
    ref: 'Funcionario', 
    require: true   
  },
  cliente: {
    type: mongoose.ObjectId,
    ref: 'Cliente', 
    require: true   
  },
  servico: {
    type: mongoose.ObjectId,
    ref: 'Servico', 
    require: true   
  },
  observacao: {
    type: String,
    require: false
  }
})

/*
  Parâmetros de mongoose.model:
  1º: nome da model, para uso interno (convenção: primeira letra maiúscula e singular)
  2º: relação de campos do esquema (constante schema)
  3º: nome da collection no banco de dados (convenção: mesmo nome do model, mas com
      letra minúscula e no plural)
*/
module.exports = mongoose.model('Agendamento', schema, 'agendamentos')