export default class ContenidoView() {
  constructor(){
    this.productosContainer =  document.getElementById('productosCont');
    this.divPaginacion = document.getElementById('pagination');
  }

  limpiarContainerProductos(){
      this.productosContainer.replaceChildren();
      this.divPaginacion.replaceChildren();
  }

  async insertarProductosEnContainer(data){
    const documentFragment = document.createDocumentFragment();
    const paginationFragment = document.createDocumentFragment();

    let result = await data;
    let newProducto = '';

    for (var i = 0; i < result.productos.length; i++) {
         newProducto =  this.generarTarjetaProducto(result.productos[i]);
         this.documentFragment.append(newBtn);
    }
    //this.productosContainer.appendChild(this.documentFragment);
    //Se inserta paginacion, Math.ceil para redondear al numero superior total productos / 6
    for (var i = 0; i < Math.ceil(result.total[0].totalProductos/6); i++) {
      paginationFragment.appendChild(this.generarBotonPaginacion(id, name, i));
    }
    this.limpiarContainerProductos();
    this.productosContainer.appendChild(this.documentFragment);
    this.divPagination.appendChild(this.paginationFragment);
  }

  generarTarjetaProducto(dataProducto){
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

  generarBotonPaginacion(id, name, page){
    let li = document.createElement('li');
    let a = document.createElement('a');
    li.classList.add('padge-item');
    a.classList.add('page-link');
    a.textContent = `${page+1}`;
    a.onclick = () => handleContent(id, name, page+1);
    li.appendChild(a);
  return li;
  }

}
