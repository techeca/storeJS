const config =  require('../../config/db.js');
const pool = config.pool;
const { Router } = require('express');
const router = Router();

//Nada
router.get('/', (req, res) => {
      res.json('Las rutas admitidas son /categorias /productos/:name /productosByCategoria?id=nID&page=nPage');
});

//Obtiene todas la categorias
router.get('/categorias', (req, res) => {
  //if(isNaN(req.params) & !isNaN(req.params)){console.log('true?')};
      //if(req.params) throw 'No debe entragar parametros en categorias';
      pool.query('SELECT * FROM category', (err, rows, fields) => {
      if(err) throw console.log('error en query '+err);
       const categorias = rows;
       res.json({categorias});
    }).catch((e) => console.log('error de query '+e));
    pool.releaseConnection(pool);
});

//Obtiene todos los produtos
{/*router.get('/productos', (req, res) => {
    pool.query('SELECT * FROM product', (err, rows, fields) => {
     if(err) throw err;
      //result = rows
      res.json({rows})
    });
    pool.releaseConnection(pool);
});
*/}

//Obtienes productos por nombre
router.get('/productos/:name?', (req, res) => {
    const name = req.params.name;
    if(!req.params.name) throw 'No hay parametros para busqueda';
    pool.query('SELECT * FROM product WHERE name LIKE ?', [`%${name}%`], (err, rows, fields) => {
     if(err) throw err;
      const productos = rows
      res.json({productos})
    });
    pool.releaseConnection(pool);
});

//Obtiene todos los productos dependiendo de la categoria seleccionada
router.get('/productosByCategoria?', async (req, res, next) => {
  //La syntaxis de reques async es un poco diferentes para poder tomar los errores
  //En este caso con try/catch se puede controlar y enviar throw para los errores
  //Las otras request al no ser async se puede enviar el error directamente (throw)
  try {
    const id = req.query.id;
    const page = parseInt(req.query.page - 1);
    const limite = 6;
    let totalProductos = '';
    const promisePool = pool.promise();
    if(!id) throw 'Parametro id incorrecto... ej: /?id=1&page=1';
    if(isNaN(page) || page < 0) throw `Parametro 'page' incorrecto... ej: /?id=1&page=1`;
      //totalProductos es para saber cuantos productos hay y poder calcular cuantos botones de paginas hay que generar
      //Al relizar 2 consultas 1 puede no llegar a tiempo y enviar valores en blanco, para eso asyn/await
      let [rows, fields] = await promisePool.query(`SELECT COUNT(*) as totalProductos FROM product WHERE category = ?`, [id]);
      totalProductos = rows;
        pool.query(`SELECT * FROM product WHERE category = ? LIMIT ${limite} OFFSET ${page * limite}`, [id], (err, rows, fields) => {
          if(err) throw err;
          res.json({productos:rows, total:totalProductos});
        })

      pool.releaseConnection(pool);
  } catch (e) {
      return next(e)
  }
});

//404
//router.get('*', (req, res) => {
//  res.status(404).send('La ruta ingresada no existe!');
//});

module.exports = router;
