'use strict'

var Usuario = require("../modelos/usuario.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../servicios/jwt");


var Datos
const { relativeTimeRounding } = require("moment");
const { findOne } = require("../modelos/usuario.model");


function Admin(req, res) {

  var userModel = new Usuario();

      userModel.nombre = 'AdminMc';
      userModel.password = '123456';
      userModel.rol = 'ROL_ADMIN'

  Usuario.find({
      $or: [
      { nombre: userModel.nombre }
      ]
        }).exec((err, adminEncontrado) => {
          if (err) return console.log('Error en la Creacion del Usuario Administrador');
            if (adminEncontrado.length >= 1) {
              return console.log("Usuario Administrador Creado con exito")
                } else {
                  bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                        userModel.password = passwordEncriptada;
                      userModel.save((err, adminGuardado) => {
                   if (err) return console.log('error en la peticion del usuario Administrador')

                if (adminGuardado) {
              console.log('Administrador Guardado')
             } else {
                      console.log('Error en la creacion del usuario  Admin')
                               }
                            })
                          })
                        }
                      })
}

function login(req, res) {
  
  var params = req.body;
  
  Usuario.findOne({ nombre: params.nombre }, (err, usuarioEncontrado) => {
      if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (usuarioEncontrado) {
          bcrypt.compare(params.password, usuarioEncontrado.password, (err, passVerificada) => {
             if (passVerificada) {
               if (params.getToken === 'true') {
                return res.status(200).send({
                token: jwt.createToken(usuarioEncontrado)})

                  } else {
                   usuarioEncontrado.password = undefined;
                return res.status(200).send({ usuarioEncontrado });}
            } else {
           return res.status(500).send({ mensaje: 'El usuario no se puede indentificar' })}
          })} 
       else {
    return res.status(500).send({ mensaje: 'Error al buscar el Usuario' })
}
})

}


module.exports = {
    Admin,
    login
}