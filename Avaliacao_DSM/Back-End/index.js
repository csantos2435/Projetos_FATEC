const express = require('express');
const mongoose = require('mongoose');
const server = express();

const funcionarioRoutes = require('./routes/funcionarioRoutes');

server.use(
    express.urlencoded({
         extended: true,
    }),
),

server.use(express.json());
server.use('/funcionario', funcionarioRoutes)

const DB_USER = 'camillir81'
const DB_PASSWORD = encodeURIComponent('camillir81');

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.nbcnbli.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(()=>{
        console.log('Conectado ao MongoDB');
    })
    .catch((err)=> {
        console.log(err)
    })
    
server.listen(3000);