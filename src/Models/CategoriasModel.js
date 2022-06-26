export default class CategoriasModel {
  constructor() {
    this.categorias = this.solicitudCategorias() || [];
    this.productos = [];
  }

  verCategorias(callback) {
    this.onCategoriasChanged = callback;
  }

  rellenarContenido(callback) {
    this.onProductosChanged = callback;
  }

async solicitudCategorias() {
    //prod https://simple-store.onrender.com/
    //Solicitud de categorias y se pasan a json
    let response = await fetch(`http://localhost:3000/categorias`);
    let categorias = await response.json();

    return categorias;
  }

async obtenerProductosPorCategoria(id, page) {
      const toPage = page ? page : 1

      let response = await fetch(`http://localhost:3000/productosByCategoria?id=${id}&page=${toPage}`);
      let data = await response.json();
      //console.log(data)
      //return data;
      this.onProductosChanged(data);
      return data;
  }

async obtenerProductosPorNombre(name) {
    let response = await fetch(`http://localhost:3000/productos/${name}`);
    let data = await response.json();
    this.onProductosChanged(data);
    return data;
  }

}
