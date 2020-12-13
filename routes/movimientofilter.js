var express = require("express");

var app = express();
var ignoranull;
var Entransito = require("../models/entransito");
var Movimiento = require("../models/movimiento");

var moment = require('moment');



//====================================
// crear nuevo solcitante
//===============================


//====================================
// listado de toodos los movimienots
//===============================



app.get("/:nombrebarco/:desde/:hasta", (req, res) => {
  let nombrebarco = req.params.nombrebarco;
  startDate = new Date(req.params.desde);
  endDate = new Date(req.params.hasta);

  startDate = moment(startDate).add(1, 'days');
  endDate = moment(endDate).add(1, 'days');

  console.log ('fecha inicial', startDate);
  console.log (endDate);




Movimiento.find({ fecha: {
          $gte: new Date(new Date(startDate).setHours(-05, 00, 00)),
          $lte: new Date(new Date(endDate).setHours(24, 59, 00))
      } }, (err, movimiento) => {
  if (err) {
    return res.status(500).json({
      ok: false,
      mensaje: "Error cargando solicitantes",
      errors: err,
    });
  }

  res.status(200).json({
    ok: true,
    movimiento
   
  });




  
  


});

});


module.exports = app;


