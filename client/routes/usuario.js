
var express = require('express');
var jwt = require('jsonwebtoken');
var objectid = require('objectid');

var bcrypt = require('bcryptjs');

var Usuario = require('../models/usuario');
var Empresa = require('../models/empresa');
var mdAutentication = require('../middleware/autenticacion_usuarios');

var app = express();


var mongodb = require('mongodb'); //this might have been defined at the beginning of your code.
query = {_id:mongodb.ObjectId('5f235e995c078e7daeb506d0')};



//====================================
// obtener todos los usuarios
//===============================

app.get('/', (req, res) => {

    Usuario.find({}, 'nombre email role')
        .exec(
            (err, usuario) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuario',
                        errors: err
                    });
                }





                res.status(200).json({
                    ok: true,
                    usuario: usuario
                });


            });


});


app.get('/localiza/:id', (req, res) => {
    var id = req.params.id;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuario',
                errors: err
            });
        }



        // aqui estara la empresa

        identificador = usuario.idempresa
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
                usuario: usuario,
                empresa: empresa
            });

        });






        // hasta aqui abarca





        


    });


});






app.get('/listados2', (req, res) => {

    Usuario.find({idempresa:'5f235e995c078e7daeb506d0'}, (err, usuario) => {
        Empresa.populate(usuario, {
            path: "idempresa"

        }, (err, usuario) => {




            Usuario.count({}, (err, conteo) => {
                res.status(200).json({
                    ok: true,
                    usuario: usuario,
                    // totalregistros: conteo


                });

            });


        });
    });




});





 app.get('/listados', (req, res) => {
   

     Usuario.find({})
     .populate('idempresa' )
     .exec()
     .then ( data =>{

         res.status(200).json({
             ok: true,
             usuario: data,
            
       });
     });
 });





 app.get('/listausuarios/:idempresa', (req, res) => {
   
    id = req.params.idempresa;
    

    Usuario.find({idempresa:id})
    .populate('idempresa' )
    .exec()
    .then ( data =>{

        res.status(200).json({
            ok: true,
            usuario: data,
           
      });
    });
});



//====================================
// crear nuevo pescador
//===============================

app.post('/',  (req, res) => {
    var body = req.body;
    console.log('cuerpo :', body)
    


    // console.log(body.tipolicencia.description);

    var usuario = new Usuario({
        role: body.role,
        activado: body.activado,
        admin: body.admin,
        idempresa: body.idempresa,
        nombrecliente: body.nombrecliente,
        apellido: body.apellido,
        alias: body.alias,
        emailpersonal: body.emailpersonal,
        color: body.color,
        password:  bcrypt.hashSync(body.password, 10),
       
    });

    usuario.save((err, usuarioguardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            })
        }


        res.status(200).json({
            ok: true,
            usuarioguardado: usuarioguardado
        })



    })








})








//====================================
// editar nuevo usuario
//===============================

app.put('/',  (req, res) => {
    var body = req.body;
    console.log('cuerpo :', body)
    


    // console.log(body.tipolicencia.description);




    var usuario = new Usuario({
        role: body.role,
        activado: body.activado,
        admin: body.admin,
        idempresa: body.idempresa,
        nombrecliente: body.nombrecliente,
        apellido: body.apellido,
        alias: body.alias,
        emailpersonal: body.emailpersonal,
        color: body.color,
        password:  bcrypt.hashSync(body.password, 10),
       
    });

    usuario.save((err, usuarioguardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                errors: err
            })
        }


        res.status(200).json({
            ok: true,
            usuarioguardado: usuarioguardado
        })



    })








})





//====================================
// Actualziar solcitante
//===============================

app.put('/:id', (req, res) => {

    var id = req.params.id;
    console.log ('id', id);
    var body = req.body;

    Usuario.findById(id, (err, usuarioencontrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            })
        }


        if (!usuarioencontrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe usuario',
                errors: { mensaje: 'no existe usuario2' }
            })
        }



        usuarioencontrado.role = body.role;
        usuarioencontrado.activado = body.activado;
        usuarioencontrado.admin = body.admin;
        usuarioencontrado.idempresa = body.idempresa;
        usuarioencontrado.nombrecliente = body.nombrecliente;
        usuarioencontrado.apellido = body.apellido;
        usuarioencontrado.emailpersonal = body.emailpersonal;
        usuarioencontrado.color = body.color;
        usuarioencontrado.alias= body.alias,

        usuarioencontrado.save((err, usuario) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }

            res.status(200).json({
                ok: true,
                usuario
            });

        });



    });

});









    

















//====================================
// crear nuevo usuarios
//===============================

app.post('/', (req, res) => {
    var body = req.body;
    console.log('ESTA EN LA OPCION DE AGREGAR', body);



    var usuario = new Usuario({
        
        idempresa: body.idempresa,
        nombrecliente: body.nombrecliente,
        apellido: body.apellido,
        emailpersonal: body.emailpersonal,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        activado: body.activado


    });

    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear solicitantes',
                errors: err
            });
        }

        // Crear un token!!!!
        // var token = jwt.sign({ solicitante: solicitanteGuardado }, SEED, { expiresIn: 14400 });


        res.status(200).json({
            ok: true,
            usuarioGuardado: usuarioGuardado,
            // token: token,
            // id: usuarioGuardado._id
            usuariotoken: req.usuario
        });



    });








});

app.post('/capturainfo', (req, res) => {
    var body = req.body;
    console.log('ESTA EN LA OPCION DE captura info', body);


    var usuario = new Usuario({
        idempresa: objectid(body.idempresa),
        nombrecliente: body.nombrecliente,
        apellido: body.apellido,
        emailpersonal: body.emailpersonal,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        activado: body.activado


    });



    console.log (usuario);


    usuario.save((err, usuarioGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear solicitantes',
                errors: err
            });
        }

        // Crear un token!!!!
        // var token = jwt.sign({ solicitante: solicitanteGuardado }, SEED, { expiresIn: 14400 });


        res.status(200).json({
            ok: true,
            usuarioGuardado: usuarioGuardado,
            // token: token,
            // id: usuarioGuardado._id
         //   usuariotoken: req.usuario
        });



    });








});







//====================================
// Actualziar usuario    mdAutentication.verificaTokeUsuario,
//===============================

app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;
    console.log('actualziacion de usuarios', body);

    Usuario.findById(id, (err, usuarioEncontrado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }


        if (!usuarioEncontrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id no existe',
                errors: { mensaje: 'no existe usuario con el id no existe' }
            });
        }


       // usuarioEncontrado.nombreEmpresa = body.nombreEmpresa;
       
        usuarioEncontrado.nombrecliente = body.nombrecliente;
        usuarioEncontrado.apellido = body.apellido;
        usuarioEncontrado.email = body.email;
        usuarioEncontrado.role = body.role;
        usuarioEncontrado.activado = body.activado;
        if (body.password !== null) {
            usuarioEncontrado.password = bcrypt.hashSync(body.password, 10)
        }


        

        usuarioEncontrado.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar usuario',
                    errors: err
                });
            }
            usuarioGuardado.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });



    });

});





//====================================
// borrr usuario por id
//===============================

app.delete('/:id', mdAutentication.verificaTokeUsuario, (req, res) => {

    var id = req.params.id;

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar usuario',
                errors: err
            });
        }


        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe usuario a borrar',
                errors: { mensaje: 'no existe usuario' }
            });
        }




        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    });

});






module.exports = app;