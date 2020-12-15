var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var folioprecompraSchema = new Schema({
    folioconsecutivo: { type: Number },
    fecha: { type: String },

});



module.exports = mongoose.model('Folioprecompra', folioprecompraSchema);