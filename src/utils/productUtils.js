import { PRODUCTS } from "../data/products";

/**
 * Devuelve todos los productos disponibles (available: true).
 */
export function getAvailableProducts() {
    return PRODUCTS.filter(p => p.available);
}

/**
 * Devuelve un producto por id, o undefined si no existe.
 */
export function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

/**
 * Devuelve productos de una categoría.
 * category = "ALL" devuelve todos los disponibles.
 */
export function getProductsByCategory(category) {
    const available = getAvailableProducts();
    if (category === "ALL") return available;
    return available.filter(p => p.category === category);
}

/**
 * Filtra un array de productos según criterios opcionales:
 *   category   – clave de categoría o "ALL"
 *   search     – string para buscar en name (case-insensitive)
 *   priceRange – { min, max } o null
 */
export function filterProducts(products, { category = "ALL", search = "", priceRange = null } = {}) {
    return products.filter(p => {
        const matchesCategory = category === "ALL" || p.category === category;
        const matchesSearch   = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesPrice    = !priceRange || (p.price >= priceRange.min && p.price <= priceRange.max);
        return matchesCategory && matchesSearch && matchesPrice;
    });
}

/**
 * Ordena un array de productos.
 * sortBy: "name_asc" | "name_desc" | "price_asc" | "price_desc" | "category_asc"
 */
export function sortProducts(products, sortBy = "name_asc") {
    const sorted = [...products];
    switch (sortBy) {
        case "name_asc":     return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case "name_desc":    return sorted.sort((a, b) => b.name.localeCompare(a.name));
        case "price_asc":    return sorted.sort((a, b) => a.price - b.price);
        case "price_desc":   return sorted.sort((a, b) => b.price - a.price);
        case "category_asc": return sorted.sort((a, b) => a.category.localeCompare(b.category));
        default:             return sorted;
    }
}

/**
 * Pipeline completo: filtra + ordena en un solo paso.
 * Equivalente a lo que hoy hace Catalog.jsx con el estado local.
 */
export function getFilteredSortedProducts({ category, search, priceRange, sortBy }) {
    const available = getAvailableProducts();
    const filtered  = filterProducts(available, { category, search, priceRange });
    return sortProducts(filtered, sortBy);
}

/**
 * Devuelve los primeros N productos disponibles (para Home highlights).
 */
export function getHighlights(n = 6) {
    return getAvailableProducts().slice(0, n);
}

/**
 * Formatea el precio de un producto para mostrar en pantalla.
 * Ej: { price: 180, unit: "kg" } → "$180 / kg"
 *     { price: 30,  unit: "1"  } → "$30 / unidad"
 */
export function formatPrice(product) {
    const price = `$${parseFloat(product.price).toFixed(0)}`;
    const unit  = resolveUnit(product.unit);
    return `${price} / ${unit}`;
}

export function resolveUnit(unit) {
    if (unit == null || unit === "") return "kg";
    if (parseFloat(unit) === 1)      return "unidad";
    if (!isNaN(parseFloat(unit)))    return `${unit} unidades`;
    return unit;
}
