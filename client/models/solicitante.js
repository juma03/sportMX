var mongoose = require('mongoose');

var autoIncrement = require('mongoose-auto-increment');

//var uniqueValidator = require('mongoose-unique-validator');

var moment = require('moment-timezone');
moment().tz('America/Los_Angeles').format();

var now = moment();


require('mongoose-type-email');



var Schema = mongoose.Schema;


var solicitanteSchema = new Schema({
    creado: { type: Date, default:  moment.utc() },
    nombre: { type: String, require: [true, 'El nombre dle Solicitante es necesario'] },
    email: { type: mongoose.SchemaTypes.Email },
    telefono: { type: String },
    procesarSolicitud: { type: Boolean, default: false, index: true },
    numeroconfirmacion: { type: String, default: "No Pagado" },
    procesado: { type: Boolean, default: false, index: true },
    prioridad: { type: Number, default: 10 },
    idusuario: { type: String, default: "N/A" },
    numeroperacion: { type: String, default: "No Generado" },
    nombrearchivo: { type: String, default: "No Generado" },
    nombrearchivopdf: { type: String, default: "No Generado" },
    numerosolicitud: { type: String, default: "No Generado" },
    solicitudhtml : { type: String},
    enviadoporemail: { type: Boolean, default:false},
    seleccionado: { type: String },
    deprecompra: { type: Boolean, default: false },
    idempresa: { type: String, default: "N/A" },
    color: { type: String, require: false, default: 'COLOR_NONE' },
    vienedemodulo: { type: String},
    

});
// mongoose.set('useCreateIndex', true);
autoIncrement.initialize(mongoose.connection);

solicitanteSchema.plugin(autoIncrement.plugin, { model: 'Solicitante', field: 'idsolicitante', unique: true, index: -1 }); // 4. use autoIncrement


//solicitanteSchema.plugin(uniqueValidator, { message: 'Correo Electronic Existente' });
module.exports = mongoose.model('Solicitante', solicitanteSchema);