//PRIMERA CARGA DE WEB
//Inicia la carga de datos para nav y carrito
function firstLoad(){
  //const prodtest = new Producto(1, 'nametest', 'precioprotest', 'http:vlavlavbla')
  //const tsrtest = new TarjetaProducto();
    //import {TarjetaProducto} from './TarjetaProducto.js';
    document.getElementById("hideAll").style.display = "none" //para ver contenido sin conectarse a api
    loadNav();
    const miCarrito = JSON.parse(localStorage.getItem('miCarrito'));
    //Si tenemos productos cargados anteriormente los cargamos
    if(miCarrito){updateMiniCardCarrito()}
}

//Nav y Contenido
//Carga categorias a NAV
function loadNav(){
  //prod https://simple-store.onrender.com/
  //Solicitud de categorias // se ejecuta en onload
  fetch('https://simple-store.onrender.com/categorias')
    .then(response => response.json())
    .then(json => {
      //Busca el div de navegacion para almacenar las categorias
      const element = document.getElementById('dynamicNav');
      let documentFragment = document.createDocumentFragment();
      //Agrega categorias a contenedor
      for(let i = 0; i < json.rows.length; i++) {
            const newBtn = btnNav(json.rows[i])
            documentFragment.appendChild(newBtn);
      }
      //Se inserta contenedor en div dynamicNav
      element.appendChild(documentFragment);
      document.getElementById("hideAll").style.display = "none";
      //hideAll es un div que oculta el contenido de la página
    }).catch((e) => {
    if(e.message === 'Failed to fetch'){
      //Si no hay conexion muestra mensaje
      const displayError = document.getElementById('hideAll');
      const documentFragment = document.createDocumentFragment();
      const noConn = document.createElement('h1');
      noConn.textContent = 'No hay conexion con la API, Sorry :(';
      documentFragment.appendChild(noConn);
      //displayError.replaceChildren();
      displayError.appendChild(documentFragment);
    }
  });
}
//Cambia el contenido con los productos encontrados
function handleBuscar(){
  const inputBusqueda = document.getElementById('inputBusqueda');
  const name = inputBusqueda.value;
  const noConnResul = document.createElement('div');
  //Validamos que hay texto
  if(name.length > 0){
    const element =  document.getElementById('productosCont');
    //Limpia nodos en caso de tener contenido
    element.replaceChildren();
    element.appendChild(loading());
    //Contenedor para productos
    let documentFragment = document.createDocumentFragment();
    //Solicitud de productos según nombre ingresado en input (LIKE)
    fetch(`https://simple-store.onrender.com/productos/${name}`)
      .then(response => response.json())
      .then(json => {
        if(json.rows.length > 0){
          const productos = json.rows;
          for (let i = 0; i < productos.length; i++) {
            const newCard = productCard(productos[i]);
            documentFragment.appendChild(newCard);
          }
        }else {
          noConnResul.textContent = 'No tenemos ese producto  :(';
          documentFragment.appendChild(noConnResul);
        }

      }).catch((e) => {
        const noConnResul = document.createElement('div');
        if(e.message === 'Failed to fetch'){
          noConnResul.textContent = 'No hay conexion con la API Sorry';
        }else {
          noConnResul.textContent = 'Eso es una palabra?';
        }
        documentFragment.appendChild(noConnResul);
        //console.log(e);
      }).finally(() => {
        element.replaceChildren();
        element.appendChild(documentFragment)
      });
  }else {
    showNotificacion('Debe ingresar un texto para poder buscar', 'warning')
  }
}
//Cambia el contenido de productosCont (lista de productos)
function handleContent (id, name, page){
  //Recibe id de categoria y nombre
  //Obtiene el estado actual del div que muestra los productos
  const element =  document.getElementById('productosCont');
  const divPagination = document.getElementById('pagination');
  //Limpia nodos en caso de tener contenido
  element.replaceChildren();
  divPagination.replaceChildren();
  element.appendChild(loading());
  //Contenedor para productos
  const documentFragment = document.createDocumentFragment();
  const paginationFragment = document.createDocumentFragment();
  const toPage = page ? page : 1

    //console.log('toPage '+toPage)
  //Solicitud de productos según categoria seleccionada
  fetch(`https://simple-store.onrender.com/productosByCategoria?id=${id}&page=${toPage}`)
    .then(response => response.json())
    .then(json => {
      //Agregamos elementos a contenedor
      const productos = json.productos;
      for (let i = 0; i < productos.length; i++) {
        const newCard = productCard(productos[i]);
        documentFragment.appendChild(newCard);
      }
      //Se inserta paginacion, Math.ceil para redondear al numero superior total productos / 6
      for (var i = 0; i < Math.ceil(json.total[0].totalProductos/6); i++) {
        //console.log(i)
        paginationFragment.appendChild(btnPagination(id, name, i));
      }

    }).then(() => {
    //Modificamos solo 1 vez DOM
    //Inserta contenedor en div productosCont
    element.replaceChildren();
    element.appendChild(documentFragment);
    divPagination.appendChild(paginationFragment);
  }).catch((err) => console.log(err));
}

//Controles de carrito
//Actualiza elemento en carrito de compra
function updateMiniCardCarrito() {
   let documentFragment = document.createDocumentFragment();
   const element =  document.getElementById('miniCardCarrito');
   //Limpiamos en caso de existir otros a la vista y generamos uno nuevo
   element.replaceChildren();
   //titulo carrito, total, btnPagar
   const tituloCarrito = document.createElement('h6');
   tituloCarrito.classList.add('tituloCarrito');
   tituloCarrito.textContent = 'Carrito de compras';
   documentFragment.appendChild(tituloCarrito);
   //En localStorage están miCarrito estan guardados los producto que el usuario quiere
   const miCarrito = JSON.parse(localStorage.getItem('miCarrito'));
   for (let i = 0; i < miCarrito.length; i++) {
        documentFragment.appendChild(productCarrito(miCarrito[i]));
   }
   //Al actualizar puede quedar el carrito sin productos por lo que se debe confirmar
   if(miCarrito.length > 0){
     //Si hay inserta el/los productos
    //btnComprar, total
    //console.log(miCarrito);
    //console.log(miCarrito.map((p) => parseInt(p.precio)).reduce((a, b) => a + b));
    const total = document.createElement('a');
    total.textContent = `Total : $${addDots(miCarrito.map((p) => parseInt(p.precio)).reduce((a, b) => a + b))}`;
    const btnComprar = document.createElement('button');
    const divider = document.createElement('div');
    //Clases de Bootstrap
    btnComprar.classList.add('btn', 'btn-danger', 'btn-sm', 'btnComprar');
    btnComprar.textContent = 'Pagar';
    total.classList.add('totalCompras');
    divider.classList.add('dropdown-divider');
    documentFragment.appendChild(divider);
    total.appendChild(btnComprar);
    documentFragment.appendChild(total);
    element.appendChild(documentFragment)
   }else {
     //No hay producto asi que genera un <i> con con un mensaje
     const noProductos = document.createElement('i');
     noProductos.classList.add('dropdown-item');
     noProductos.textContent = 'Vacío';
     documentFragment.appendChild(noProductos);
     element.appendChild(element.appendChild(documentFragment))
   }
}
//Agrega producto a carrito de compras recibe nombre y descripcion
function agregarProductoCarrito(name, price){
  //Para agregar hay que verificar si el producto ya está agregado por el usuario
  //Buscamos en localStorage, si hay productos lo guardamos si no generamos un array en blanco
  const miCarrito = localStorage.getItem('miCarrito') ? JSON.parse(localStorage.getItem('miCarrito')) : [];
  //Filtramos por el producto que está agregando el usuario
  const productoEnCarrito = miCarrito.filter((producto) => producto.nombre === name)
  //Generamos nuevo producto con datos iniciales
  const nuevoItem = {nombre:name, precio:price, cantidad:1}
  if(miCarrito.length > 0){
   //Hay productos guardados en localStorage
      if(productoEnCarrito.length > 0){
        //Hay productos iguales en carrito al filtrar
        //Modificamos la cantidad del producto que es igual //deberia ser por id
        for (let i = 0; i < miCarrito.length; i++) {
            if(miCarrito[i].nombre === name){
              let newCant = miCarrito[i].cantidad + 1;
              miCarrito[i].cantidad = newCant;
            }
        }
      }else {
        //No hay productos iguales
        miCarrito.push(nuevoItem)
        localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
      }
    //Actualizamos carrito localStorage con producto nuevo o modificado
    localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
  }else {
    //No hay ningun producto igual
    miCarrito.push(nuevoItem)
    //Actualizamos carrito localStorage
    localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
  }
  //Actualizamos carrito de compras
  showNotificacion('Producto agregado al carrito!!', 'success')
  updateMiniCardCarrito()
}
//descontar producto de carrito
function quitarProductoCarrito(name, price){
  //Esta función es una copia de agregarProductoCarrito solo que con menos validaciones
  //Buscamos en localStorage, deberia tener proudctos, la funcion de quitar se genera junto con el producto cada vez que el usuario agrega uno nuevo
  const miCarrito = localStorage.getItem('miCarrito') ? JSON.parse(localStorage.getItem('miCarrito')) : [];
  //Filtramos por el producto que quiere descontar //aqui creo que no es necesario porque ya sabemos que el producto si está en el carrito
                                                    //por lo que no es necesario validar productoEnCarrito ya que siempre es > 0
  const productoEnCarrito = miCarrito.filter((producto) => producto.nombre === name)
   //Hay productos guardados en localStorage
      if(productoEnCarrito.length > 0){
        //Hay productos iguales en carrito al filtrar
        //Modificamos la cantidad del producto que es igual //deberia ser por id
        for (let i = 0; i < miCarrito.length; i++) {
            if(miCarrito[i].nombre === name){
              let newCant = miCarrito[i].cantidad - 1;
              miCarrito[i].cantidad = newCant;
            }
        }
      }
    //Actualizamos carrito localStorage filtramos los productos que quedaron en 0
    const newCarrito = miCarrito.filter((p) => p.cantidad > 0);
    localStorage.setItem('miCarrito', JSON.stringify(newCarrito))
  //Actualizamos carrito de compras
  showNotificacion('Producto descontado', 'danger')
  updateMiniCardCarrito()
}

//Funciones que retornan un fragmento html repetitivo
//Boton para NAV (Categorias)
function btnNav(catData){
  //Recibe informacion de la categoria id y name
  const tempData = catData;
  let tag = document.createElement('li');
  let a = document.createElement('button');
  //Agregamos clases de Bootstrap
  tag.classList.add('nav-item');
  a.classList.add('btn', 'btn-light');
  a.setAttribute('id', tempData.id);
  //Asignamos la funcion de cambio de contenido, se entraga id y nombre
  a.onclick = () => handleContent(`${tempData.id}`, `${tempData.name}`);
  //toMayuscula
  a.textContent = tempData.name.toUpperCase();
  //Unimos elementos
  tag.appendChild(a);

  return tag;
}
//Tarjeta de Producto nombre, imagen, precio, btn comprar
function productCard(proData){
  //Recibe Id de Categoria
  const tempData = proData;
  //Imagen de respaldo para productos sin imagen
  const noImgUrl = 'https://medicaercanarias.com/wp-content/uploads/2019/09/x.jpg'
  let header = document.createElement('div');
  let img = document.createElement('img');
  let card = document.createElement('div');
  let cardBody = document.createElement('div');
  let nameProducto = document.createElement('p');
  let precioProducto = document.createElement('p');
  let botonComprar = document.createElement('button');

  //Se agrega clases de Bootstrap y main.css para ajustar imagen y orden de objetos
  header.classList.add('card-header');
  img.classList.add('card-img-top', 'imagenProducto');
  card.classList.add('card', 'col-md-3','miCard');
  cardBody.classList.add('card-body');
  precioProducto.classList.add('card-text');
  botonComprar.classList.add('btn', 'btn-primary', 'btnAgregar')
  //Si tiene imagen devuelve el link, si no hay imagen utiliza la imagen de respaldo 'noImgUrl'
  img.setAttribute('src' ,`${tempData.url_image ? tempData.url_image : noImgUrl}`);
  card.setAttribute('id', tempData.id);
  botonComprar.onclick = () => agregarProductoCarrito(`${tempData.name}`, `${tempData.price}`);
  //Datos de producto
  header.textContent = tempData.name;
  precioProducto.textContent = `Precio: $${addDots(tempData.price)}`;
  botonComprar.textContent = 'Agregar'
  //Unimos todos los elementos
  cardBody.appendChild(precioProducto);
  card.appendChild(header)
  card.appendChild(img);
  card.appendChild(cardBody);
  card.appendChild(botonComprar);
  return card;
}
//Producto en Carrito nombre, cantidad, total de ese producto, btn para descontar
function productCarrito(proData){
  const newProduct = proData;
  const a =  document.createElement('a');
  const nombProd = document.createElement('span')
  const span =  document.createElement('span');
  const btnMenos = document.createElement('button');
  //Agregamos clases de Bootstrap y productosEnCarro para la cantidad y precio
  a.classList.add('dropdown-item');
  nombProd.classList.add('nombreProdCarrito');
  span.classList.add('precioCantCarrito');  // productosEnCarro
  btnMenos.classList.add('fa-minus', 'fa-solid', 'btn', 'btn-danger', 'btn-sm', 'btnMenos');
  btnMenos.onclick = () => quitarProductoCarrito(`${newProduct.nombre}`, newProduct.precio);
  //Agregamos contenidos
  nombProd.textContent = `${newProduct.nombre}`;
  span.textContent = `${newProduct.cantidad} x ${addDots(newProduct.precio*newProduct.cantidad)}`; //addDots
  //Unimos elementos
  a.appendChild(nombProd);
  a.appendChild(span);
  a.appendChild(btnMenos);

  return a;
}
//Boton de pagination
function btnPagination(id, name, page){
  //const total = Math.ceil(page/6);
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.classList.add('padge-item');
    a.classList.add('page-link');
    a.textContent = `${page+1}`;
    a.onclick = () => handleContent(id, name, page+1);
    li.appendChild(a);
  return li;
}



//Otros
//Panel de notificaciones
function showNotificacion(msg, tipo){
  //Notificacion simple, no hacen stack (una notificacion sobre otra)
  //Si se hace cualquier accion que llame notificacion mientras ya se esté ejecutando una, la última no se verá
  //Buscamos el div definido para notificaciones
  const myNotificaciones = document.getElementById('myNotificaciones');
  const documentFragment = document.createDocumentFragment();
  const alert = document.createElement('div');
  //Clases para notificacion, Bootstrap solo para diseño
  alert.classList.add('alert', `alert-${tipo}`);
  alert.textContent = `${msg}`
  //Modificamos el estado actual de la notificacion
  documentFragment.appendChild(alert);
  myNotificaciones.replaceChildren();
  myNotificaciones.appendChild(documentFragment);
  myNotificaciones.className = 'show';
  //timeout para volver a esconder
  setTimeout(() => {myNotificaciones.className = myNotificaciones.className.replace('show', '');}, 3000);
}
//Resumen de compra??
//loading
function loading(){
  //Retorna icono de carga, handleContent se encarga de llamarlo (o cuando sea necesario)
  let documentFragment = document.createDocumentFragment();
  let loadIcon = document.createElement('i');
  //Clases de FontAwesome para hacer girar y aumentar tamaño
  loadIcon.classList.add('fa-solid', 'fa-spinner', 'fa-spin-pulse', 'fa-4x', 'loading')
  documentFragment.appendChild(loadIcon);
  return documentFragment;
}

//UTILS
function paginate(array, pageSize, pageNumber) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
  }
//Agrega punto cada 3 digitos ///creo que tambien se puede con expresiones regulares //probar
//https://stackoverflow.com/questions/8110313/add-points-after-every-3-digits-on-all-text-fields-with-js
function addDots(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    let rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {    ///WHAT???
          x1 = x1.replace(rgx, '$1' + '.' + '$2'); // changed comma to dot here
      }
      return x1 + x2;
  }
