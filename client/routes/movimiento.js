var express = require("express");

var app = express();
var ignoranull;
var Entransito = require("../models/entransito");
var Movimiento = require("../models/movimiento");
var Precompras = require("../models/precompra");
var Entrans = require("../models/entransito");
var moment = require('moment');

var objectid = require('objectid');

//====================================
// crear nuevo solcitante
//===============================

app.post("/", (req, res) => {
  var body = req.body;
  console.log("cuerpo del solicitante2", body);
  ignoranull = true;
  //   var logSomething = require('./visualizafolio');

  if (body.idprecompra === null) {
    var movimiento = new Movimiento({
      idusuario: objectid(body.idusuario),
      idempresa: objectid(body.idempresa),
      idpescador: objectid(body.idpescador),
      fecha: moment(),
      barco: body.barco,
      concepto: body.concepto,
      lcompradas: body.lcompradas,
      lsolicitado: body.lsolicitado,
      entransito: body.entransito,
      ldisponible: body.ldisponible,
      numeroperacion: body.numeroperacion

    });

  } else {




    

    var movimiento = new Movimiento({
      idusuario: objectid(body.idusuario),
      idempresa: objectid(body.idempresa),
      idpescador: objectid(body.idpescador),
      idprecompra: objectid(body.idprecompra),
      fecha: moment(),
      barco: body.barco,
      concepto: body.concepto,
      lcompradas: body.lcompradas,
      lsolicitado: body.lsolicitado,
      entransito: body.entransito,
      ldisponible: body.ldisponible,
      numeroperacion: body.numeroperacion

    });


  }






  movimiento.save((err, movimientoGuardado) => {
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
      movimiento: movimientoGuardado,
      id: movimientoGuardado._id,
    });
  });
});





//====================================
// crear nuevo movimienot y disminuye precompra
//===============================

app.post("/solicitudlicencias", (req, res) => {
  var body = req.body;
  console.log("cuerpo del nuevoprocedimeinot", body);

  var idlocalizaempresa = body.idempresa;
  console.log('movimienot', body.idempresa);






  Movimiento.findOne({ idempresa: idlocalizaempresa }, (err, ultimovimiento) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando solicitantes",
        errors: err,
      });
    }



    console.log('ya estoy aqui', ultimovimiento.ldisponible);





    var movimiento = new Movimiento({
      idusuario: objectid(body.idusuario),
      idempresa: objectid(body.idempresa),
      idpescador: objectid(body.idpescador),
      idprecompra: objectid(body.idprecompra),
      fecha: moment(),
      barco: body.barco,
      concepto: body.concepto,
      lcompradas: body.lcompradas,
      lsolicitado: body.lsolicitado,
      entransito: body.entransito,
      ldisponible: Number(ultimovimiento.ldisponible) - Number(body.lsolicitado),
      numeroperacion: body.numeroperacion

    });


    var identificador = movimiento.idprecompra;





    movimiento.save((err, movimientoGuardado) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error al crear solicitantes",
          errors: err,
        });
      }



      // *************************************************


      console.log('nuevo disponibilidad', identificador)


      Precompras.findById(identificador, (err, precompraactualizado) => {

        let nuevadisponabilidad = Number(precompraactualizado.disponibilidad) - Number(movimiento.lsolicitado);
        precompraactualizado.disponibilidad = nuevadisponabilidad;
        


        precompraactualizado.save((err, actualizacionprecompra) => {

          if (err) {
              return res.status(400).json({
                  ok: false,
                  mensaje: 'Error al actualiar solicitante',
                  errors: err
              })
          }

          console.log ('actualizacionprecompra', actualizacionprecompra);
          var nuevadisponibilidad = actualizacionprecompra.disponibilidad

         
res.status(200).json({
        ok: true,
        movimiento: movimientoGuardado,
        id: movimientoGuardado._id,
        inventarioactualizado: nuevadisponibilidad,
      });
        

      });







        
      
      
       
      
      })







      //************************************************ */




     
    });
  













}).sort({ $natural: -1 }).limit(1);





});







// actuailiza el movimeinot agregando el pdf del cliente

app.get('/agregapdf/:id', (req, res) => {
    
  id= req.params.id;
  

  Movimiento.findOne({ idpescador: id }, (err, pescadorpdf) => {
      if (err) {
          return res.status(500).json({
              ok: false,
              mensaje: 'Error cargando solicitantes',
              errors: err
          })
      }

      pescadorpdf.log ('aqui lo encontro', idmovimiento);
      pescadorpdf.enviadoporemail = true;

      pescadoremail.save((err, pescadorrespuesta) => {
      if (err) {
          return res.status(500).json({
              ok: false,
              mensaje: 'Error al crear solicitantes',
              errors: err
          })
      }


      res.status(200).json({
          ok: true,
          pescadorrespuesta
      })



  })


  });


});

















//====================================
// busca en transito
//===============================

app.get("/entransito/:idempresa", (req, res) => {
  let busqueda = req.params.idempresa;
  console.log ('busqueda', busqueda);




    Entransito.find({ idempresa: busqueda }, (err, entransitomovimiento) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          mensaje: "Error cargando solicitantes",
          errors: err,
        });
      }

      console.log ('en transito movimieot', entransitomovimiento);
      res.status(200).json({
        ok: true,
        entransitomovimiento,
      });
    });



});










//====================================
// listado de toodos los movimienots
//===============================

app.get("/:busqueda", (req, res) => {
  let busqueda = req.params.busqueda;
  console.log("node", busqueda);

  Movimiento.find({ idempresa: busqueda }, (err, movimiento) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        mensaje: "Error cargando solicitantes",
        errors: err,
      });
    }




    Entransito.find({ idempresa: busqueda }, (err, entransitomovimiento) => {
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
        entransitomovimiento,
      });
    });

  }).sort({ 'idmovimiento': -1 }).limit(6);




});




app.get("filtro/:nombrebarco/:desde/:hasta", (req, res) => {
  let nombrebarco = req.params.nombrebarco;

  console.log('depende');
  res.status(200).json({
    ok: true,

  });



});








module.exports = app;


