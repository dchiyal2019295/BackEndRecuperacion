'use strict'
const { Router } = require("express");
var express = require("express");
var usuariocontroller = require("../controladores/usuario.controller");

//MIDDLEWARES

var md_autorizacion = require("../middlewares/authenticated");

//RUTAS 

var api = express.Router();
api.post('/login', usuariocontroller.login)
module.exports = api;