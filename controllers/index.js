const controllerUsuario = require('./controller.Usuario');
const controllerPaciente = require('./controller.Paciente');

module.exports = {
    Usuarios: controllerUsuario,
    Pacientes: controllerPaciente
}