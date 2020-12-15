var express = require('express');

var app = express();

var Folioconsecutivo = require('../models/folio');
var Folioconsecutivopre = require('../models/folioprecompra');
var moment = require('moment');







//====================================
// Actualziar folio de precompra
//===============================




app.get('/folioprecompra/:id', (req, res) => {

    var idfolio = req.params.id;


    Folioconsecutivopre.findById(idfolio, (err, folioconsecutivopre) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar folio',
                errors: err
            })
        }


        if (!folioconsecutivopre) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe solicitantes',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }



        

        folioconsecutivopre.folioconsecutivo = folioconsecutivopre.folioconsecutivo + 1;

        

        // var fechaactual = yyyy + '' + mm + '' + dd;

        var fechaactual = moment().format("YYMMDD");


        folioconsecutivopre.fecha = fechaactual;
        folioconsecutivopre.save((err, folioActualizado) => {

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




app.post("/", (req, res) => {
    var body = req.body;
   
    var folioconsecutivopre = new Folioconsecutivopre({
        folioconsecutivo: body.folioconsecutivo,
        fecha: body.fecha
    });
  
    folioconsecutivopre.save((err, folioconsecutivopreguardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al crear solicitantes",
          errors: err,
        });
      }
  
      // Crear un token!!!!
      //   var token = jwt.sign({ movimiento: solicitanteGuardado }, SEED, { expiresIn: 14400 });
  
      res.status(200).json({
        ok: true,
        folioconsecutivopreguardado
       
      });
    });
  });





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

        // var hoy = moment().format("DD-MM-YYYY"); 
        // var dd = ("0" + (hoy.getDate() + 1)).slice(-2);
        // var mm = ("0" + (hoy.getMonth() + 1)).slice(-2)
        // var yyyy = hoy.getFullYear().toString().substr(-2);

        // var fechaactual = yyyy + '' + mm + '' + dd;

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