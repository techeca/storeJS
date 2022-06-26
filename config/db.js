require('dotenv').config();
const mysql = require('mysql2')

//Datos de conexión para pool
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.HOST,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
//Check de conexión
 const pool = mysql.createConnection(config);
 pool.connect((err) => {
   if(err){
     console.log('error connecting:' + err.stack);
   }else {
     console.log('connected successfully to DB.');
   }
 });

module.exports = { pool: mysql.createPool(config) };
