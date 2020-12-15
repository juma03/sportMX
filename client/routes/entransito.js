var express = require("express");

var app = express();

var Entransito = require("../models/entransito");





app.get("/borrarentransito/:busqueda", (req, res) => {
  let busqueda = req.params.busqueda;

  Entransito.findOneAndDelete({numeroperacion: busqueda },function(err, result) {
    

    if (!result) {
      return res.status(404).json({
          ok: false,
          mensaje: 'no existe solicitantes',
          errors: { mensaje: 'no existe solicitantes' }
      })
  }

    res.status(200).json({
      ok: true,
      result
    });
   
  })
  
});



app.get("/:busqueda", (req, res) => {
  let busqueda = req.params.busqueda;
  console.log("node", busqueda);

  Entransito.find({ idempresa: busqueda }, (err, entransito) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando ",
        errors: err,
      });
    }

    res.status(200).json({
      ok: true,
      entransito,
    });
  });
});








//====================================
// crear nuevo solcitante
//===============================

app.post("/", (req, res) => {
  var body = req.body;
  console.log("en transito", body);
 

  var entransito = new Entransito({
   idempresa: body.idempresa,
   numeroperacion: body.numeroperacion,
   cantidad: body.cantidad

  });

  entransito.save((err, entransitoGuardado) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error",
        errors: err,
      });
    }

    

    res.status(200).json({
      ok: true,
      entransitoGuardado
     
    });
  });
});

module.exports = app;
