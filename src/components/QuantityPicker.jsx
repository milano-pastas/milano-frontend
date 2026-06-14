import React, { useState } from "react";

export function isGramBased(unit) {
    return !unit || unit.trim() === "" || unit === "kg";
}

export function formatGrams(steps) {
    const g = steps * 250;
    if (g >= 1000) {
        const kg = g / 1000;
        return kg % 1 === 0 ? `${kg} kg` : `${kg.toFixed(2).replace(".", ",")} kg`;
    }
    return `${g} g`;
}

export function formatCartQty(qty, unit) {
    if (isGramBased(unit)) return formatGrams(qty);
    if (parseFloat(unit) === 1) return qty === 1 ? "1 unidad" : `${qty} unidades`;
    return `${qty} ${unit}`;
}

function parseSabores(sabores) {
    if (!sabores) return [];
    return sabores.split("\n").map(s => s.replace(/^-\s*/, "").trim()).filter(Boolean);
}

export default function QuantityPicker({ product, onConfirm, onCancel }) {
    const gramBased = isGramBased(product.unit);
    const sabores   = parseSabores(product.sabores);
    const [steps, setSteps]             = useState(1);
    const [selectedSabor, setSelectedSabor] = useState(null);

    const needsSabor  = sabores.length > 0;
    const canConfirm  = !needsSabor || selectedSabor !== null;

    const displayQty   = gramBased ? formatGrams(steps) : `${steps} ${steps === 1 ? "unidad" : "unidades"}`;
    const displayPrice = (steps * parseFloat(product.price)).toFixed(0);

    return (
        <div className="qty-picker">
            {needsSabor && (
                <div className="qty-sabores">
                    {sabores.map(s => (
                        <button
                            key={s}
                            className={`qty-sabor-btn${selectedSabor === s ? " selected" : ""}`}
                            onClick={() => setSelectedSabor(s)}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            )}

            <div className="qty-row">
                <button className="qty-btn" onClick={() => setSteps(s => Math.max(1, s - 1))} aria-label="Menos">−</button>
                <span className="qty-label">{displayQty}</span>
                <button className="qty-btn" onClick={() => setSteps(s => s + 1)} aria-label="Más">+</button>
            </div>

            <p className="qty-price">${displayPrice}</p>

            <div className="qty-actions">
                <button
                    className="qty-confirm"
                    onClick={() => canConfirm && onConfirm(steps, selectedSabor)}
                    disabled={!canConfirm}
                >
                    {needsSabor && !selectedSabor ? "Elegí un sabor" : "Agregar al carrito"}
                </button>
                <button className="qty-cancel" onClick={onCancel} aria-label="Cancelar">✕</button>
            </div>
        </div>
    );
}
