export default class CategoriasView {
  constructor() {
    //Navegación y contenedor de productos
    this.categoriasContainer = document.getElementById('dynamicNav');
    this.categoriaFragment = document.createDocumentFragment();
    this.productosContainer =  document.getElementById('productosCont');
    this.divPaginacion = document.getElementById('pagination');
    this.documentFragment = document.createDocumentFragment();
    this.paginationFragment = document.createDocumentFragment();
    this.paginaSeleccionada = '';
    this.formBusqueda = document.getElementById('formBusqueda');
    this.inputBuscar = document.getElementById('inputBusqueda');
    this.btnBuscar = document.getElementById('btnBuscar');
  }

  get busquedaText(){
    return this.inputBuscar.value;
  }

  //Carga las categorias en la navegacion (dynamicNav)
  async mostrarCategorias(categorias) {
      //Guardamos la información recibida y generamos un boton en el fragmento
      //por cada categoria, luego el fragmento lo agregamos al dynamicNav
      //dynamicNav está conectado al DOM
      let result = await categorias;
      let newBtn = '';
      for (var i = 0; i < result.categorias.length; i++) {
           //console.log(result.categorias[i].name)
           newBtn =  this.generarBotonNav(result.categorias[i]);
           this.categoriaFragment.append(newBtn);
      }
      this.categoriasContainer.appendChild(this.categoriaFragment);
  }

  //Función para mostrar productos
  async insertarProductosEnContainer(data){
    let result = await data.productos ? data.productos : [];
    let paginas = await data.total ? data.total : [0];
    let newProducto = '';

    if(!result || result.length > 0){
      for (var i = 0; i < result.length; i++) {
           newProducto =  this.generarTarjetaProducto(result[i]);
           this.documentFragment.append(newProducto);
      }
      //Se inserta paginacion, Math.ceil para redondear al numero superior total productos / 6
      for (var i = 0; i < Math.ceil(paginas[0].totalProductos/6); i++) {
        this.paginationFragment.append(this.generarBotonPaginacion(i));
      }
      this.limpiarContainerProductos();
      this.productosContainer.appendChild(this.documentFragment);
      this.divPaginacion.appendChild(this.paginationFragment);
     }
    }

  //Cambia la categoria seleccionada
  cambiarCategoria(handler){
    //cambiarCategoria recibe cambiarPagina en controller, este le entrega id y page al
    //model, si no hay page se settea a 1 (para recibir la página número 1)
      this.categoriasContainer.addEventListener('click', event => {
        this.paginaSeleccionada = event.target.id;
        handler(event.target.id)
      })
  }

  //Cambia la pagina actual de productos (no confundir con el cambio de categoria)
  cambiarPagina(handler){
    this.divPaginacion.addEventListener('click', event => {
      handler(this.paginaSeleccionada, event.target.textContent)
    })
  }


  //Busca proudctos por nombre
  buscarProducto(handler){
    this.formBusqueda.addEventListener('submit', event => {
      event.preventDefault();
      //console.log(this.busquedaText)
      handler(this.busquedaText);
      this.inputBuscar.value = '';
    })
  }

  //Limpia contenido actual de dynamicNav
  limpiarContainerProductos(){
        this.productosContainer.replaceChildren();
        this.divPaginacion.replaceChildren();
  }

  //DISEÑO
  //podria cambiarse por componentes y element
  //Diseño de boton para Categorias (nav)
  generarBotonNav(data) {
      const newCategoria = data;
      let tag = document.createElement('li');
      let a = document.createElement('button');
      //Agregamos clases de Bootstrap
      tag.classList.add('nav-item');
      a.classList.add('btn', 'btn-light');
      a.setAttribute('id', newCategoria.id);
      //Asignamos la funcion de cambio de contenido, se entraga id y nombre
      //a.onclick = () => this.cambiarCategoria(`${newCategoria.id}`, `${newCategoria.name}`);
      //toMayuscula
      a.textContent = newCategoria.name.toUpperCase();
      //Unimos elementos
      tag.appendChild(a);

      return tag;
  }
  //Diseño tarjeta de producto
  generarTarjetaProducto(dataProducto){
    const nuevoProducto = dataProducto;
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
      botonComprar.classList.add('btn', 'btn-primary', 'btnAgregar');

      //Si tiene imagen devuelve el link, si no hay imagen utiliza la imagen de respaldo 'noImgUrl'
      img.setAttribute('src' ,`${nuevoProducto.url_image ? nuevoProducto.url_image : noImgUrl}`);
      card.setAttribute('id', nuevoProducto.id);
      //botonComprar.onclick = () => agregarProductoCarrito(`${tempData.name}`, `${tempData.price}`);
      //Datos de producto
      header.textContent = nuevoProducto.name;
      precioProducto.textContent = `Precio: $${this.addDots(nuevoProducto.price)}`;
      botonComprar.textContent = 'Agregar'
      //Unimos todos los elementos
      cardBody.appendChild(precioProducto);
      card.appendChild(header)
      card.appendChild(img);
      card.appendChild(cardBody);
      card.appendChild(botonComprar);
      return card;
  }
  //Diseño boton de paginación
  generarBotonPaginacion(page){
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.classList.add('padge-item');
    a.classList.add('page-link');
    a.textContent = `${page+1}`;
    //a.onclick = () => handleContent(id, name, page+1);
    li.appendChild(a);
  return li;
  }

  //Agrega puntos a precios
  addDots(nStr){
      nStr += '';
      let x = nStr.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? '.' + x[1] : '';
      let rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {    ///WHAT???
            x1 = x1.replace(rgx, '$1' + '.' + '$2'); // changed comma to dot here
        }
        return x1 + x2;
    }

}
