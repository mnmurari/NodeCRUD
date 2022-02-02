const express = require('express');
const router = express.Router();
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokenConfig = require("../config/token.json");
const validaToken = require('../middleware/validaToken');

function gerarToken(params = {}){
    return jwt.sign(params, tokenConfig.secret, {expiresIn: 86400});
};

router.post('/', async (req, res) => {
    const {email} = req.body;
    try {
        if (await Usuario.findOne({where:{email: email}}))
            return res.status(400).send({error: 'E-mail já cadastrado!'});

        const usuario = await Usuario.create(req.body);
        return res.send({usuario, token: gerarToken({id: usuario.id})});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao cadastrar o Usuário: ' + err});
    }
});

router.post('/login', async (req, res) => {
    const {email, senha} = req.body;
    const usuario = await Usuario.findOne({where:{email: email}});
    if (!usuario)
        return res.status(400).send({error: 'Usuário não encontrado!'});

    if (! await bcrypt.compare(senha, usuario.senha))
        return res.status(400).send({error: 'Senha Inválida!'});

    return res.send({usuario, token: gerarToken({id: usuario.id})});
});


router.use(validaToken);

router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        return res.send({usuarios});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Listar os Usuários: ' + err});
    }
});

router.get('/:idUsuario', async (req, res) => {
    id = req.params.idUsuario;
    try {
        const usuario = await Usuario.findOne({where:{id: id}});
        return res.send({usuario});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Listar o Usuário: ' + err});
    }
});

router.put('/:idUsuario', async (req, res) => { 
    const {id} = req.body; 
    try {
        if (!await Usuario.findOne({where:{id: id}}))
            return res.status(400).send({error: 'Usuário Inexistente!'});           
        const usuario = await Usuario.update(req.body, {where: {id: id}});
        return res.send({usuario});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Atualizar o Usuário: ' + err});
    }    
});

router.delete('/:idUsuario', async (req, res) => {
    id = req.params.idUsuario;
    try {
        if (!await Usuario.findOne({where:{id: id}}))
            return res.status(400).send({error: 'Usuário Inexistente!'});  

        const usuario = await Usuario.destroy({where:{id: id}});
        return res.status(200).send({status: "Usuário deletado com sucesso!"});
    } catch (err) {
        return res.status(400).send({error: 'Falha ao Deletar o Usuário: ' + err});
    }
});


module.exports = app => app.use('/usuario', router);