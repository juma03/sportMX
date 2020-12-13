var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var configuracionSchema = new Schema({
    identificador: { type: Number },
    modomantenimiento: { type: Boolean },

});



module.exports = mongoose.model('configuracions', configuracionSchema);