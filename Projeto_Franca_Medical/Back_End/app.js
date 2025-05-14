// Carregar as variáveis de ambeintea partir do arquivo .env
require('dotenv').config()

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


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
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);

/*************************************
 * ROTAS
**************************************/

const medicoRouter = require('./routes/medicos')
app.use('/Medico', medicoRouter)

const administradorRouter = require('./routes/administradores')
app.use('/criarUsuario', administradorRouter)

const pacienteRouter = require('./routes/pacientes')
app.use('/Paciente', pacienteRouter)

const agendarRouter = require('./routes/agendas')
app.use('/agendarConsulta', agendarRouter)

module.exports = app;
