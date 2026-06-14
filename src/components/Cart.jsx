import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";

const WHATSAPP = "59897389216";

function formatUnit(unit) {
    if (!unit || unit.trim() === "") return "kg";
    if (parseFloat(unit) === 1) return "unidad";
    if (isNaN(parseFloat(unit))) return unit;
    return `${unit} unid.`;
}

function buildWhatsAppUrl(items, total) {
    const lines = items.map(i =>
        `• ${i.name} x${i.qty}  —  $${(parseFloat(i.price) * i.qty).toFixed(0)}`
    );
    const msg = [
        "Hola! Quisiera hacer el siguiente pedido 🍝",
        "",
        ...lines,
        "",
        `Total estimado: $${total.toFixed(0)}`,
        "",
        "Muchas gracias!",
    ].join("\n");
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

export default function Cart() {
    const { items, changeQty, removeItem, clearCart, count, total, isOpen, setIsOpen } = useCart();

    useEffect(() => {
        const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [setIsOpen]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {isOpen && <div className="cart-overlay" onClick={() => setIsOpen(false)} />}

            <div className={`cart-panel ${isOpen ? "open" : ""}`} role="dialog" aria-label="Carrito de pedido">
                <div className="cart-header">
                    <h3>
                        Tu pedido
                        {count > 0 && <span> ({count} {count === 1 ? "ítem" : "ítems"})</span>}
                    </h3>
                    <button className="cart-close" onClick={() => setIsOpen(false)} aria-label="Cerrar carrito">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="cart-body">
                    {items.length === 0 ? (
                        <div className="cart-empty">
                            <i className="fas fa-cart-shopping"></i>
                            <p>Tu carrito está vacío.</p>
                            <p>Agregá productos desde el catálogo.</p>
                        </div>
                    ) : (
                        <ul className="cart-items">
                            {items.map(item => (
                                <li key={item.id} className="cart-item">
                                    <div className="cart-item-top">
                                        <span className="cart-item-name">{item.name}</span>
                                        <button
                                            className="cart-remove"
                                            onClick={() => removeItem(item.id)}
                                            aria-label={`Eliminar ${item.name}`}
                                        >
                                            <i className="fas fa-trash-can"></i>
                                        </button>
                                    </div>
                                    <div className="cart-item-bottom">
                                        <div className="cart-qty">
                                            <button onClick={() => changeQty(item.id, -1)} aria-label="Restar cantidad">−</button>
                                            <span>{item.qty} {formatUnit(item.unit)}</span>
                                            <button onClick={() => changeQty(item.id, +1)} aria-label="Sumar cantidad">+</button>
                                        </div>
                                        <span className="cart-item-price">
                                            ${(parseFloat(item.price) * item.qty).toFixed(0)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>Total estimado</span>
                            <strong>${total.toFixed(0)}</strong>
                        </div>
                        <a
                            href={buildWhatsAppUrl(items, total)}
                            target="_blank"
                            rel="noreferrer"
                            className="cart-whatsapp-btn"
                        >
                            <i className="fab fa-whatsapp"></i> Enviar pedido por WhatsApp
                        </a>
                        <button className="cart-clear" onClick={clearCart}>Vaciar carrito</button>
                    </div>
                )}
            </div>

            <button
                className="cart-fab"
                onClick={() => setIsOpen(prev => !prev)}
                aria-label="Ver carrito"
            >
                <i className="fas fa-cart-shopping"></i>
                {count > 0 && <span className="cart-badge">{count > 99 ? "99+" : count}</span>}
            </button>
        </>
    );
}
