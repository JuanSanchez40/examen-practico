import { productos } from '../data/productos';
import { api } from '../data/productos';
/**
 * Patrones Servicio y Fábrica
 */
export const ProductosService = {
  obtenerProductos: () => productos,
  
  buscarProductos: (termino) => {
    const terminoLower = termino.toLowerCase();
    return api.filter(producto => 
      producto.title.toLowerCase().includes(terminoLower)
    );
  }
};

// Para pruebas del listado de productos cambiar la variable api por "productos" importada 
// para traerse los datos en duro de los productos
