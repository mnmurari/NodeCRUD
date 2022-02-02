const express = require('express');
const router = express.Router();
const Paciente = require('../models/paciente');
const validaToken = require('../middleware/validaToken');

router.use(validaToken);

router.get('/', async (req, res) => {
    try {
        const pacientes = await Paciente.findAll();
        return res.send({pacientes});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Listar os Pacientes: ' + err});
    }
});

router.get('/:idPaciente', async (req, res) => {
    id = req.params.idUsuario;
    try {
        const paciente = await Paciente.findOne({where:{id: id}});
        return res.send({paciente});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Listar o Paciente: ' + err});
    }
});

router.post('/', async (req, res) => {
    const {cpf} = req.body;
    try {
        if (await Paciente.findOne({where:{cpf: cpf}}))
            return res.status(400).send({error: 'Paciente já cadastrado!'});

        const paciente = await Paciente.create(req.body);
        return res.send(paciente);
    } catch (err) {
        return res.status(400).send({error: 'Falha ao cadastrar o Paciente: ' + err});
    }
});

router.put('/:idPaciente', async (req, res) => { 
    const {id} = req.body; 
    try {
        if (!await Paciente.findOne({where:{id: id}}))
            return res.status(400).send({error: 'Paciente Inexistente!'});           
        const paciente = await Paciente.update(req.body, {where: {id: id}});
        return res.send({paciente});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Atualizar o Paciente: ' + err});
    }    
});

router.delete('/:idPaciente', async (req, res) => {
    id = req.params.idPaciente;
    try {
        if (!await Paciente.findOne({where:{id: id}}))
            return res.status(400).send({error: 'Paciente Inexistente!'});  

        const paciente = await Paciente.destroy({where:{id: id}});
        return res.status(200).send({status: "Paciente deletado com sucesso!"});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Deletar o Paciente: ' + err});
    }
});

module.exports = router;