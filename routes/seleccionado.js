var express = require('express');
var app = express();

var Movimiento = require('../models/movimiento');

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


        if (solicitanteencontrado.seleccionado !== "LIBRE") {
            console.log(solicitanteencontrado.seleccionado);
            if (solicitanteencontrado.seleccionado === body.seleccionado) {
                return res.status(200).json({
                    ok: true,
                    //   mensaje: 'no existe solicitantes',
                    //    errors: { mensaje: 'no existe solicitantes' }
                })

            } else {

                return res.status(200).json({
                    ok: false,
                    //   mensaje: 'no existe solicitantes',
                    //    errors: { mensaje: 'no existe solicitantes' }
                })

            }


        }




        solicitanteencontrado.seleccionado = body.seleccionado;
        solicitanteencontrado.save((err, solicitanteactualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }




            res.status(200).json({
                ok: true
                    // solicitante: solicitanteactualizado
            });

        });



    });

});





app.put('/actualizapdf/:id', (req, res) => {

    var id = req.params.id;
    console.log ('idientificsdo imagen', id);
    var body = req.body;

    Solicitante.findById(id, (err, solicitanteencontrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar solicitante',
                errors: err
            })
        }





       

        solicitanteencontrado.nombrearchivopdf = body.nombrearchivopdf;
        solicitanteencontrado.save((err, solicitanteactualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }




            // aqui se actuaizara el nombre dle archivo en la tabla de movimienots del los lander
            var deprecompra = solicitanteactualizado.vienedemodulo;

            if (deprecompra ==="PRECOMPRA") {
                 var numerofolio = solicitanteactualizado.numeroperacion;
            console.log ('idientificsdo numerofolio', solicitanteactualizado);

            Movimiento.findOne({numeroperacion: numerofolio}, (err, movimientoencontrado) => {
                movimientoencontrado.licenciaspdf = body.nombrearchivopdf;
                movimientoencontrado.save((err,  actualizado ) => {    


            res.status(200).json({
                ok: true
                    // solicitante: solicitanteactualizado
            });
        });
        });
            } else {
                res.status(200).json({
                    ok: true
                        // solicitante: solicitanteactualizado
                });
            }
           

        });



    });

});












module.exports = app;