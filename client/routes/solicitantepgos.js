var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

var Solicitante = require('../models/solicitante');




app.get('/:id/:status', (req, res) => {
    // var id = req.body.id;
    var id = req.params.id;
    console.log('aqui estoy 2', id);

    Solicitante.find({ idusuario: id }, (err, solicitante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }


        res.status(200).json({
            ok: true,
            solicitante: solicitante
        })


    });


});





// aqui lo que ahce es finalziar le proceso de receesion de documentso de lander y otros
app.put('/actualiza/:id/:archivo/:finalizado', (req, res) => {
    console.log
    var id = req.params.id;
    var tienepdf = req.params.archivo; // es un boolean que indica si tiene insertado un archivo
    var finalizado = req.params.finalizado; // indica si ya se termono de atender la solicitud 








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



        //  solicitanteActualizado.tienepdf = true;
        solicitanteActualizado.procesado = finalizado;




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