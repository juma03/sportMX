var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var folioSchema = new Schema({
    folioconsecutivo: { type: Number },
    fecha: { type: String },

});



module.exports = mongoose.model('Folio', folioSchema);