var express = require('express');
const fileUpload = require('express-fileupload');
var Pescador = require('../models/pescador');
var path = require('path');


var fs = require('fs');

var app = express();


// default options
app.use(fileUpload());


app.put('/:directorio/:id', (req, res, next) => {


    var id = req.params.id;
    var directorio = req.params.directorio;
    var body = req.body;
    console.log('cuerpo', directorio);
    console.log('id', id);
    directorioimagen = body.directorio;



    if (!req.files) {
        return res.status(400).json({
            ok: true,
            mensaje: 'No selecciono nada',
            errors: { message: 'debe seleccionar un archivo pdf' }


        });
    }
    // se ontendra el nombre dle archivo

    console.log('anda por aqui');

    var archivo = req.files.imagen;
    console.log ('nombrearchivo', archivo);
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];
    // var nuevonombre = "demosstracion22";

    console.log('nombre archivo', nombreCortado);

    // se aceptar unicamente pdf

    var extensionesValidas = ['xls', 'xlsx', 'pdf','html'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }

    //nombre de archivo personalizado._mat-animation-noopable

    nombreArchivo = `${nombreCortado[0]}.${extensionArchivo}`;
 //   nombreArchivo = `${nuevonombre}.${extensionArchivo}`;


    console.log('nombre de archivo:', nombreArchivo);

    // mover el archivo del temporal a un paht en especifico
    var path = `./uploads/${directorio}/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });

        }


        //   ActualizaPescador(id, nombreArchivo, res);
        res.status(200).json({
            ok: true,
            nombrearchivo: nombreArchivo,
            // extensionArchivo: extensionArchivo
        });

    });





});




app.put('/movimientos/:directorio/:id/:nombrearchivo', (req, res, next) => {


    var id = req.params.id;
    var directorio = req.params.directorio;
    console.log('nombre dle archivo subido es', req.params.nombrearchivo);
    var body = req.body;
    console.log('cuerpo', directorio);
    console.log('id', id);
    directorioimagen = body.directorio;



    if (!req.files) {
        return res.status(400).json({
            ok: true,
            mensaje: 'No selecciono nada',
            errors: { message: 'debe seleccionar un archivo pdf' }


        });
    }
    // se ontendra el nombre dle archivo

    console.log('anda por aqui');

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    console.log('nombre archivo', nombreCortado);

    // se aceptar unicamente pdf

    var extensionesValidas = ['xls', 'xlsx', 'pdf'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no valida',
            errors: { message: 'Las extensiones validas son ' + extensionesValidas.join(', ') }
        });
    }

    //nombre de archivo personalizado._mat-animation-noopable
    if (id === 'archivo') {
        nombreArchivo = `${nombreCortado[0]}.${extensionArchivo}`;
    } else {
        nombreArchivo = `${id}.${extensionArchivo}`;
    }

    console.log('nombre de archivo:', nombreArchivo);

    // mover el archivo del temporal a un paht en especifico
    var path = `./uploads/${directorio}/${nombreArchivo}`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover archivo',
                errors: err
            });

        }


        //   ActualizaPescador(id, nombreArchivo, res);
        res.status(200).json({
            ok: true,
            nombrearchivo: nombreArchivo,
            // extensionArchivo: extensionArchivo
        });

    });





});



app.post('/:directorio/:nombrearchivo', (req, res, next) => {
    var directorio = req.params.directorio;
    var nombrearchivo = req.params.nombrearchivo;


    console.log('nombre dle directorio', directorio);
    console.log('nombre dle archivo', nombrearchivo);


    filepath = path.join(__dirname, '../uploads/', directorio + "/" + nombrearchivo);
    res.sendfile(filepath);



});



function ActualizaPescador(id, nombreArchivo, res) {

    Pescador.findById(id, (err, pescador) => {
        // var pathViejo ='./uploads/' + 
        // si existe elimina el pdf viejo
        let pathViejo = nombreArchivo + ".pdf";
        if (fs.existsSync(pathViejo)) {
            fs.unlink(pathViejo);
        }

        pescador.licenciacargada = true;
        pescador.save((err, pescadorActualizado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error al mover archivo',
                    errors: err
                });
            }

            return res.status(200).json({
                ok: true,
                mensaje: 'Pescador Actualizado',
                pescadorActualizado: pescadorActualizado
            });
        });


    });

}


app.post('/descarga/', function(req, res) {
    //     // console.log('direcotio;', __dirname);
    console.log("nombre dl eachivo filr;", req.body.filename);
    //     // filepath = path.join(__dirname, '../uploads/download/') + req.body.filename;
    filepath = path.join(__dirname, '../uploads/download/') + req.body.filename;
    console.log('archivo pdf enlace ;', filepath);
    res.sendFile(filepath);

});






module.exports = app;