var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

var Solicitante = require('../models/solicitante');
var SEED = require('../config/config').SEED;







//====================================
// crear nuevo solcitante
//===============================




//====================================
// borrr solcitante
//===============================


//====================================
// Actualziar solcitante
//===============================

// app.put('/:id/:numpago/:numstripe/:nombarchivo/:solicitudhtml', (req, res) => {
app.put('/:id/:numpago/:numstripe/:nombarchivo', (req, res) => {

    var id = req.params.id;
    var numpago = req.params.numpago;
    var numstripe = req.params.numstripe;
    var nombreArchivo = req.params.nombarchivo;


    var body = req.body;



    Solicitante.findById(id, (err, solicitanteActualizado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar solicitante',
                errors: err
            })
        }


        if (!solicitanteActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe solicitantes',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }



        solicitanteActualizado.procesarSolicitud = true;
        solicitanteActualizado.numeroperacion = numpago;
        solicitanteActualizado.numeroconfirmacion = numstripe;
        solicitanteActualizado.nombrearchivo = nombreArchivo;



        solicitanteActualizado.save((err, solicitanteActualizado2) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }

            //  var token = jwt.sign({ solicitante: solicitanteActualizado }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                solicitante: solicitanteActualizado2,
                //  token: token
            });

        });



    });

});







module.exports = app;