const mongoose = require('mongoose');

const Funcionario = mongoose.model('Funcionario', {
    nome: String,
    telefone: String,
    salario: String,
    endereco: String
});

module.exports = Funcionario;

