var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;
var precompraSchema = new Schema({
    fecha: { type: String , default: Date },
    emailempresa: { type: String, default: "N/A" },
    refenciapaypal: {type: String},
    concepto: {type: String},
    clicencia : { type: Number},  // cantida de licencias
    totalpagado : { type: Number},  // cantida de licencias
    inventariototal : { type: Number},  // cantida de licencias
    disponibilidad : { type: Number},  // cantida de licencias
    idempresa: { type: Schema.Types.ObjectId, ref: 'Empresas' },
    idusuario:{ type: Schema.Types.ObjectId, ref: 'Usuario'},
});

autoIncrement.initialize(mongoose.connection);
precompraSchema.plugin(autoIncrement.plugin, { model: 'Precompra', field: 'idprecompra', unique: true, index: -1 }); // 4. use autoIncrement


module.exports = mongoose.model('Precompras', precompraSchema);