 var mongoose = require('mongoose');
 var DateOnly = require('mongoose-dateonly')(mongoose);
 var autoIncrement = require('mongoose-auto-increment');


 var Schema = mongoose.Schema;
 var pescadorSchema = new Schema({
     creado: { type: Date, default: Date },
     nombre: { type: String, require: [true, 'El nombre dle Solicitante es necesario'] },
     apellido: { type: String, require: [true, 'El nombre dle Solicitante es necesario'] },
     tipolicencia: { type: String },
     costolicencia: { type: Number, require: [true, 'Tipo licencias es requerida'] },
     ciudad: { type: String, require: [true, 'El nombre dle Solicitante es necesario'] },
     estado: { type: String, require: [true, 'El nombre dle Solicitante es necesario'] },
     fechainiciopesca: { type: Date, default: Date },
     idsolicitante: { type: Schema.Types.ObjectId, ref: 'Solicitante' , index: true},
     idempresa: { type: String, default: "S/R" , index: true},
     idregistro: { type: String, default: "S/R" },
     licenciacargada: { type: Boolean, default: false, index: true },
     cantidad: { type: Number, default: 1 },
     deprecompra: { type: Boolean, default: false },
     idinventarios: { type: String, default: "S/I",  index: true }, // este campo  servira para relacionar a que inventario pertenece la solicitud
     decompralicencia: { type: Boolean, default: false },
     enviadoporemail: { type: Boolean, default: false },
 });

 autoIncrement.initialize(mongoose.connection);
 pescadorSchema.plugin(autoIncrement.plugin, { model: 'Pescador', field: 'idpescador', unique: true, index: -1 }); // 4. use autoIncrement

 module.exports = mongoose.model('Pescador', pescadorSchema);