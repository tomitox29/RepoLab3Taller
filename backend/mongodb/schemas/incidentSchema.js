var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var incidentSchema = new Schema ({
    titulo: {type: String, required: true, unique: false},
    descripcion: {type: String, required: true, unique: false},
    urgencia: {type: String, required: true}
})


module.exports = mongoose.model('Incident', incidentSchema, 'Incident');