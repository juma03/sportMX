var express = require('express');
var app = express();




app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        mensaje: 'peticion realizada correctamente'

    });


});


// app.get('/download', function(req, res){
//     var file = __dirname + '/upload-folder/dramaticpenguin.MOV';
//     res.download(file); // Set disposition and send it.
//   });



app.get('/:nombrearchivo', function(req, res) {
    // console.log('direcotio;', __dirname);

    var filepath = __dirname + '../uploads/download/' + req.body.filename;
    console.log ("_dirname");
    

    console.log('archivo pdf enlace ;', filepath)
    res.download(filepath);


})

module.exports = app;