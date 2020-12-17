var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

var Schema = mongoose.Schema;

mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';

var empresaSchema = new Schema({
    creado: { type: Date, default: Date.now },
    nombrempresa: { type: String, require: [true, 'El nombre de la empresa es necesario'] },
    email: { type: mongoose.SchemaTypes.Email, unique: true, required: [true, 'El correo es importante'] },
    telefono: { type: String, require: false },
    celular: { type: String, require: false },
    direccionweb: { type: String, require: false, default: "Ninguna" },
    direccion: { type: String, require: false },
    ciudad: { type: String, require: false },
    estado: { type: String, require: false },
    pais: { type: String, require: false },
    zipcode: { type: String, require: false },
    usuario:[{ type: Schema.Types.ObjectId, ref: 'Usuario'}],
    prepago:[{ type: Schema.Types.ObjectId, ref: 'prepagos'}]

                  
  
});
empresaSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Empresas', empresaSchema);