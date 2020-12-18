var express = require("express");

var app = express();

var Precompras = require("../models/precompra");
var Empresa = require("../models/empresa");
var Movimiento = require("../models/movimiento");
var Solicitante = require('../models/solicitante');
var Pescador =  require('../models/pescador');

var objectid = require('objectid');
const solicitante = require("../models/solicitante");

//====================================
// crear nuevo solcitante
//===============================


app.get('/ultimomovimiento/:idempresa', (req, res) => {

  let idempresa = req.params.idempresa;

  Precompras.find({ idempresa: idempresa }, (err, precompra) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando solicitantes",
        errors: err,
      });
    }


    // var numeroinventario = precompra[0]._id;

    // Pescador.find({ idinventarios: numeroinventario, decompralicencia: true }, (err, pescador) => {


    //   if (!pescador) {
    //     return res.status(400).json({
    //         ok: false,
    //         mensaje: 'no existe informacion',
    //         errors: { mensaje: 'no existe informacion' }
    //     })
    // }
      
      
  

    // });

   res.status(200).json({
        ok: true,
        precompra
       // pescador
      })


  }).sort({ $natural: -1 }).limit(1);


});





app.get('/buscaultimaprecompra/:idempresa', (req, res) => {

  let idempresa = req.params.idempresa;

  Precompras.find({ idempresa: idempresa }, (err, precompra) => {

    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando solicitantes",
        errors: err,
      });
    }


     var numeroinventario = precompra[0]._id;

     Pescador.find({ idempresa: idempresa, decompralicencia: true }, (err, pescador) => {




      


       if (!pescador) {
         return res.status(400).json({
             ok: false,
             mensaje: 'no existe informacion',
             errors: { mensaje: 'no existe informacion' }
         })
     }


     
    
  var numeroconsecutivo = pescador[0].idpescador;
     


  Pescador.find({ idempresa: idempresa, "idpescador" :  {  $gt :  numeroconsecutivo  }} , (err, solicitudesencontradas) => {

    res.status(200).json({
        ok: true,
        precompra,
        pescador,
        solicitudesencontradas
      })
  });


      
      
  

     }).sort({ $natural: -1 }).limit(1);

   


  }).sort({ $natural: -1 }).limit(1);


});













app.get('/:id', (req, res) => {
  var id = req.params.id;
  console.log ("encontrado precompra");

  Precompras.findById(id)
    .populate('idempresa')
    .exec ( )
    .then (precompra =>{
      if (!precompra) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Error cargando solicitantes',
          errors: err
        })

      }

      
      Movimiento.find({ idprecompra: precompra._id }, (err, movimiento) => {
        if (err) {
          return res.status(500).json({
            ok: false,
            mensaje: "Error cargando solicitantes",
            errors: err,
          });
        }



        res.status(200).json({
          ok: true,
          precompra,
          movimiento
        })

      });

    }) 




  });






app.post("/:id", (req, res) => {


  var identificador = req.params.id;
  console.log ('identificador', identificador);
  var body = req.body;
  console.log("cuerpo del solicitante255555", body);

  if (identificador != 0 &&  identificador !== undefined) {
    console.log('identificador es diferente de cero')
    var identificador = objectid(req.params.id);


    Precompras.findById(identificador, (err, compraanterior) => {

      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando solicitantes",
          errors: err,
        });
      }




      var precompras = new Precompras({
        fecha: body.fecha,
        idusuario: objectid(body.idusuario),
        idempresa: objectid(body.idempresa),
        refenciapaypal: body.refenciapaypal,
        concepto: body.concepto,
        clicencia: body.clicencia,
        emailempresa: body.emailempresa,
        totalpagado: body.totalpagado,
        inventariototal: Number(body.clicencia) + Number(compraanterior.disponibilidad),
        disponibilidad: Number(body.clicencia) + Number(compraanterior.disponibilidad)


      });




      precompras.save((err, precomprasGuardado) => {
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
          precompras: precomprasGuardado,
          cantidadanterior: compraanterior.disponibilidad
        });
      });
    });
  } else {
    console.log('identificador es igual cero')
    var precompras = new Precompras({
      fecha: body.fecha,
      idusuario: objectid(body.idusuario),
      idempresa: objectid(body.idempresa),
      refenciapaypal: body.refenciapaypal,
      concepto: body.concepto,
      clicencia: body.clicencia,
      emailempresa: body.emailempresa,
      totalpagado: body.totalpagado,
      inventariototal: body.clicencia,
      disponibilidad: body.clicencia

    });



    precompras.save((err, precomprasGuardado) => {
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
        precompras: precomprasGuardado,
        // id: movimientoGuardado._id
      });
    });





  }





});













module.exports = app;
