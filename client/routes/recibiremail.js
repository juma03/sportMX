var express = require('express');
var app = express();

var nodemailer = require('nodemailer');
const path = require('path');



// var smtpTransport = nodemailer.createTransport("smtps://info@sportfishingmx.com:" + encodeURIComponent('mx2020') + "@smtp.flockmail.com:465");
var smtpTransport = nodemailer.createTransport("smtps://sportfishingm@gmail.com:" + encodeURIComponent('abpg1980') + "@smtp.gmail.com:587");

// smtpTransport = nodemailer.createTransport({
//     host: "smtp.flockmail.com",
//     port: 465,
//     secure: true, // upgrade later with STARTTLS
//     auth: {
//         user: "info@sportfishingmx.com",
//         pass: "mx2020"
//     },
//     priority: "Urgent"
// });


var mivariable = '<strong>Hola</strong>';
// mivariable= mivariable 



app.get('/:nombre/:email/:telefono/:message', (req, res) => {
    var nombre = req.params.nombre;
    var email = req.params.email;
    var telefono = req.params.telefono;
    var message = req.params.message;
    var nombrecorreo = 'info@sportfishingmx.com';


    // from: ' Grupo Turipe S.A. de c.v',

    var mailoptions = {
        from: 'info@sportfishingmx.com',
        to: nombrecorreo,
        subject: 'contacto:',
        text: 'nombre del contacto :' + nombre + '---- E-mail :' + email + '----Telefono:' + telefono + '----- mensaje:' + message,


    }

    smtpTransport.sendMail(mailoptions, function(error, respuesta) {
        if (error) {
            console.log(error);
        } else {
            res.json({
                ok: true
            });
        }
    });


});





module.exports = app;