const mongoose = require('mongoose')

const schema = mongoose.Schema({
  descricao: {
    type: String,
    required: true  
  },
  preco: {
    type: Number,
    min: 0.01,
    require: true 
  },
  observacao: {
    type: String,
    required: false
  },
  disponivel: {
    type: mongoose.ObjectId,
    ref: 'Disponivel', // Nome do model relacionado
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
module.exports = mongoose.model('Servico', schema, 'servicos')