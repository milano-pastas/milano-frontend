import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import QuantityPicker from "../components/QuantityPicker";
import { getHighlights } from "../utils/productUtils";
import { CATEGORY_LABEL } from "../data";

const Hero = () => (
    <section className="hero">
        <div className="hero-content container">
            <h1>Fábrica de Pastas Milano</h1>
            <p>Pasta artesanal, fresca y hecha con pasión desde 1976.</p>
        </div>
    </section>
);

const Highlights = () => {
    const products = getHighlights(6);
    const [activePicker, setActivePicker] = useState(null);
    const { addItem, setIsOpen } = useCart();

    const handleConfirm = (product, steps, sabor) => {
        addItem(product, steps, sabor);
        setActivePicker(null);
        setIsOpen(true);
    };

    return (
        <section id="productos" className="highlights container">
            <h2>Nuestros clásicos</h2>
            {products.length === 0 ? (
                <p>⚠️ No hay productos disponibles.</p>
            ) : (
                <>
                    <div className="grid">
                        {products.map((p) => (
                            <div key={p.id} className="card-with-tooltip">
                                <article className="card">
                                    <img
                                        src={p.imageUrl?.trim() ? p.imageUrl : "/sorrentinos-nohechos.jpg"}
                                        alt={p.name}
                                    />
                                    <div className="card-content">
                                        <div>
                                            <h3>{p.name}</h3>
                                            <span className="card-category">{CATEGORY_LABEL[p.category] || p.category}</span>
                                            <p>{p.description}</p>
                                        </div>
                                        <div className="card-bottom">
                                            {activePicker === p.id ? (
                                                <QuantityPicker
                                                    product={p}
                                                    onConfirm={(steps, sabor) => handleConfirm(p, steps, sabor)}
                                                    onCancel={() => setActivePicker(null)}
                                                />
                                            ) : (
                                                <>
                                                    <p className="price">
                                                        ${parseFloat(p.price).toFixed(0)}
                                                        <span className="unit">
                                                            {" / "}
                                                            {p.unit == null || p.unit === "" ? "kg" : parseFloat(p.unit) === 1 ? "unidad" : isNaN(parseFloat(p.unit)) ? p.unit : `${p.unit} unidades`}
                                                        </span>
                                                    </p>
                                                    <button
                                                        className="add-to-cart-btn"
                                                        onClick={() => setActivePicker(p.id)}
                                                    >
                                                        + Agregar
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </article>
                                {p.sabores && (
                                    <div className="sabores-tooltip">
                                        <strong>Sabores</strong>
                                        <pre>{p.sabores}</pre>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="view-more">
                        <a href="/productos" className="btn ghost">
                            VER MÁS PRODUCTOS
                        </a>
                    </div>
                </>
            )}
        </section>
    );
};


const About = () => (
    <section id="historia" className="about container">
        <h2>Hecha con pasión desde 1976</h2>
        <p>
            Más de 60 años elaborando pastas frescas artesanales sin conservantes ni aditivos.
            Nuestra trayectoria avala nuestra calidad y el cariño con que trabajamos cada día.
        </p>
    </section>
);

export default function Home() {
    return (
        <>
            <Hero />
            <Highlights />
            <About />
        </>
    );
}
