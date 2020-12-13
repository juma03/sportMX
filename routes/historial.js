var express = require("express");
var app = express();
var moment = require("moment");

var mdAutentication = require("../middleware/autentication");

var Solicitante = require("../models/solicitante");
var Pescador = require("../models/pescador");

app.get("/historial/:desde/:finicial/:ffinal", (req, res) => {
  var desde = req.params.desde || 0;
  console.log("inicio de paginacion", desde);
  desde = Number(desde);

  anoseleccion1 = 2020;

  //

  //  const fechaFinal = fechaInicial.substring(0, 8).concat(Number(fechaInicial.substring(8)) + 1);

  // startDate = new Date(anoseleccion1, 06, 04, 00(), 00, 00);

  startDate = new Date(req.params.finicial);
  endDate = new Date(req.params.ffinal);

  startDate = moment(startDate);
  endDate = moment(endDate);

  const startDate2 = moment(startDate).add(23, "hours").add(59, "minutes");
  // endDate = new Date(anoseleccion1, 07, 07, 23, 59, 00);

  console.log("nueva fecha1", startDate);
  console.log("nueva fecha2", endDate);

  console.log(
    "nueva fecha11",
    new Date(new Date(startDate).setHours(-05, 00, 00))
  );
  console.log(
    "nueva fecha22",
    new Date(new Date(endDate).setHours(18, 59, 00))
  );

  Pescador.find(
    {
      creado: {
        $gte: new Date(new Date(startDate).setHours(-05, 00, 00)),
        $lte: new Date(new Date(endDate).setHours(18, 59, 00)),
      },
    },
    (err, pescador) => {
      Solicitante.populate(
        pescador,
        {
          path: "idsolicitante",
        },
        (err, pescador) => {
          Pescador.count({}, (err, conteo) => {
            res.status(200).json({
              ok: true,
              pescador: pescador,
              // totalregistros: conteo
            });
          });
        }
      );
    }
  )
    .sort({ creado: 1 })
    .skip(desde);

  // }).where({
  //     creado: { $gte: new Date('2020-07-03T00:00:00.00Z'), $lte: new Date('2020-07-03T23:59:00.00Z') }
  // }).sort({ 'creado': -1 }).skip(desde).limit(5);
});

module.exports = app;
