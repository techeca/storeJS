export default class CategoriasController {
  constructor(model, view){
    this.model = model;
    this.view = view;

    this.model.rellenarContenido(this.onProductosChanged);
    this.view.cambiarCategoria(this.cambiarCategoria);
    this.view.cambiarPagina(this.cambiarPagina);
    this.view.buscarProducto(this.buscarPorNombre);

    //Se obtienen los datos desde modelo
    this.onCategoriasChanged(this.model.categorias);
  }

  onCategoriasChanged = categorias => {
    this.view.mostrarCategorias(categorias);
  }

  onProductosChanged = productos => {
    this.view.insertarProductosEnContainer(productos)
  }

  cambiarCategoria = (id) => {
    this.model.obtenerProductosPorCategoria(id);
  }

  cambiarPagina = (id, page) => {
    this.model.obtenerProductosPorCategoria(id, page);
  }

  buscarPorNombre = (name) => {
    console.log('controller buscarNombre')
    this.model.obtenerProductosPorNombre(name);
  }

}
