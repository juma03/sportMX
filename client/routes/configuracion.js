var express = require("express");

var app = express();

var Configuracion = require("../models/configuracion");

//====================================
// crear nuevo solcitante
//===============================

app.post("/", (req, res) => {
  var body = req.body;
 

  var configuracion = new Configuracion({
    identificador: body.identificador,
    modo_mantenimiento: body.modo_mantenimiento,
  
  });

  configuracion.save((err, configuracionGuardado) => {
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
      configuracionGuardado: configuracionGuardado,
      // id: movimientoGuardado._id
    });
  });
});





app.get('/', (req, res) => {
  // let busqueda = req.params.busqueda;
  //   console.log('node', busqueda)

  Configuracion.find({identificador: 1},(err, showconfiguracion) => {
          if (err) {
              return res.status(500).json({
                  ok: false,
                  mensaje: 'Error cargando solicitantes',
                  errors: err
              })
          }


          res.status(200).json({
              ok: true,
              showconfiguracion: showconfiguracion
          })


      });


});












//====================================
// Actualziar solcitante
//===============================

app.put('/:id', (req, res) => {

  var id = req.params.id;
  console.log (id);
  var body = req.body;
  console.log (body)

  Configuracion.find({ identificador: id }, (err, configuracionActualizado) => {


      if (err) {
          return res.status(500).json({
              ok: false,
              mensaje: 'Error al buscar solicitante',
              errors: err
          })
      }


      if (!configuracionActualizado) {
          return res.status(400).json({
              ok: false,
              mensaje: 'no existe solicitantes',
              errors: { mensaje: 'no existe solicitantes' }
          })
      }



     
      configuracionActualizado.modomantenimiento = body.modomantenimiento;
   


      configuracionActualizado.save((err, configuracionActualizado) => {

          if (err) {
              return res.status(400).json({
                  ok: false,
                  mensaje: 'Error al actualiar solicitante',
                  errors: err
              })
          }

       

          res.status(200).json({
              ok: true,
              configuracionActualizado: configuracionActualizado,
            //  token: token
          });

      });



  });

});



module.exports = app;
