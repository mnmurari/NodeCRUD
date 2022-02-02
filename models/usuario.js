const conexao  = require('../database/index');
const bcrypt = require("bcryptjs");

const Usuario = conexao.sequelize.define('usuarios', {
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
    email:{
        type: conexao.Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    senha:{
        type: conexao.Sequelize.STRING,
        allowNull: false,
    },
    nivel:{
        type: conexao.Sequelize.INTEGER,
        allowNull: false
    }
});

Usuario.addHook('beforeSave', async (Usuario, options) => {
    const hash = await bcrypt.hash(Usuario.senha, 10);
    Usuario.senha = hash
});

//Usuario.sync({alter: true});

module.exports = Usuario;