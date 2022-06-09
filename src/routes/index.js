const config =  require('../../config/db.js');
const pool = config.pool;
const { Router } = require('express');
const router = Router();

//Obtiene todas la categorias
router.get('/categorias', (req, res) => {
      pool.query('SELECT * FROM category', (err, rows, fields) => {
      if(err) throw err;
       res.json({rows})
    });
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
    if(!req.params) throw 'No hay parametros para busqueda'
    pool.query('SELECT * FROM product WHERE name LIKE ?', [`%${name}%`], (err, rows, fields) => {
     if(err) throw err;
      //result = rows
      res.json({rows})
    });
    pool.releaseConnection(pool);
});

//Obtiene todos los productos dependiendo de la categoria seleccionada
router.get('/productosByCategoria/:id?', (req, res) => {
    const id = req.params.id;
      if (isNaN(id)) throw 'ID  incorrecta';
      pool.query('SELECT * FROM product WHERE category = ?', [id], (err, rows, fields) => {
        if(err) next();
        //result = rows
        res.json({rows})
      });
      pool.releaseConnection(pool);
});

//404
router.get('*', (req, res) => {
  res.status(404).send('La ruta ingresada no existe!');
});

module.exports = router;
