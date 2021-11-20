'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var ProductoSchema = Schema({

    nombre: String,
    ventas: Number,

    Productos:[{
        idSucursal:{type: Schema.Types.ObjectId, ref:'sucursales'} ,
        nombre: String,
        stock: Number
    }],

})

module.exports = mongoose.model('productos',ProductoSchema)