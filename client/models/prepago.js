var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var prepagoSchema = new Schema({
    fecha: { type: String },
    numoperacion: {type: String},
    refenciapaypal: {type: String},
    abono : { type: String},
    idempresa: { type: Schema.Types.ObjectId, ref: 'Empresas' },
    idusuario:[{ type: Schema.Types.ObjectId, ref: 'Usuario'}],
    
});



module.exports = mongoose.model('prepagos', prepagoSchema);