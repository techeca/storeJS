export default class ContenidoModel() {
  constructor(){
      this.productos = [];
  }

  rellenarContenido(callback) {
    this.onProductosChanged = callback;
  }

//limpiarContainerProductos(){
//      this.productosContainer.replaceChildren();
//      this.divPaginacion.replaceChildren();
//}

async obtenerProductosPorCategoria(id, name, page) {
    const toPage = page ? page : 1

    let response = await fetch(`http://localhost:3000/productosByCategoria?id=${id}&page=${toPage}`);
    let data = await response.json();

    return data;
  }


}
