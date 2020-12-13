var express = require('express');
var app = express();
const path = require('path');
const fs = require('fs');





app.get('/:img', (req, res) => {

    var img = req.params.img;

    var pathImagen = path.resolve(__dirname, `../uploads/${ img }`);
    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen)
    } else {
        var pathNoimagen = path.resolve(__dirname, '../assets/noimagen.jpg');
        res.sendFile(pathNoimagen);
    }




});

module.exports = app;