var express = require('express');
var jwt = require('jsonwebtoken');

var app = express();

var Solicitante = require('../models/solicitante');
var Pescador =  require('../models/pescador');
var Empresa = require("../models/empresa");
var SEED = require('../config/config').SEED;






//====================================
// obtener todos los solicitantes para inventariuales
//===============================

app.get('/inventariar', (req, res) => {

    idempresa ='5f7bf4f8d397b158d01daee0';






    Solicitante.find({ $and: [ {idempresa: idempresa}, {solicitudhtml: 'License Purchase'} ]}).sort({$natural:-1}).limit(1)
    .exec(function(err, solicitante){
        if(err){
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando solicitantes',
                    errors: err
                })
            }
        }else{
            res.status(200).json({
                ok: true,
                solicitante: solicitante
            });
        }
      })




});










//====================================
// obtener todos los solicitantes
//===============================

app.get('/', (req, res) => {

    Solicitante.find({}, (err, solicitante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }


        res.status(200).json({
            ok: true,
            solicitante: solicitante
        });


    });


});








//====================================
// obtener todos los solicitantes con status de pagado y no 
//===============================


app.get('/recibo/:id', (req, res) => {
    var id = req.params.id;

    Solicitante.findById(id, (err, solicitante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }


        var idempresa = solicitante.idempresa;
        var idpescador = solicitante._id;

        Empresa.findById(idempresa, (err, empresa) => {



            Pescador.findOne({idregistro: idpescador }, (err, pescadores) => {

             res.status(200).json({
            ok: true,
            solicitante: solicitante,
            empresa,
            pescadores
        })

            });




            
        });



       


    });


});






app.get('/recibopublico/:id', (req, res) => {
    var id = req.params.id;

    Solicitante.findById(id, (err, solicitante) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }


      
        var idpescador = solicitante._id;


    Pescador.findOne({idregistro: idpescador }, (err, pescadores) => {

             res.status(200).json({
            ok: true,
            solicitante: solicitante,
            pescadores
        })

            });
      



       


    });


});










//====================================
// obtener todos los solicitantes con status de pagado y no 
//===============================

app.get('/pagados', (req, res) => {

    Solicitante.find({ procesarSolicitud: true, procesado: false }).sort({numeroperacion:-1})
        .exec((err, solicitante) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando solicitantes',
                    errors: err
                })
            }


            res.status(200).json({
                ok: true,
                solicitante: solicitante
            })


        });


});






//====================================
// crear nuevo solcitante
//===============================

app.post('/', (req, res) => {
    var body = req.body;
    console.log('cuerpo del solicitante3333', body);
    //   var logSomething = require('./visualizafolio');








    var solicitante = new Solicitante({
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        idusuario: body.idusuario,
        idsolicitante: body.idsolicitante,
        prioridad: body.prioridad,
        solicitudhtml: body.solicitudhtml,
        numeroconfirmacion: body.numeroconfirmacion,
        numeroperacion: body.numeroperacion,
        nombrearchivo: body.nombrearchivo,
        procesarSolicitud: body.procesarSolicitud,
        idempresa: body.idempresa,
        vienedemodulo: body.vienedemodulo
         

    });

    solicitante.save((err, solicitanteGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear solicitantes',
                errors: err
            })
        }

        // Crear un token!!!!
        var token = jwt.sign({ solicitante: solicitanteGuardado }, SEED, { expiresIn: 14400 });


        res.status(200).json({
            ok: true,
            solicitante: solicitanteGuardado,
            token: token,
            id: solicitanteGuardado._id

        })



    })


})





// //====================================
// // crear nuevo solcitante en modulo precompra
// //===============================

// app.post('/precompra/:idultimacompra', (req, res) => {
//     var body = req.body;
//     var idultimacompra = req.params.idultimacompra;
//     console.log('cuerpo del solicitante1', idultimacompra);
//     console.log('cuerpo del solicitante3', body);
  

//     var solicitante = new Solicitante({
//         nombre: body.nombre,
//         email: body.email,
//         telefono: body.telefono,
//         idusuario: body.idusuario,
//         idsolicitante: body.idsolicitante,
//         prioridad: body.prioridad,
//         solicitudhtml: body.solicitudhtml,
//         numeroconfirmacion: body.numeroconfirmacion,
//         numeroperacion: body.numeroperacion,
//         nombrearchivo: body.nombrearchivo,
//         procesarSolicitud: body.procesarSolicitud,
//         nombrearchivo: body.nombrearchivo,
//         procesado: true
         

//     });

//     solicitante.save((err, solicitanteGuardado) => {
//         if (err) {
//             return res.status(500).json({
//                 ok: false,
//                 mensaje: 'Error al crear solicitantes',
//                 errors: err
//             })
//         }

//         // Crear un token!!!!
//         var token = jwt.sign({ solicitante: solicitanteGuardado }, SEED, { expiresIn: 14400 });




//         // aqui se inicializa el pescador para ser procesador

//         var pescador = new Pescador({
//             nombre: 'Landing',
//             apellido: 'Licencia de Dia',
//             tipolicencia: 'Licencia de Dia',
//             costolicencia: body.costolicencia,
//             ciudad: '',
//             estado: '',
//             idsolicitante: solicitanteGuardado._id,
//             idregistro: solicitanteGuardado._id,
//             cantidad: body.cantidad,
//             fechainiciopesca: body.fechainiciopesca
//         });
    
//         pescador.save((err, pescadorGuardado) => {
//             if (err) {
//                 return res.status(500).json({
//                     ok: false,
//                     mensaje: 'Error al crear solicitantes',
//                     errors: err
//                 })
//             }
    
    
//             res.status(200).json({
//                 ok: true,
//                 solicitante: solicitanteGuardado,
//                 idpescador: pescadorGuardado._id,
//                 token: token,
//                 id: solicitanteGuardado._id
    
//             })
    
    
    
//         })



//     })


// })





//====================================
// crear nuevo solcitante en modulo precompra
//===============================


app.post('/precompra/:idultimacompra', (req, res) => {
    var body = req.body;
    var idultimacompra = req.params.idultimacompra;
    console.log('cuerpo del solicitante111111', idultimacompra);
    console.log('cuerpo del solicitante3', body);
  

    var solicitante = new Solicitante({
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        idusuario: body.idusuario,
        idsolicitante: body.idsolicitante,
        prioridad: body.prioridad,
        solicitudhtml: body.solicitudhtml,
        numeroconfirmacion: body.numeroconfirmacion,
        numeroperacion: body.numeroperacion,
        nombrearchivo: body.nombrearchivo,
        procesarSolicitud: body.procesarSolicitud,
        nombrearchivo: body.nombrearchivo,
        procesado: body.procesado,
        deprecompra: true,
        idempresa: body.idempresa,
        vienedemodulo: "PRECOMPRA"
         
    });

    solicitante.save((err, solicitanteGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear solicitantes',
                errors: err
            })
        }

        // Crear un token!!!!
     //   var token = jwt.sign({ solicitante: solicitanteGuardado }, SEED, { expiresIn: 14400 });




        // aqui se inicializa el pescador para ser procesador

        var pescador = new Pescador({
            nombre: 'Landing',
            apellido: 'Licencia de Dia',
            tipolicencia: 'Licencia de Dia',
            costolicencia: body.costolicencia,
            ciudad: '',
            estado: '',
            idsolicitante: solicitanteGuardado._id,
            idregistro: solicitanteGuardado._id,
            cantidad: body.cantidad,
            fechainiciopesca: body.fechainiciopesca,
            deprecompra: true,
            idinventarios: body.idinventarios,
            decompralicencia: body.decompralicencia,
            idempresa: body.idempresa
        });
    
        pescador.save((err, pescadorGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al crear solicitantes',
                    errors: err
                })
            }
    
    
            res.status(200).json({
                ok: true,
                solicitante: solicitanteGuardado,
                idpescador: pescadorGuardado._id,
               // token: token,
                id: solicitanteGuardado._id
    
            })
    
    
    
        })



    })


})







app.post('/compralicencias/:idultimacompra', (req, res) => {
    var body = req.body;
    var idultimacompra = req.params.idultimacompra;
    console.log('cuerpo del solicitante111111', idultimacompra);
    console.log('cuerpo del solicitante3', body);
  

    var solicitante = new Solicitante({
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        idusuario: body.idusuario,
        idsolicitante: body.idsolicitante,
        prioridad: body.prioridad,
        solicitudhtml: body.solicitudhtml,
        numeroconfirmacion: body.numeroconfirmacion,
        numeroperacion: body.numeroperacion,
        nombrearchivo: body.nombrearchivo,
        procesarSolicitud: body.procesarSolicitud,
        nombrearchivo: body.nombrearchivo,
        procesado: true
         

    });

    solicitante.save((err, solicitanteGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear solicitantes',
                errors: err
            })
        }

        // Crear un token!!!!
        var token = jwt.sign({ solicitante: solicitanteGuardado }, SEED, { expiresIn: 14400 });




        // aqui se inicializa el pescador para ser procesador

        var pescador = new Pescador({
            nombre: 'Landing',
            apellido: 'Licencia de Dia',
            tipolicencia: 'Licencia de Dia',
            costolicencia: body.costolicencia,
            ciudad: '',
            estado: '',
            idsolicitante: solicitanteGuardado._id,
            idregistro: solicitanteGuardado._id,
            cantidad: body.cantidad,
            fechainiciopesca: body.fechainiciopesca
        });
    
        pescador.save((err, pescadorGuardado) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al crear solicitantes',
                    errors: err
                })
            }
    
    
            res.status(200).json({
                ok: true,
                solicitante: solicitanteGuardado,
                idpescador: pescadorGuardado._id,
                token: token,
                id: solicitanteGuardado._id
    
            })
    
    
    
        })



    })


})





app.post('/respakdo', (req, res) => {
    var body = req.body;
    console.log('cuerpo dle solicitante', body);
    //   var logSomething = require('./visualizafolio');





    var solicitante = new Solicitante({
        nombre: body.nombre,
        email: body.email,
        telefono: body.telefono,
        idusuario: body.idusuario,

        prioridad: body.prioridad


    });

    solicitante.save((err, solicitanteGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear solicitantes',
                errors: err
            })
        }

        // Crear un token!!!!
        var token = jwt.sign({ solicitante: solicitanteGuardado }, SEED, { expiresIn: 14400 });


        res.status(200).json({
            ok: true,
            solicitante: solicitanteGuardado,
            token: token,
            id: solicitanteGuardado._id

        })



    })








})




//====================================
// borrr solcitante
//===============================

app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Solicitante.findByIdAndRemove(id, (err, solicitanteBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar solicitantes',
                errors: err
            })
        }


        if (!solicitanteBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe solicitantes',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }




        res.status(201).json({
            ok: true,
            solicitante: solicitanteBorrado
        })
    });

})


//====================================
// Actualziar solcitante
//===============================

app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Solicitante.findById(id, (err, solicitanteActualizado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar solicitante',
                errors: err
            })
        }


        if (!solicitanteActualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe solicitantes',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }



        solicitanteActualizado.nombre = body.nombre;
        solicitanteActualizado.email = body.email;
        solicitanteActualizado.telefono = body.telefono;
        solicitanteActualizado.nombrearchivo = body.nombrearchivo;


        solicitanteActualizado.save((err, solicitanteActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }

            var token = jwt.sign({ solicitante: solicitanteActualizado }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true,
                solicitante: solicitanteActualizado,
                token: token
            });

        });



    });

});





//====================================
// Actualziar solcitante
//===============================

app.put('/colorrenglon/:id', (req, res) => {

    var id = req.params.id;
    var body =req.body;

    Solicitante.findById(id, (err, solicitanteActualizado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar solicitante',
                errors: err
            })
        }


        



       
        solicitanteActualizado.color = body.color;


        solicitanteActualizado.save((err, solicitanteActualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }

           // var token = jwt.sign({ solicitante: solicitanteActualizado }, SEED, { expiresIn: 14400 });

            res.status(200).json({
                ok: true
            });

        });



    });

});





module.exports = app;