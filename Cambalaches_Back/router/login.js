const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const connection = require('../app'); 
const { tokenSign } = require('./generateToken')

router.post('/', (req, res) => {
    const nuevoUsuario = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(nuevoUsuario);
    let hash = crypto.createHash('md5');
    hash.update(nuevoUsuario.password);
    let hashMD5 = hash.digest('hex');
    nuevoUsuario.password = hashMD5

    const query = `SELECT * FROM usuario WHERE email = '${nuevoUsuario.email}' AND password = '${nuevoUsuario.password}';`

    connection.query(query, async (error, resultado) => {
        try {

            const tokenSession = await tokenSign(resultado[0]);
            if (resultado.length > 0) {
                console.log("Chido");
                res.json(tokenSession)
            } else {
                res.json(false)
            }

        } catch (error) {

            if (error) return console.error(error.message);

        }
    });
});

module.exports = router;
