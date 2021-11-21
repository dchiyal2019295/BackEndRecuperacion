'use strict'

var express = require("express");
var sucursalesControlador = require("../controladores/sucursales.controller")

// MIDDLEWARES

var md_autorizacion = require("../middlewares/authenticated");

//RUTAS

var api = express.Router()

api.post('/agregarSucursal', md_autorizacion.ensureAuth, sucursalesControlador.agregarSucursal)
api.put('/EditarSucursal/:id', md_autorizacion.ensureAuth, sucursalesControlador.EditarSucursal)
api.delete('/EliminarSucursal/:id', md_autorizacion.ensureAuth, sucursalesControlador.eliminarSucursal)
api.get('/obtenerSucursalesID/:id', md_autorizacion.ensureAuth, sucursalesControlador.obtenerSucursalesID)
api.get('/obtenerSucursales', md_autorizacion.ensureAuth, sucursalesControlador.obtenerSucursales)
api.get('/GenerarPdf',md_autorizacion.ensureAuth, sucursalesControlador.GenerarPdf)


module.exports = api