var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var licenciaSchema = new Schema({
    idpermiso: { type: Number },
    descripcion: { type: String },
    preciopublico: { type: Number },
    Muestrame: { type: Boolean },

});



module.exports = mongoose.model('settingpermisos', licenciaSchema);