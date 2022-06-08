const config =  require('../../config/db.js');
const pool = config.pool;
const { Router } = require('express');
const router = Router();

//Test
{/*router.get('/', (req, res) => {
    //pool.getConnection();
    pool.query('SELECT * FROM category', (err, rows, fields) => {
     if(err) throw err;
      console.log('The solution is: ', rows);
    });
    pool.releaseConnection(pool);
    res.json(
      {
        'Title': 'Hola desde rutas con nodemon'
      }
    )
});*/}
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
router.get('/productos/:name', (req, res) => {
    const name = req.params.name;
    pool.query('SELECT * FROM product WHERE name LIKE ?', [`%${name}%`], (err, rows, fields) => {
     if(err) throw err;
      //result = rows
      res.json({rows})
    });
    pool.releaseConnection(pool);
});

//Obtiene todos los productos dependiendo de la categoria seleccionada
router.get('/productosByCategoria/:id', (req, res, next) => {
    const id = req.params.id;
      //
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
  res.send('cueck', 404);
});



//No funciona :o
{/*router.get('/detallesProducto', (req, res) => {
    const productoSel = 1;
    pool.query('SELECT * FROM product WHERE id = ?', [productoSel], (err, rows, fields) => {
     if(err) throw err;
      console.log(rows)
      res.json({rows})
    });
    pool.releaseConnection(pool);
});*/}

module.exports = router;
