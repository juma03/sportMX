var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');

//var uniqueValidator = require('mongoose-unique-validator');

require('mongoose-type-email');



var Schema = mongoose.Schema;

var movimientoSchema = new Schema({
    creado: { type: Date, default: Date },
    idempresa: { type: Schema.Types.ObjectId, ref: 'Empresas' },
    idusuario:{ type: Schema.Types.ObjectId, ref: 'Usuario'},
    idprecompra:{ type: Schema.Types.ObjectId, ref: 'Precompras'},
    idpescador:{ type: Schema.Types.ObjectId, ref: 'Pescador'},
    fecha: { type: Date, default: Date },
    concepto: { type: String}, 
    barco: { type: String},  // lic solicitadas
     lcompradas : { type: Number},    // lic compradas
    lsolicitado : { type: Number, default: 0},
    entransito : { type: Number, default: 0},    // lic en transito
    ldisponible : { type: Number, default: 0},         // licencias disponibles
    numeroperacion: { type: String, default: "No Generado", index: true },
    procesado: { type: Boolean, default: false },
    licenciaspdf: { type: String, default: "Waiting for licenses" },
    
});
// mongoose.set('useCreateIndex', true); 
autoIncrement.initialize(mongoose.connection);

movimientoSchema.plugin(autoIncrement.plugin, { model: 'movimiento', field: 'idmovimiento', unique: true, index: -1 }); // 4. use autoIncrement


//solicitanteSchema.plugin(uniqueValidator, { message: 'Correo Electronic Existente' });
module.exports = mongoose.model('movimientos', movimientoSchema);