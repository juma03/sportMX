var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var entransitoSchema = new Schema({
    idempresa: { type: String ,  index: true},
    numeroperacion: { type: String },
    cantidad : { type: Number }
});



module.exports = mongoose.model('entransito', entransitoSchema);