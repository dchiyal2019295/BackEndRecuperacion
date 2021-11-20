'use strict'

//VARIABLES GLOBALES

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//IMPORTACION DE RUTAS
var usuario_rutas = require("./src/rutas/usuario.rutas");
var sucursales_rutas = require("./src/rutas/sucursales.rutas")
var productos_rutas = require("./src/rutas/productos.rutas")

//CABECERAS
app.use(cors());

// MIDDLEWARES
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


//APLICACIONES DE LA RUTA
app.use('/api', 
                usuario_rutas,
                sucursales_rutas,
                productos_rutas);


//EXPORTACIONES 
module.exports = app

