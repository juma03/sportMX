var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var barcosSchema = new Schema({
    idempresa: { type: String },
    nombrebarco: { type: String },
    

});



module.exports = mongoose.model('barcos', barcosSchema);