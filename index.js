const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/usuario', controllers.Usuarios);
app.use('/paciente', controllers.Pacientes);


app.listen(8081, function(){
    console.log("Servidor rodando na porta 8081!")
});