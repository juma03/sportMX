var express = require('express');
var app = express();

var nodemailer = require('nodemailer');
const path = require('path');



var smtpTransport = nodemailer.createTransport("smtps://sportfishingm@gmail.com:" + encodeURIComponent('abpg1980') + "@smtp.gmail.com:465");


// var smtpTransport = nodemailer.createTransport("smtps://info@sportfishingmx.com:" + encodeURIComponent('mx2020') + "@smtp.flockmail.com:465");

var mivariable = '<strong>Hola</strong>';
// mivariable= mivariable 











app.get('/:email/:pdfile/:subjet', (req, res) => {
    var nombrecorreo = req.params.email;
    console.log('nombre del pdf a enviar', req.params.email);
    var pdfiles = req.params.pdfile;
    var subjettxt = req.params.subjet;
    console.log('nombre del pdf a emviar', subjettxt);

    console.log('subjet', req.params.pdfile);
    var mailoptions = {
        from: ' Grupo Turipe S.A. de c.v',
        to: nombrecorreo,
        subject: subjettxt,
        text: 'su(s) Licencia(s) de Pesca',
        html: '<b>Attached please find the PDF file containing the Mexican sport fishing licenses requested. </b><br> We wish you an extraordinary fishing experience in Mexico! <br>SportfishingMX.', // html body                                               
        attachments: [{
            filename: pdfiles,
            path: path.join(__dirname, '../uploads/download/' + pdfiles),
        
            contentType: 'application/pdf'
        }]
    };

    smtpTransport.sendMail(mailoptions, function(error, respuesta) {
        if (error) {
            return res.status(500).json({
                ok: false,
                msg: 'error inesperado, contacte a sistemas'
            })
        } else {


            // aquu lo trasnferire a movimeinots 


            return res.json({
                ok: true
            });
        }
    });



});










module.exports = app;