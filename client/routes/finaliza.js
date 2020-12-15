var express = require('express');
var app = express();
var Solicitante = require('../models/solicitante');









app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Solicitante.findById(id, (err, solicitanteencontrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar solicitante',
                errors: err
            })
        }


        if (!solicitanteencontrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe solicitantes',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }



        solicitanteencontrado.procesado = body.procesado;
        solicitanteencontrado.save((err, solicitanteactualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }




            res.status(200).json({
                ok: true,
                solicitante: solicitanteactualizado
            });

        });



    });

});
module.exports = app;