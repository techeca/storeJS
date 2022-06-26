class CarritoModel extends HTMLElement {
  constructor() {
    super();
    this.productos = JSON.parse(localStorage.getItem('miCarrito')) || []
  }

  actualizarCarrito(){
    //cuando se afecte la lista de carrito
    //hay que crear una
  }

  agregarProducto(){
    console.log('producto agregado')
  }

  descontarProducto(){
    console.log('producto agregado')
  }

  limpiarCarrito(){
    console.log('producto agregado')
  }

}

export function testbtn(){
  const p = new Productos();
  console.log(p.productosByName);
}
