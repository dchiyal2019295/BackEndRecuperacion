'use strict'

const { find } = require("../modelos/productos.model");
var Producto = require("../modelos/productos.model");



function agregarProducto(req, res) {

    var productoModel = new Producto()
    var params = req.body;

    if (req.user.rol != 'ROL_ADMIN') {
        return res.status(500).send({ mensaje: 'No posee los permisos para agregar un producto' })
    }

    delete params.ventas;

    if (params.nombre && params.stock) {

        productoModel.nombre = params.nombre
        productoModel.stock = params.stock
        productoModel.ventas = 0
        productoModel.productoSucursal = req.params.id;

        Producto.find({ nombre: params.nombre }).exec((err, productoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

            if (productoEncontrado && productoEncontrado.length >= 1) {
                return res.status(500).send({ mensaje: 'El producto ya existe' })

            } else {

                productoModel.save((err, productoGuardado) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar el producto' })

                    if (productoGuardado) {
                        return res.status(200).send({ productoGuardado })
                    } else {
                        return res.status(500).send({ mensaje: 'Error al guardar el producto' })
                    }

                })
            }
        })

    } else {
        return res.status(500).send({ mensaje: 'Ingrese todos los parametros necesarios' })

    }

}

module.exports = {

    agregarProducto/*,
    editarProducto,
    EliminarProducto,
    mostrarProductos,
    nombreProducto,
    productosAgotados,
    ProductoMasVendido*/

}