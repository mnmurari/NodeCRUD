const conexao  = require('../database/index');

const Paciente = conexao.sequelize.define('pacientes', {
    id:{
        type: conexao.Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: conexao.Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: conexao.Sequelize.STRING,
        allowNull: false
    },    
    email:{
        type: conexao.Sequelize.STRING,
        allowNull: false
    },
    nascimento:{
        type: conexao.Sequelize.DATE,
        allowNull: false,
    },
    etina:{
        type: conexao.Sequelize.STRING,
        allowNull: false
    }
});

//Paciente.sync({alter: true});

module.exports = Paciente;