var express = require('express');
var app = express();




app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'

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

module.exports = app;