# storeJS
Frontend y Backend simple con consumo de API.\
Los proyectos estan separados por branch.\
[FRONTEND](https://github.com/techeca/storeJS/tree/Frontend)\
[API](https://github.com/techeca/storeJS/tree/API)

## Frontend
Landing page realizada con JavaScript, los único externo que utiliza es Bootstrap y FontAwesome para el diseño.

## API
API realizada con Express, acepta 3 solicitudes: categorias, productos por nombre y productos por categoria.

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
## Demos

Fue utilizado [Render](https://render.com) para alojar Frontend y API. 

[Front](https://frontend-tn1v.onrender.com)

[API](https://simple-store.onrender.com)
