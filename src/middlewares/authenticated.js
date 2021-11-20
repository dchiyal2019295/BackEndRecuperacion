'use strict'

var jwt = require("jwt-simple")
var moment = require("moment");
var secret = 'password_secret';

exports.ensureAuth = function(req,res,next){

    if(!req.headers.authorization){

        return res.status(404).send({mensaje: 'La Peticion No Tiene La Cabezera De Autenticacion'})
    }

    var token = req.headers.authorization.replace(/['"]+/g,'');
    try {
        var payload = jwt.decode(token,secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({mensaje:'El Token ya expiro'});
        }
        
    } catch (error) {
        return res.status(401).send({mensaje:'El Token Ingresado no es valido'})
        
    }

    req.user = payload;
    next();
}