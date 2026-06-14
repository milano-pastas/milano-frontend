import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QuantityPicker from "../components/QuantityPicker";
import { getFilteredSortedProducts } from "../utils/productUtils";
import { CATEGORIES, PRICE_RANGES, SORT_OPTIONS, CATEGORY_LABEL } from "../data";

export default function Catalog() {
    const [searchParams] = useSearchParams();

    const initialCategory = searchParams.get("cat") || "ALL";

    const [category, setCategory] = useState(initialCategory);
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState(null);
    const [sortBy, setSortBy] = useState("name_asc");
    const [showFilters, setShowFilters] = useState(false);
    const [activePicker, setActivePicker] = useState(null);
    const { addItem, setIsOpen } = useCart();

    const handleConfirm = (product, steps, sabor) => {
        addItem(product, steps, sabor);
        setActivePicker(null);
        setIsOpen(true);
    };

    const filteredProducts = getFilteredSortedProducts({ category, search, priceRange, sortBy });

    return (
        <>
            <section className="catalog-hero">
                <h1>Catálogo de productos</h1>
                <button
                    className="btn ghost"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    {showFilters ? "Ocultar filtros" : "Filtrar y ordenar"}
                </button>
            </section>

            {/* 🔻 Panel de Filtros */}
            {showFilters && (
                <section
                    className="filter-panel"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "24px",
                        padding: "32px",
                    }}
                >
                    <div>
                        <h4>Categoría</h4>
                        {CATEGORIES.map((cat) => (
                            <label key={cat.key} style={{ display: "block", marginBottom: "4px" }}>
                                <input
                                    type="radio"
                                    name="category"
                                    value={cat.key}
                                    checked={category === cat.key}
                                    onChange={() => setCategory(cat.key)}
                                />{" "}
                                {cat.label}
                            </label>
                        ))}
                    </div>

                    <div>
                        <h4>Precio</h4>
                        {PRICE_RANGES.map((range) => (
                            <label key={range.label} style={{ display: "block", marginBottom: "4px" }}>
                                <input
                                    type="radio"
                                    name="price"
                                    checked={priceRange?.label === range.label}
                                    onChange={() => setPriceRange(range)}
                                />{" "}
                                {range.label}
                            </label>
                        ))}
                        <label style={{ display: "block", marginTop: "4px" }}>
                            <input
                                type="radio"
                                name="price"
                                checked={!priceRange}
                                onChange={() => setPriceRange(null)}
                            />{" "}
                            Todos los precios
                        </label>
                    </div>

                    <div>
                        <h4>Ordenar por</h4>
                        {SORT_OPTIONS.map((opt) => (
                            <label key={opt.key} style={{ display: "block", marginBottom: "4px" }}>
                                <input
                                    type="radio"
                                    name="sort"
                                    value={opt.key}
                                    checked={sortBy === opt.key}
                                    onChange={() => setSortBy(opt.key)}
                                />{" "}
                                {opt.label}
                            </label>
                        ))}
                    </div>

                    <div>
                        <h4>Buscar</h4>
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{
                                padding: "10px 16px",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                width: "100%",
                            }}
                        />
                    </div>
                </section>
            )}

            {/* 🔻 Grid de Productos */}
            <section className="container" style={{ padding: "48px 0" }}>
                {filteredProducts.length === 0 ? (
                    <p>⚠️ No hay productos que coincidan.</p>
                ) : (
                    <div className="grid">
                        {filteredProducts.map((p) => (
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
                )}
            </section>
        </>
    );
}
