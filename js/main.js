//PRIMERA CARGA DE WEB
//Inicia la carga de datos para nav y carrito
function firstLoad(){
    //const element =  document.getElementById('productosCont');
    //element.replaceChildren();
    //element.appendChild(loading())
    //document.getElementById("hideAll").style.display = "none" //para ver contenido sin conectarse a api
    loadNav();
    const miCarrito = JSON.parse(localStorage.getItem('miCarrito'));
    //Si tenemos productos cargados anteriormente los cargamos
    if(miCarrito){updateMiniCardCarrito()}
}

//CONTROLES DE CONTENIDO
//Carga categorias a NAV
function loadNav(){
  //Solicitud de categorias // se ejecuta en onload
  fetch('http://localhost:3000/categorias')
    .then(response => response.json())
    .then(json => {
      //Busca el div de navegacion para almacenar las categorias
      const element = document.getElementById('dynamicNav');
      let documentFragment = document.createDocumentFragment();
      //Agrega categorias a contenedor
      for(var i = 0; i < json.rows.length; i++) {
            const newBtn = btnNav(json.rows[i])
            documentFragment.appendChild(newBtn);
      }
      //Modificamos solo 1 vez DOM
      //Se inserta contenedor en div dynamicNav
      element.appendChild(documentFragment);
    }).then(() =>
    //Despues de la carga de las categorias mostramos el contenido
    document.getElementById("hideAll").style.display = "none"
  ).catch((e) => console.log(e));
    //hideAll es un div que oculta el contenido de la página
}
//Cambia el contenido de productosCont (lista de productos)
function handleContent (id, name){
  //Recibe id de categoria y nombre
  //Obtiene el estado actual del div que muestra los productos
  const element =  document.getElementById('productosCont');
  //Limpia nodos en caso de tener contenido
  element.replaceChildren();
  element.appendChild(loading());
  //Contenedor para productos
  let documentFragment = document.createDocumentFragment();
  //Solicitud de productos según categoria seleccionada
  fetch(`http://localhost:3000/productosByCategoria/${id}`)
    .then(response => response.json())
    .then(json => {
      //Agregamos elementos a contenedor
      const productos = json.rows;
      for (var i = 0; i < productos.length; i++) {
        const newCard = productCard(productos[i]);
        documentFragment.appendChild(newCard);
      }

    }).then(() => {
    //Modificamos solo 1 vez DOM
    //Inserta contenedor en div productosCont
    element.replaceChildren();
    element.appendChild(documentFragment)
    });
}
//Cambia el contenido con los productos encontrados
function handleBuscar(){
  const inputBusqueda = document.getElementById('inputBusqueda');
  const name = inputBusqueda.value;
  //console.log(name)
  const element =  document.getElementById('productosCont');
  //Limpia nodos en caso de tener contenido
  element.replaceChildren();
  element.appendChild(loading());
  //Contenedor para productos
  let documentFragment = document.createDocumentFragment();
  //Solicitud de productos según nombre ingresado en input (LIKE)
  fetch(`http://localhost:3000/productos/${name}`)
    .then(response => response.json())
    .then(json => {
      console.log(json)
      const productos = json.rows;
      for (var i = 0; i < productos.length; i++) {
        const newCard = productCard(productos[i]);
        documentFragment.appendChild(newCard);
      }

    }).then(() => {
      element.replaceChildren();
      element.appendChild(documentFragment)
    });
}


//CONTROLES DE CARRITO
//Actualiza elemento en carrito de compra
function updateMiniCardCarrito() {
   let documentFragment = document.createDocumentFragment();
   const element =  document.getElementById('miniCardCarrito');
   //Limpiamos en caso de existir otros a la vista y generamos uno nuevo
   element.replaceChildren();
   //En localStorage están miCarrito estan guardados los producto que el usuario quiere
   const miCarrito = JSON.parse(localStorage.getItem('miCarrito'));
   for (var i = 0; i < miCarrito.length; i++) {
        const a =  document.createElement('a');
        const span =  document.createElement('span');
        //Agregamos clases de Bootstrap y productosEnCarro para la cantidad cantidad y precio
        a.classList.add('dropdown-item');
        span.classList.add('productosEnCarro');
        //Agregamos contenidos
        a.textContent = `${miCarrito[i].nombre}`
        span.textContent = `${miCarrito[i].cantidad} x ${addDots(miCarrito[i].precio*miCarrito[i].cantidad)}`  //addDots
        //Unimos elementos
        a.appendChild(span)
        documentFragment.appendChild(a)
   }
   //Insertamos en nuevo carrito con datos actualizados
   element.appendChild(documentFragment)
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
        for (var i = 0; i < miCarrito.length; i++) {
            if(miCarrito[i].nombre === name){
              let newCant = miCarrito[i].cantidad + 1;
              miCarrito[i].cantidad = newCant;
            }
        }
      }else {
        //No hay producto iguales
        miCarrito.push(nuevoItem)
        localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
      }
    //Actualizamos carrito localStorage con producto nuevo o modificado
    localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
  }else {
    //No hay ningun producto
    miCarrito.push(nuevoItem)
    //Actualizamos carrito localStorage
    localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
  }
  //Actualizamos carrito de compras
  updateMiniCardCarrito()
}

//ESQUELETO PARA DE COMPONENTES
//Componente boton para NAV (Categorias)
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
//Componente Tarjeta de Producto
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
  botonComprar.classList.add('btn', 'btn-primary')
  //Si tiene imagen devuelve el link, si no utiliza la imagen de respaldo noImgUrl
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
//Componente de loading
function loading(){
  let documentFragment = document.createDocumentFragment();
  let loadIcon = document.createElement('i');
  loadIcon.classList.add('fa-solid', 'fa-spinner', 'fa-spin-pulse', 'fa-4x', 'loading')
  documentFragment.appendChild(loadIcon);
  return documentFragment;
}

//UTILS
//Agrega punto cada 3 digitos ///parece que tambien se puede con expresiones regulares //probar
//https://stackoverflow.com/questions/8110313/add-points-after-every-3-digits-on-all-text-fields-with-js
function addDots(nStr){
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {    ///WHAT???
          x1 = x1.replace(rgx, '$1' + '.' + '$2'); // changed comma to dot here
      }
      return x1 + x2;
  }

//Carga nada sacar
function testfunc(){
  fetch('http://localhost:3000/')
    .then(response => response.json())
    .then(json => {
      console.log(json)

      //console.log(json.rows.length)
      //const text = document.createTextNode("Tutorix is the best e-learning platform");
      //tag.appendChild(a);
      const element = document.getElementById('dynamicNav');
      //element.appendChild(tag);
      let documentFragment = document.createDocumentFragment();
      for(var i = 0; i < json.rows.length; i++) {
            console.log(json.rows[i])
            let tag = document.createElement('li')
            let a = document.createElement('a');
            a.value = json.rows[i].name;
            tag.appendChild(a);
            documentFragment.appendChild(tag);
      }
      element.appendChild(documentFragment);

    });

}
