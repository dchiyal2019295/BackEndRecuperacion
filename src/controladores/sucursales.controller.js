'use strict'

var Sucursal = require("../modelos/sucursales.model");

var Datos
const pdf = require('pdfkit')
const fs = require('fs');
const xlsx = require('xlsx')


function agregarSucursal(req, res) {

    var sucursalModel = new Sucursal();
    var params = req.body;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'No posee los permisos para agregar Sucursales' })
    }else {
        if (params.nombreSucursal && params.direccionSucursal) {
            sucursalModel.nombreSucursal = params.nombreSucursal,
            sucursalModel.direccionSucursal = params.direccionSucursal;
            
           

            Sucursal.find({
                 $or: [{ nombre: sucursalModel.nombreSucursal }]
                    }).exec((err, sucursalesEncontrado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion, Vuelva a intentarlo' });
                        else {
                    sucursalModel.save((err, sucursalesGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar los datos de la sucursal' });
                    if (sucursalesGuardado) {
                        res.status(200).send({ sucursalesGuardado })
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar a la sucursal'})
                    }})}
         })
            } else {
                return res.status(500).send({ mensaje: 'Es necesario llenar todos los datos ' })}
}

}
function EditarSucursal(req, res) {
    var idsucursal = req.params.id;
    var params = req.body;

    if (req.user.rol != 'ROL_ADMIN') {
       return res.status(500).send({ mensaje: 'No posee los permisos para editar la Sucursal' })
    }

    Sucursal.find({nombre: params.nombreSucursal}).exec((err, sucursalEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })


    else {
            Sucursal.findOne({ _id: idsucursal }).exec((err, sucursalEncontrada) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion al obtener la Sucursal' });

                if (!sucursalEncontrada) return res.status(500).send({ mensaje: 'Error en la peticion editar o no existen los datos' });
            

                Sucursal.findByIdAndUpdate(idsucursal, params, { new: true }, (err, sucursalActualizado) => {
                    if (err) return res.status(500).send({ mensaje: 'error en la peticion' });

                    if (!sucursalActualizado) return res.status(500).send({ mensaje: 'No se ha podido editar la Sucursal' })
                    if (sucursalActualizado) {
                        return res.status(200).send({ sucursalActualizado });
                    }

                })

            })

        }
    })
        

} 
function eliminarSucursal(req, res) {
    var params = req.body;
    var idsucursal = req.params.id
  
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'No posee los permisos para Eliminar la Sucursal' })
     }
  
    Sucursal.findOne({ _id: idsucursal }).exec((err, sucursalEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!sucursalEncontrado) return res.status(500).send({ mensaje: 'No se han encontrado los datos requeridos' })
  
    
        Sucursal.findByIdAndDelete(idsucursal, (err, sucursalEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!sucursalEliminado) return res.status(500).send({ mensaje: 'No se ha podido eliminar la Sucursal' });
  
            if (sucursalEliminado) return res.status(200).send({ mensaje: 'Sucursal Eliminada Con Exito' })
        })
  
    })
  
  
}

function obtenerSucursales(req, res) {
    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'No posee los permisos para agregar Sucursales' })
    }else{
    Sucursal.find().exec((err, Sucursal) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (!Sucursal) return res.status(500).send({ mensaje: 'No existe ninguna Sucursal' })
        if (Sucursal) return res.status(200).send({ Sucursal })
    })
}
}

function GenerarPdf(req, res) {
    var params = req.body;

    if(req.user.rol != 'ROL_ADMIN'){
        return res.status(500).send({mensaje: 'No posee los permisos para generar el PDF'});
      }
    if (params.sucursalEmpresa === req.user.nombre) {
  
      Sucursal.find({ sucursalEmpresa: req.user.sub }).exec((err, sucursalEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Datos' })
        if (!sucursalEncontrado) return res.status(500).send({ mensaje: 'Error en la consulta de sucursales' })
  
        Datos = sucursalEncontrado
  
        var doc = new pdf();
  
        doc.pipe(fs.createWriteStream(`./pdf/sucursales ${req.user.nombre}.pdf`));
  
        doc.text(`Sucursales de la empresa ${req.user.nombre}`, {
          align: 'center'
        })
  
        doc.end()
  
      })
  
      return res.status(500).send({ mensaje: 'El PDF se ha generado exitosamente' })
  
  
    }
  
  
  
}

module.exports = {
    agregarSucursal,
    EditarSucursal,
    eliminarSucursal,
    GenerarPdf,
    obtenerSucursales
}