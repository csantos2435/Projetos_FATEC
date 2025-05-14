// Carregar as variáveis de ambiente a partir do arquivo .env
require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Conectar ao banco de dados
require('./config/database')()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*************************
 * ROTAS
 *************************/

const funcionarioRouter = require('./routes/funcionarios')
app.use('/funcionarios', funcionarioRouter)

const clienteRouter = require('./routes/cliente')
app.use('/clientes', clienteRouter)

const disponivelRouter = require('./routes/disponivel')
app.use('/disponivel', disponivelRouter)

const servicoRouter = require('./routes/servico')
app.use('/servicos', servicoRouter)

const agendamentoRouter = require('./routes/agendamento')
app.use('/agendamentos', agendamentoRouter)

module.exports = app;
