var express = require('express');
var mdAutentication = require('../middleware/autentication')

var app = express();




var Pescador = require('../models/pescador');
var solicitante = require('../models/solicitante');




app.get('/actualizaremail/:idmovimiento', (req, res) => {
    
    idmovimiento = req.params.idmovimiento;
    console.log ('aqui entronuevamente', idmovimiento);

    Pescador.findOne({ idregistro: idmovimiento }, (err, pescadoremail) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }

        console.log ('aqui lo encontro', idmovimiento);
        pescadoremail.enviadoporemail = true;

        pescadoremail.save((err, pescadorrespuesta) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al crear solicitantes',
                errors: err
            })
        }



        solicitante.findOne({ _id: idmovimiento }, (err, solicitantemail) => {

            solicitantemail.enviadoporemail = true;

            solicitantemail.save((err, solicitante) => {

            
            
            res.status(200).json({
                            ok: true,
                            solicitante
                        })

        });




          

        });



       



    })


    });


});





app.get('/unicopescador/:busqueda', (req, res) => {
    let busqueda = req.params.busqueda;
    console.log('node', busqueda)

    Pescador.find({ idregistro: busqueda }, (err, pescador) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }


        res.status(200).json({
            ok: true,
            pescador: pescador
        })


    });


});



app.get('/inventariar/:busqueda', (req, res) => {
    let busqueda = req.params.busqueda;
    console.log('nodebusueda', busqueda)

    Pescador.find({ idinventarios: busqueda, deprecompra: true, decompralicencia: false, enviadoporemail:true }, (err, pescador) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }


        res.status(200).json({
            ok: true,
            pescador: pescador
        })


    });


});





app.get('/:busqueda', (req, res) => {
    let busqueda = req.params.busqueda;
    console.log('node', busqueda)

    Pescador.find({ idsolicitante: busqueda }, (err, pescador) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando solicitantes',
                errors: err
            })
        }


        res.status(200).json({
            ok: true,
            pescador: pescador
        })


    });


});


//====================================
// Listado de epscadores para movimientos
//===============================
app.get('/listadoTotal', (req, res) => {
    // let busqueda = req.params.busqueda;
    //   console.log('node', busqueda)

    Pescador.find({})
        .populate('solicitante')
        .exec((err, pescador) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error cargando solicitantes',
                    errors: err
                })
            }


            res.status(200).json({
                ok: true,
                pescador: pescador
            })


        });


});


//====================================
// crear nuevo pescador
//===============================

app.post('/', mdAutentication.vericaToken, (req, res) => {
    var body = req.body;
    console.log('cuerpo :', body)
    console.log('valor cantidad', body.cantidad)


    // console.log(body.tipolicencia.description);

    var pescador = new Pescador({
        nombre: body.nombre,
        apellido: body.apellido,
        tipolicencia: body.tipolicencia,
        costolicencia: body.costolicencia,
        ciudad: body.ciudad,
        estado: body.estado,



        idsolicitante: body.idsolicitante,

        idregistro: body.idregistro,
        cantidad: body.cantidad,
        fechainiciopesca: body.fechainiciopesca
       

        // solicitante: body.solicitante
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
            pescador: pescadorGuardado
        })



    })








})




//====================================
// borrr solcitante
//===============================

app.delete('/:id', (req, res) => {

    var id = req.params.id;
    console.log(id);

    Pescador.findByIdAndRemove(id, (err, pescadorBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al borrar solicitantes',
                errors: err
            })
        }


        if (!pescadorBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe pescador',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }




        res.status(200).json({
            ok: true,
            pescador: pescadorBorrado
        })
    });

})


//====================================
// Actualziar solcitante
//===============================

app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Pescador.findById(id, (err, pescadoractualizado) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar solicitante',
                errors: err
            })
        }


        if (!pescadoractualizado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'no existe solicitantes',
                errors: { mensaje: 'no existe solicitantes' }
            })
        }



        pescadoractualizado.nombre = body.nombre;
        pescadoractualizado.email = body.email;

        pescadoractualizado.save((err, pescadoractualizado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualiar solicitante',
                    errors: err
                })
            }

            res.status(200).json({
                ok: true,
                pescador: pescadoractualizado
            });

        });



    });

});





module.exports = app;