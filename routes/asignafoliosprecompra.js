var express = require('express');

var app = express();

var Folioconsecutivo = require('../models/folioprecompra');
var moment = require('moment');













//====================================
// Actualziar solcitante
//===============================

app.get('/:id', (req, res) => {

    var idfolio = req.params.id;


    Folioconsecutivo.findById(idfolio, (err, folioconsecutivo) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar folio',
                errors: err
            })
        }


        if (!folioconsecutivo) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe solicitantes',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }

















        folioconsecutivo.folioconsecutivo = folioconsecutivo.folioconsecutivo + 1;
        var fechaactual = moment().format("YYMMDD");
        folioconsecutivo.fecha = fechaactual;
        folioconsecutivo.save((err, folioActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }


            res.status(200).json({

                foliactual: folioActualizado
            });


        });





    });
});





module.exports = app;