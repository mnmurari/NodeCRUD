const Sequelize = require("sequelize");
const sequelize = new Sequelize('cadastro', 'root', 'Mnmurari0846', { host: "localhost", dialect: 'mysql' });

sequelize.authenticate().then(function () {
    console.log("Conectado com sucesso ao banco de dados!")
}).catch(function (erro) {
    console.log("Falha ao se conectar no banco de dados: " + erro);
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
