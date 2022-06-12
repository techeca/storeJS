# API
API realizada con Express, acepta 3 solicitudes: categorias, productos por nombre y productos por categoria.

[Branch-API](https://github.com/techeca/storeJS/tree/API)
```bash
git clone -b API https://github.com/techeca/storeJS.git
````

### DEMO

[API](https://simple-store.onrender.com)

API realizada con ExpressJS.

## Detalles

En `config/db.js` se encuentra la configuración para la base de datos, debe tener `.env` creado para pruebas locales.

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

## Endpoints

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
