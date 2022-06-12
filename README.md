# Frontend

Web realizada con Javascripy y Bootstrap (y JQuery por el mismo Bootstrap).\

## Estructura

/assets (FontAwesome)
/css
/js
  /main.js
/index.html

## Funciones

firstload()
Se encarga de la primera carga de la web, llama a loadNav() y si hay objetos guardados en localStorage llama a updateMiniCardCarrito().

loadNav()
Realiza un fetch para obtener las categorías y crear los elementos a insertar.

handleBuscar()
Busca los productos solicitados y los entrega en el contenido de la web.

handleContent()
Cambia el contenido de la página dependiendo de la sección seleccionada.

handleResumen()
Cambia el contenido del resument de compra.

handlePagar()
Limpiar los productos de localStorage.

updateMiniCardCarrito()
Actualiza carrito de comprar(carrito no resumen).

agregarProductoCarrito()
Agrega producto seleccionado.

quitarProductoCarrito()
Descuenta -1 al producto seleccionado.

btnNav()
Retorna cuerpo de botón de categoría(nombre).

productCard()
Retorna cuerpo de tarjeta de detalle producto (nombre, imagen,precio).

productCarrito()
Retorna cuerpo de producto en carrito (nombre, cantidad, precio total).

btnPagination()
Retorna los botones para paginación(retorna los botones necesarios.)

showNotificacion()
Muestra panel de notificación por 3 seg.

loading()
Retorna div con icono de carga (utilizado en handleContent()).

## DEMO
[Frontend](https://frontend-tn1v.onrender.com)
