import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { useCarritoStore } from '../store/carritoStore';

/**
 * Patrón Presentacional y Observador
 */
export const Carrito = () => {
  const { items, removeItem } = useCarritoStore();
  const { setNodeRef } = useDroppable({
    id: 'cart-droppable',
  });

  return (
    <div ref={setNodeRef} className="cart">
      <div className="cart-header">
        <div className="cart-title">
          <ShoppingCartIcon sx={{ fontSize: 20 }} />
          <span>Carrito de Compras</span>
        </div>
        <span className="cart-badge">
          {items.length} productos
        </span>
      </div>
      
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item-image"
            />
            <div className="cart-item-details">
              <p className="cart-item-title">{item.title}</p>
              <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <IconButton
              onClick={() => removeItem(item.id)}
              size="small"
              className="remove-button"
              aria-label="Eliminar producto"
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>
      
      {items.length > 0 && (
        <div className="cart-total">
          Total: ${items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
        </div>
      )}
    </div>
  );
};