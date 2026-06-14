import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [items, setItems]   = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const addItem = (product, qty = 1, sabor = null) => {
        const cartKey = `${product.id}_${sabor || ""}`;
        setItems(prev => {
            const found = prev.find(i => i.cartKey === cartKey);
            if (found) return prev.map(i => i.cartKey === cartKey ? { ...i, qty: i.qty + qty } : i);
            return [...prev, {
                cartKey,
                id:    product.id,
                name:  product.name,
                price: product.price,
                unit:  product.unit,
                sabor,
                qty,
            }];
        });
    };

    const changeQty = (cartKey, delta) => {
        setItems(prev =>
            prev.map(i => i.cartKey === cartKey ? { ...i, qty: i.qty + delta } : i)
                .filter(i => i.qty > 0)
        );
    };

    const removeItem = (cartKey) => setItems(prev => prev.filter(i => i.cartKey !== cartKey));
    const clearCart  = () => setItems([]);

    const count = items.reduce((s, i) => s + i.qty, 0);
    const total = items.reduce((s, i) => s + parseFloat(i.price) * i.qty, 0);

    return (
        <CartContext.Provider value={{ items, addItem, changeQty, removeItem, clearCart, count, total, isOpen, setIsOpen }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
