var express = require('express');
var app = express();

var nodemailer = require('nodemailer');
const path = require('path');



var smtpTransport = nodemailer.createTransport("smtps://sportfishingm@gmail.com:" + encodeURIComponent('abpg1980') + "@smtp.gmail.com:465");


// var smtpTransport = nodemailer.createTransport("smtps://info@sportfishingmx.com:" + encodeURIComponent('mx2020') + "@smtp.flockmail.com:465");

var mivariable = '<strong>Hola</strong>';
// mivariable= mivariable 











app.get('/tocliente/:email/:subjet', (req, res) => {
    var nombrecorreo = req.params.email;
    console.log ("aqui netro mail");
   
    var subjettxt = "Your SportfishingMX account has been activated.";
   

   
    var mailoptions = {
        from: ' Grupo Turipe S.A. de c.v',
        to: nombrecorreo,
        subject: subjettxt,
        text: 'successful discharge',
        html: '<b>Dear Friend, <br> Your request to activate your access to SportfishingMX has been processed'+  
        'You can now log in to Sportfishingmx.com using the email and password you submitted in your registration. <br>'+
        'We would like to take this opportunity to welcome you aboard and are looking forward to working with you in the near future.'+
        '<br> Best regards,<br>'+
        'The SportfishingMX Team', // html body                                               
        
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