'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductoSchema = Schema({

    nombre: String,
    ventas: Number,
    stock: Number


})

module.exports = mongoose.model('productos',ProductoSchema)