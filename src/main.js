import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'
import '../public/css/main.css'
import CategoriasController from './Controllers/CategoriasController.js'
import CategoriasModel from './Models/CategoriasModel.js'
import CategoriasView from './Views/CategoriasView.js'

//const test = new CategoriasController(new CategoriasModel(), new CategoriasView())

if(await checkConexion() === 'API ON'){
  console.log('Hay conexión con la API, generamos categorias.')
  //Si hay conexion instanciamos las clases de Categorias y Carrito
  //Genera un boton más su respectiva funcion (cambiar contenido) por cada categoria
  const categorias = new CategoriasController(new CategoriasModel(), new CategoriasView())
  //Cargamos boton de carrito y contenido de carrito si es que existe

  //Luego se carga el contenido de la página, al cargar no hay ninguna categoria
  //seleccionada por lo que se define un contenido en blanco

}else {
  //console.log('segunda verificacion false')
  ///console.log(checkConexion())
  console.log('No hay conxión con la API');
}

async function checkConexion(){
  //Realiza un fetch, la respuesta deberia ser API ON en caso
  //de existir conexion con la API, la respuesta se pasa a json
  let response = await fetch('https://simple-store.onrender.com');
  let status = await response.json();

  return status;
}
