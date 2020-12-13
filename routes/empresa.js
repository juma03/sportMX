var express = require('express');
var jwt = require('jsonwebtoken');



var bcrypt = require('bcryptjs');


var mdAutentication = require('../middleware/autenticacion_usuarios');
const Empresa = require('../models/empresa');
const Usuario = require('../models/usuario');




var app = express();




//====================================
// buscarempresa
//===============================

app.get('/:id', (req, res) => {
    identificador = req.params.id;
    console.log ('aqui', identificador);
    Empresa.find({_id:identificador},(err, empresa) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando usuario alias ',
                    errors: err
                });
            }





            res.status(200).json({
                ok: true,
                empresa: empresa
            });


        });



});






//====================================
// crear nuevo usuarios
//===============================



app.post('/capturainfo', async(req, res) => {
    var body = req.body;
    console.log('ESTA EN LA OPCION DE captura info', body);



    var empresa = new Empresa({
        nombreEmpresa: body.nombreEmpresa,
        email: body.email,
        telefono: body.telefono,
        celular: body.celular,
        direccionweb: body.direccionweb,
        direccion: body.direccion,
        ciudad: body.ciudad,
        estado: body.estado,
        pais: body.pais,
        zipcode: body.zipcode,
        
    });

  //  const ret = await empresa.save();
    

  let informacionempresa= await empresa.save();

  console.log ('informacion de la emresa', informacionempresa);

  var usuario = new Usuario({
    idempresa: informacionempresa._id,
    nombrecliente: body.nombrecliente,
    apellido: body.apellido,
    admin: true,
    emailpersonal: body.emailpersonal,
    password: bcrypt.hashSync(body.password, 10),
});


console.log ('datos dle usuario', usuario);


 let usuarioadministrador=   usuario.save();
 
 res.status(200).json({
             ok: true,
         usuarioGuardado: usuarioadministrador,
             // token: token,
    //         // id: usuarioGuardado._id
    //       //  usuariotoken: req.usuario
         });



// usuario.save((err, usuarioGuardado) => {
//     if (err) {
//         return res.status(400).json({
//             ok: false,
//             mensaje: 'Error al crear solicitantes',
//             errors: err
//         });
//     }

  
//     res.status(200).json({
//         ok: true,
//         usuarioGuardado: usuarioGuardado,
//         // token: token,
//         // id: usuarioGuardado._id
//       //  usuariotoken: req.usuario
//     });



// });








});



app.put('/:id', async(req, res) => {

    var idempresa = req.params.id;
  var body = req.body;
    var id =body._id;
    // console.log ('numero de identificador', id)
    
   // console.log ('identificador', _id);
   // console.log ('elemeto recibo actualziacion', body);
 //   console.log ('nombre dle cliente', body.nombrecliente);


 




Usuario.findById(id, async(err, usuarioactualizado) => {

        if (!usuarioactualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe suario',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }

        usuarioactualizado.nombrecliente = body.nombrecliente;
        usuarioactualizado.apellido = body.apellido;
        usuarioactualizado.email = body.emailpersonal;
        usuarioactualizado.role = body.role;
        usuarioactualizado.activado = body.activado;

        await usuarioactualizado.save((err, usuarioactualiado) => {

    
// aqui meteremso ala empresa
// id = usuarioactualizado.idempresa;
console.log ('identificador empresa', id);

Empresa.findById(idempresa, (err, empreesactualizado) => {

    empreesactualizado.nombreEmpresa = body.nombreEmpresa;
    empreesactualizado.email = body.email;
    empreesactualizado.telefono = body.telefono;
    empreesactualizado.celular = body.celular;

    empreesactualizado.direccionweb = body.direccionweb;
    empreesactualizado.direccion = body.direccion;
    empreesactualizado.ciudad = body.ciudad;
    empreesactualizado.estado = body.estado;

    empreesactualizado.pais = body.pais;
    empreesactualizado.zipcode = body.zipcode;
    empreesactualizado.role = body.role;
    empreesactualizado.activado = body.activado;


    empreesactualizado.save((err, empreesactualizado) => {



        res.status(200).json({
            ok: true,
           // empreesactualizado: empreesactualizado
        });

    });



});





// qui terminara empresa
        




            // res.status(200).json({
            //     ok: true,
            //     usuarioactualiado: usuarioactualiado
            // });

        });



    });


    

// -------------------------------------------------------------------------
// al empresa aqui estara\
// -----------------------------------------------------------------------



























});

















module.exports = app;