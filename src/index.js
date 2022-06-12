const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
//development config
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//Middleware
app.use(morgan('dev')); //ejecuta morgan solo en development
//app.use(express.urlencoded({extended:false}));  //Necesario para POST/PUT
//app.use(express.json());  //Necesario para POST/PUT
app.use(cors());
app.use(require('./routes/index')); //Rutas de request
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(err.status || 500).send(err);
})

//Inicia servidor
app.listen(app.get('port'), () => {
  console.log(`Server listening on port ${app.get('port')}`);
});
