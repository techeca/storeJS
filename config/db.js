const mysql = require('mysql2')

//Datos de conexión para pool
const config = {
  user: 'bsale_test',
  password: 'bsale_test',
  database: 'bsale_test',
  host: 'mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

//Check de conexión //BORRAR
 const pool = mysql.createConnection(config);
 pool.connect((err) => {
   if(err){
     console.log('error connecting:' + err.stack);
   }else {
     console.log('connected successfully to DB.');
   }
 });

module.exports = { pool: mysql.createPool(config) };
