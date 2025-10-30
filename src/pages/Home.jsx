import React, { useEffect, useState } from "react";

const Hero = () => (
    <section className="hero">
        <div className="hero-content container">
            <h1>Fábrica de Pastas Milano</h1>
            <p>Pasta artesanal, fresca y hecha con pasión desde 1976.</p>
            <div className="cta">
                <a href="#productos" className="btn primary">Ver productos</a>
                <a href="#historia" className="btn ghost">Conocé la fábrica</a>
            </div>
        </div>
    </section>
);

const Highlights = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/products`;
        fetch(apiUrl)
            .then(res => {
                if (!res.ok) throw new Error(`Error HTTP ${res.status}`);
                return res.json();
            })
            .then(data => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section id="productos" className="highlights container">
            <h2>Nuestros clásicos</h2>
            {loading ? (
                <p>⏳ Cargando productos...</p>
            ) : products.length === 0 ? (
                <p>⚠️ No hay productos disponibles.</p>
            ) : (
                <div className="grid">
                    {products.map((p) => (
                        <article key={p.id} className="card">
                            <img
                                src={p.imageUrl?.trim()
                                    ? p.imageUrl
                                    : "https://images.unsplash.com/photo-1617196034796-73e4c6d74c5d?q=80&w=800&auto=format&fit=crop"}
                                alt={p.name}
                            />
                            <div className="card-content">
                                <h3>{p.name}</h3>
                                <p>{p.description}</p>
                                <p className="price">
                                    ${parseFloat(p.price).toFixed(0)}{" "}
                                    <span className="unit">
                                        {p.unit === "gr" ? "por 500 g" : `/ ${p.unit}`}
                                    </span>
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
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
