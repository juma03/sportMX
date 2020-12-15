var express = require('express');
var app = express();
var Folioconsecutivo = require('../models/folio');



module.exports = function solicitaFolioSiguiente(req, res) {

    // return "hello word"
    busqueda = "5e4c9ef57beb146834605c14";

    Folioconsecutivo.findById(busqueda, (err, folioconsecutivo) => {
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

        var hoy = new Date();
        var dd = ("0" + (hoy.getDate() + 1)).slice(-2);
        var mm = ("0" + (hoy.getMonth() + 1)).slice(-2)
        var yyyy = hoy.getFullYear();

        var fechaactual = yyyy + '' + mm + '' + dd;


        folioconsecutivo.fecha = fechaactual;
        folioconsecutivo.save((err, folioActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }


            return res.status(200).json({
                foliactual: folioActualizado.fecha + "-" + folioActualizado.folioconsecutivo
            });


        });





    });
    // return 'hola';
}