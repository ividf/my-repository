require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

//rutas

//middleware de 404 para cuando no hay ruta
app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'not found',
  });
});
//middleware para otros errores que caigan aqui.express ya sabe que cuando le metemos 4 parametros es un controlador de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatus || 500).send({
    status: 'error',
    message: error.message,
  });
});
//lanzamos el servidor

app.listen(3000, () => {
  console.log('servidor funcionando');
});
