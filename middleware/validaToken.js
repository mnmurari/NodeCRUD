const jwt = require('jsonwebtoken');
const tokenConfig = require("../config/token.json");

module.exports = (req, res, next) => {
    const tokenHeader = req.headers.token;

    if (!tokenHeader)
        return res.status(401).send({ error: 'O token não foi informado!' });

    const parts = tokenHeader.split(' ');
    if (!parts.length === 2)
        return res.status(401).send({ error: 'Formato do token inválido!' });

    const [prefixo, token] = parts;
    if (!/^Bearer$/i.test(prefixo))
        return res.status(401).send({ error: 'Formato do token inválido!' });

    jwt.verify(token, tokenConfig.secret, (err, decode) => {
        if (err) return res.status(401).send({ error: 'Token inválido!' });
        req.userId = decode.id;
        return next();
    })
}