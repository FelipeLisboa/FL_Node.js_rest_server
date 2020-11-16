const express = require('express');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

const categoria = require('../models/categoria');

let app = express();

let Categoria = require('../models/categoria');

/*    CADA TAREA DEBE PEDIR TOKEN     */

//===============================
//  MOSTRAR TODAS LAS CATEGORÍAS
//===============================
app.get('/categoria', verificaToken, (req, res) => {
    Categoria.find({})
        .sort('descripcion') //permite ordenar todos los elementos obtenidos
        .populate('usuario', 'nombre email') //permite revisar que ids existen en la categoría que estoy solicitando y permiten cargar información
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            });

        });

});



//===============================
//  MOSTRAR CATEGORÍA POR ID
//===============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    //Categoria.findById(...);
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es válido'
                }
            });
        }

        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                message: 'El ID no es válido'
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});



//===============================
//  CREAR NUEVA CATEGORÍA
//===============================
app.post('/categoria', verificaToken, (req, res) => {
    //regresa la nueva categoría
    //req.usuario._id;
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});



//===============================
//  ACTUALIZAR CATEGORÍA
//===============================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidator: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        })
    });
});



//===============================
//  ELIMINAR CATEGORÍA
//===============================
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    //solo administrador puede borrar categorías
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                message: 'El id no existe'
            });
        }

        res.json({
            ok: true,
            message: 'Categoría borrada'
        })

    });

});


module.exports = app;