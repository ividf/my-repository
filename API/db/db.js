const mysq = require('mysql2/promise');
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env; //aqui desestructuramos todo lo del .env con process.env para tenerlo disponible gracias a la libreria dotenv

//CREAMOS EL POOL DE CONEXIONES
//creamos el pool y le metemos todos los datos del servidor,todo esto gracias a la libreria mysql2
let pool;
const getConnection = async () => {
  if (!pool) {
    pool = mysq.createPool({
      connectionLimit: 0,
      host: MYSQL_HOST,
      user: MYSQL_USER,
      database: MYSQL_DATABASE,
      password: MYSQL_PASSWORD,
      timezone: 'Z',
    });
  }
  //si no devolvemos el pool
  return await pool.getConnection;
};
module.exports = {
  getConnection,
};
