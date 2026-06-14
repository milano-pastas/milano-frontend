import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = (product) => {
        setItems(prev => {
            const found = prev.find(i => i.id === product.id);
            if (found) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { id: product.id, name: product.name, price: product.price, unit: product.unit, qty: 1 }];
        });
    };

    const changeQty = (id, delta) => {
        setItems(prev =>
            prev.map(i => i.id === id ? { ...i, qty: i.qty + delta } : i).filter(i => i.qty > 0)
        );
    };

    const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id));
    const clearCart = () => setItems([]);

    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addItem, changeQty, removeItem, clearCart, count, total, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
