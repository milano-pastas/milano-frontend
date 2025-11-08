import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

// 🔸 Constantes
const CATEGORIES = [
    { key: "ALL", label: "Todos" },
    { key: "PASTA_SECA", label: "Pasta seca" },
    { key: "PASTA_FRESCA", label: "Pasta fresca" },
    { key: "SALSAS", label: "Salsas" },
    { key: "POSTRES", label: "Postres" },
    { key: "BEBIDAS", label: "Bebidas" },
    { key: "COMIDAS_PREPARADAS", label: "Comidas preparadas" },
    { key: "OTROS", label: "Otros" },
];

const PRICE_RANGES = [
    { label: "$0 - $99", min: 0, max: 99 },
    { label: "$100 - $199", min: 100, max: 199 },
    { label: "$200 - $299", min: 200, max: 299 },
    { label: "$300 - $399", min: 300, max: 399 },
    { label: "$400+", min: 400, max: Infinity },
];

const SORT_OPTIONS = [
    { key: "name_asc", label: "Nombre A–Z" },
    { key: "name_desc", label: "Nombre Z–A" },
    { key: "price_asc", label: "Precio menor a mayor" },
    { key: "price_desc", label: "Precio mayor a menor" },
    { key: "category_asc", label: "Categoría A–Z" },
];

export default function Catalog() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();

    const initialCategory = searchParams.get("cat") || "ALL";

    const [category, setCategory] = useState(initialCategory);
    const [search, setSearch] = useState("");
    const [priceRange, setPriceRange] = useState(null);
    const [sortBy, setSortBy] = useState("name_asc");
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const apiUrl = `${import.meta.env.VITE_API_URL}/api/products`;
        fetch(apiUrl)
            .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
            .then((data) => {
                setProducts(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredProducts = products
        .filter((p) => {
            const matchesCategory = category === "ALL" || p.category === category;
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
            const matchesPrice =
                !priceRange ||
                (parseFloat(p.price) >= priceRange.min &&
                    parseFloat(p.price) <= priceRange.max);
            return matchesCategory && matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "name_asc":
                    return a.name.localeCompare(b.name);
                case "name_desc":
                    return b.name.localeCompare(a.name);
                case "price_asc":
                    return parseFloat(a.price) - parseFloat(b.price);
                case "price_desc":
                    return parseFloat(b.price) - parseFloat(a.price);
                case "category_asc":
                    return a.category.localeCompare(b.category);
                default:
                    return 0;
            }
        });

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
                    className="container"
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                        gap: "24px",
                        background: "#fafafa",
                        padding: "32px",
                        borderBottom: "1px solid #ddd",
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
                {loading ? (
                    <p>⏳ Cargando productos...</p>
                ) : filteredProducts.length === 0 ? (
                    <p>⚠️ No hay productos que coincidan.</p>
                ) : (
                    <div className="grid">
                        {filteredProducts.map((p) => (
                            <div key={p.id} className="card-with-tooltip">
                                <article className="card">
                                    <img src={p.imageUrl?.trim()} alt={p.name} />
                                    <div className="card-content">
                                        <h3>{p.name}</h3>
                                        <p>{p.description}</p>
                                        <p className="price">
                                            ${parseFloat(p.price).toFixed(0)}
                                            <span className="unit">
                                                {" "}
                                                /{" "}
                                                {p.unit == null || p.unit === "" ? (
                                                    "kg"
                                                ) : parseFloat(p.unit) === 1 ? (
                                                    "unidad"
                                                ) : isNaN(parseFloat(p.unit)) ? (
                                                    p.unit // por si viene texto tipo “500gr”
                                                ) : (
                                                    `${p.unit} unidades`
                                                )}
                                            </span>
                                        </p>
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
