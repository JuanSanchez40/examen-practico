import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import SearchIcon from '@mui/icons-material/Search';
import { Encabezado } from './components/Encabezado';
import { TarjetaProducto } from './components/TarjetaProducto';
import { Carrito } from './components/Carrito';
import { useCarritoStore } from './store/carritoStore';
import { productos as productosIniciales } from './data/productos';

/**
 * Patrón Contenedor/Presentacional
 */
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [productos] = useState(productosIniciales);
  const { items: cartItems, addItem, clearCart } = useCarritoStore();

  const productosFiltrados = productos.filter(
    producto => 
      !cartItems.some(item => item.id === producto.id) &&
      producto.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (over && over.id === 'cart-droppable') {
      const productoArrastrado = productos.find(
        p => `product-${p.id}` === active.id
      );
      if (productoArrastrado) {
        addItem(productoArrastrado);
      }
    }
  };

  const handleReset = () => {
    setSearchTerm('');
    clearCart();
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div>
        <Encabezado onReset={handleReset} />
        
        <main className="main-content">
          <div className="search-container">
            <div className="search-wrapper">
              <SearchIcon className="search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos..."
                className="search-input"
              />
            </div>
          </div>

          <div className="products-grid">
            {productosFiltrados.map((producto) => (
              <TarjetaProducto key={producto.id} product={producto} />
            ))}
          </div>
        </main>

        <Carrito />
      </div>
    </DndContext>
  );
}

export default App;