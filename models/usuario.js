
var mongoose = require('mongoose');

var uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

var Schema = mongoose.Schema;
// var rolesValidos = {
//     values: ['USER_NONE', 'ADMIN_SPORTFISHING', 'USER_LANDING', 'USER_GESTOR'],
//     message: '{VALUE} no es un rol permitido'
// };
 mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid';

var usuarioSchema = new Schema({
    creado: { type: Date, default: Date.now },
    nombrecliente: { type: String, require: [true, 'El nombre del cliente es necesario'] },
    alias: { type: String },
    apellido: { type: String, require: [false, 'El apellido del cliente es necesario'] },
    emailpersonal:  { type: mongoose.SchemaTypes.Email, unique: true, required: [true, 'El correo es importante'] },
    password: { type: String, require: [true, 'La contrasena es necesaria'] },
    role: { type: String, require: true, default: 'USER_NONE' },
    // role: { type: String, require: true, default: 'USER_NONE', enum: rolesValidos },
    activado: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    idempresa: { type: Schema.Types.ObjectId, ref: 'Empresas' },
    color: { type: String, require: false, default: 'COLOR_NONE' },
});
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

module.exports = mongoose.model('Usuario', usuarioSchema);