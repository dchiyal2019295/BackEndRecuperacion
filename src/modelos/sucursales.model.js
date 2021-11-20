'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategoriaSchema = Schema({

    nombreSucursal: String,
    direccionSucursal: String
 

})

module.exports = mongoose.model('sucursales',CategoriaSchema);