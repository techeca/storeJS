# storeJS
Frontend y Backend con consumo de API.

## Frontend
Landing page realizada con JavaScript, los único externo que utiliza es Bootstrap y FontAwesome para el diseño.

## Backend
API realizada con Express.

En `/config/db.js` se encuentran los datos necesarios para establecer la pool de conexiones a la base de datos y no perderla.

```bash
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE_NAME,
  host: process.env.HOST,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
```

### Endpoints

Lista de categorias.
> GET /Categorias/
```bash
{
  "categorias": [
    {
      "id": 1,
      "name": "bebida energetica"
    },
    {
      "id": 2,
      "name": "pisco"
    },
    ....
  ]
}
```
Productos por nombre.
> GET /productos/name
```bash
{
  "productos": [
    {
      "id": 35,
      "name": "ENERGETICA MAKKA DRINKS",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/makka-drinks-250ml0455.jpg",
      "price": 1190,
      "discount": 0,
      "category": 1
    }
  ]
}
```
Productos por categorio.
> GET /productosByCategoria/id
> Ej: /productosByCategoria/7
```bash
    {
      "id": 104,
      "name": "ABSOLUT",
      "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png",
      "price": 8990,
      "discount": 30,
      "category": 7
    }
```


### Front
https://frontend-pb6g.onrender.com/

### API
https://simple-store.onrender.com/
