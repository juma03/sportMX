var express = require('express');
var app = express();

var nodemailer = require('nodemailer');
const path = require('path');



var smtpTransport = nodemailer.createTransport("smtps://sportfishingm@gmail.com:" + encodeURIComponent('abpg1980') + "@smtp.gmail.com:465");


// var smtpTransport = nodemailer.createTransport("smtps://info@sportfishingmx.com:" + encodeURIComponent('mx2020') + "@smtp.flockmail.com:465");

var mivariable = '<strong>Hola</strong>';
// mivariable= mivariable 











app.get('/:subjet', (req, res) => {
    var nombrecorreo = req.params.email;


    var subjettxt = req.params.subjet;


    console.log('subjet', req.params.pdfile);
    var mailoptions = {
        from: ' Grupo Turipe S.A. de c.v',
        to: "juma@sportfishingmx.com,angelica@sportfishingmx.com,tony@sportfishingmx.com",
        // to: "juma@sportfishingmx.com",
        subject: subjettxt,
        //  html: '<b>Attached please find the PDF file containing the Mexican sport fishing licenses requested. </b><br> We wish you an extraordinary fishing experience in Mexico! <br>SportfishingMX.', // html body                                              

    };

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