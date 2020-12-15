var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var app = express();
var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;


app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioBD) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar  usuario',
                errors: err
            });
        }


        if (!usuarioBD) {
            console.log('usuario incorrecto');
            return res.status(400).json({

                ok: false,
                // mensaje: 'credenciales incorrectas',
                // errors: err
            });
        }


        if (!usuarioBD.activado) {
            return res.status(400).json({
                ok: false,

            });
        }


        if (!bcrypt.compareSync(body.password, usuarioBD.password)) {
            console.log('todo bien');
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas-pass',
                errors: err
            });
        }

        usuarioBD.password = ":)";
        var token = jwt.sign({ usuario: usuarioBD }, SEED, { expiresIn: 14400 });


        res.status(200).json({
            ok: true,
            usuario: usuarioBD,
            token: token,
            id: usuarioBD._id,
            empresa: usuarioBD.role,
            nombreEmpresa: usuarioBD.nombreEmpresa
        });




    });



});

module.exports = app;