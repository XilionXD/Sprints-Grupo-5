const fs = require('fs');
const path = require('path');

const libros = require('../baseDatos/libros');
const librosPath = path.join(__dirname, '../baseDatos/libros.json')
console.log(librosPath)

const bibliotecaController = {
    /**** BIBLIOTECA ****/
    render : (req, res)=>{
        res.render("biblioteca", {datos: libros})
    },
    /**** CREAR ****/
    renderCrearProductos : (req, res) => {
        res.render('CreacionDeProductos')
    },
    crear: (req, res) =>{
        const nuevoLibro = {
            id: `${Date.now()}`,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            genero: req.body.genero,
            img: req.file?.filename ||  "default.png",
            autor: req.body.autor,
            precio: parseFloat(req.body.precio),
            editorial: req.body.editorial,
            idioma: req.body.idioma,
            cantidad: parseInt(req.body.cantidad),  
        };

        libros.push(nuevoLibro);

        fs.writeFileSync(librosPath, JSON.stringify(libros));

        res.redirect("/biblioteca")
    },
    /**** DETALLE ****/
    renderDetalle : (req, res) => {
        const { id } = req.params;

        const libroID = libros.find((libro) => libro.id === id)

        res.render('detalle-producto', { libroLista : libroID})
    },
    /**** EDITAR ****/
    rendermodificarProductos : (req, res) => {
        const { id } = req.params;

        const editLibro = libros.find((libro) => libro.id === id)

        res.render('ModificarProductos', { editar: editLibro})
    },
    editando: (req, res) => {
        const { id } = req.params;

        const editLibro = libros.find((libro) => libro.id === id)

        const indexLibro = libros.indexOf(editLibro)

        const nuevoLibromodificado = {
            id: editLibro.id,
            titulo : req.body.titulo
        }

        console.log(nuevoLibromodificado)

        libros[indexLibro] = nuevoLibromodificado

        fs.writeFileSync(librosPath, JSON.stringify(libros));


        res.redirect('/biblioteca');
    }
}

module.exports = bibliotecaController;