var express = require("express");
const { Model, Mongoose } = require("mongoose");

var moment = require('moment-timezone');
moment().tz('America/Los_Angeles').format();



var app = express();

var Movimiento = require("../models/movimiento");
var Folioconsecutivo = require('../models/folio');

var folioconsecutivomovimiento;

//====================================
// crear nuevo solcitante
//===============================

app.post("/", async (req, res, next) => {
  var body = req.body;

 




  try {
    // const foliolocalizado = await  self.buscandofolio('5e4c9ef57beb146834605c14');
    const folioconsecutivo = await Folioconsecutivo.find ({_id: '5e4c9ef57beb146834605c14'});
    
    if (folioconsecutivo) {
      let folioactual = folioconsecutivo[0].folioconsecutivo;

     // let fechaactual = moment().toString();
     console.log ('fecha actualizada', moment().toString())
     var now = moment();
     console.log ('fecha nuevo formato', now)
     let fechaactual = moment().format('YYMMDD');

     folioconsecutivomovimiento = fechaactual.concat('-', folioactual );

    }



    var movimiento = new Movimiento({
      idusuario: body.idusuario,
      email: body.email,
      fecha: body.fecha,
      barco: body.barco,
      concepto: body.concepto,
      lcompradas: body.lcompradas,
      lsolicitado: body.lsolicitado,
      entransito: body.entransito,
      ldisponible: body.ldisponible,
      numerosolicitud: body.numerosolicitud,
      numeroperacion: folioconsecutivomovimiento
  
    });


    console.log ('nuevo cuerpo', movimiento)


    
    const ret = await movimiento.save();
    console.log (ret.barco);
    res.json(ret);
    
  } 
  
  

  

  
  catch (error) {
    console.log(error);
  }
});

//====================================
// listado de toodos los movimienots
//===============================

app.get("/:busqueda", (req, res) => {
  let busqueda = req.params.busqueda;
  console.log("node", busqueda);

  Movimiento.find({ idusuario: busqueda }, (err, movimiento) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando solicitantes",
        errors: err,
      });
    }

    res.status(200).json({
      ok: true,
      movimiento: movimiento,
    });
  }).sort({ idmovimiento: 1 });
});





module.exports = app;
