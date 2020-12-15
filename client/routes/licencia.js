var express = require('express');

var app = express();

var Licencia = require('../models/licencia');



//====================================
// obtener todos los pescadores
//===============================

app.get('/', (req, res) => {

    // Licencia.find({}, { _id: 0 }, (err, licencia) => {
    Licencia.find({}, { _id: 0 }, (err, licencia) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            });
        }


        res.status(200).json({
            ok: true,
            licencia: licencia
        });


    }).sort({ idpermiso: 1 });


});






//====================================
// obtener todos los precios d ela slicencias
//===============================

app.get('/listaprecioslic', (req, res) => {

    // Licencia.find({}, { _id: 0 }, (err, licencia) => {
    Licencia.find({ descripcion: { $ne: "Excursion" } }, (err, licencia) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            });
        }


        res.status(200).json({
            ok: true,
            licencia: licencia
        });


    }).sort({ idpermiso: 1 });


});







app.get('/pagina', (req, res) => {

    // Licencia.find({}, { _id: 0 }, (err, licencia) => {
    Licencia.find({}, { _id: 0 }, (err, licencia) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            });
        }


        res.status(200).json({
            ok: true,
            licencia: licencia
        });


    }).sort({ idpermiso: 1 });


});






module.exports = app;