var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;


//====================================
// verificar token
//===============================
exports.vericaToken = function(req, res, next) {

    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'token incorrecto',
                errors: err
            })
        }

        req.solicitante = decoded.solicitante;
        next();





    })
}