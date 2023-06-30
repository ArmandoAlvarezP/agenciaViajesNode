/* Sintaxis Common JS

 const express = require('express');

*/

// Sintaxis de Imports y Exports

import express from 'express';
import router from './routes/index.js'; // Importante colocar la extensión cuando se usa esta sintaxis 
import db from './config/db.js';

const app = express();

// Conectar la base de datos 
db.authenticate()
    .then( () => console.log('Base de datos conectada') )
    .catch( error => console.log(error) );

// Definir puerto 
const port = 6837; // variable de entorno
// const port = process.env.PORT || 6837; // variable de entorno

// Cada una de las siguientes son lineas de middleware 

// Habilitar pug
app.set('view engine', 'pug');

// Obtener el año actual 
app.use((req, res, next) => {
    // res.locals.unaVariable = 'Una nueva variable';

    // console.log(res.locals);

    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    next();
});

// Agregar body parser para leer los datos del formulario 

app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública 
app.use(express.static('public'));

// Agregar Router 
app.use('/',router); // Soporta todos los verbos http 

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
}); 