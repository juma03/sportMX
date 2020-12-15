var express = require("express");

var app = express();

var Barcos = require("../models/barcos");



app.get("/:busqueda", (req, res) => {
  let busqueda = req.params.busqueda;
  console.log("node", busqueda);

  Barcos.find({ idempresa: busqueda }, (err, barcos) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando solicitantes",
        errors: err,
      });
    }

    res.status(200).json({
      ok: true,
      barcos: barcos,
    });
  }).sort({'nombrebarco':1});
});




//====================================
// crear nuevo solcitante
//===============================

app.post("/", (req, res) => {
  var body = req.body;
  console.log("cuerpo del solicitante2", body);
  //   var logSomething = require('./visualizafolio');

  var barcos = new Barcos({
   idempresa: body.idempresa,
   nombrebarco: body.nombrebarco
  });

  barcos.save((err, barcosGuardado) => {
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
      barcosGuardado: barcosGuardado
     
    });
  });
});

module.exports = app;
