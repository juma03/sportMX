var { Router } = require('express');

//var stripe = require('stripe')('sk_test_EJrpy4JenCkWqDFzzmXfmJul009n9hueFS');


var stripe = require('stripe')('sk_test_EJrpy4JenCkWqDFzzmXfmJul009n9hueFS');
var router = Router();







router.post("/", async(req, res) => {


    console.log('The body is ', req.body);
    varcharge = stripe.charges.create({
        amount: req.body.transferencia * 100,
        currency: 'usd',
        description: 'Compra de licencias',
        source: req.body.token,
        receipt_email: req.body.emailcargo

        //source: req.body.token,

    }, (err, charge) => {
        // if (err) {
        //      console.log("error de tarjeta de credito")
        //  throwerr;




        //  }
        if (err && err.type === 'StripeCardError') {
            console.log('error de tsrjeta de credito', JSON.stringify(err, null, 2));
            res.json({

                success: false,


            })

        } else {

            res.json({

                success: true,
                message: charge,

            })
        }

    });

});






module.exports = router;