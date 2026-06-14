/**
 * Base de datos local de productos.
 * Cada producto refleja la estructura del backend (ProductDTO).
 *
 * Campos:
 *   id          – número único
 *   name        – nombre del producto
 *   description – descripción corta
 *   price       – precio en pesos uruguayos (número)
 *   unit        – "kg" | "unidad" | "500gr" | número de unidades
 *   category    – clave de CATEGORIES (ej. "PASTA_FRESCA")
 *   imageUrl    – ruta relativa a /public o URL externa (null si no hay imagen)
 *   available   – true/false (false = oculto en catálogo)
 *   sabores     – string multilínea con variantes, o null
 */

export const PRODUCTS = [
    // ─── PASTA FRESCA ────────────────────────────────────────────
    {
        id: 1,
        name: "Ñoqui",
        description: "Ñoqui casero de papa y harina",
        price: 180,
        unit: "kg",
        category: "PASTA_FRESCA",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 2,
        name: "Ravioles",
        description: "Ravioles de huevo de 500gr",
        price: 240,
        unit: "kg",
        category: "PASTA_FRESCA",
        imageUrl: null,
        available: true,
        sabores: "- Carne\n- Ricota y espinaca\n- Jamón y queso",
    },
    {
        id: 3,
        name: "Romanitos",
        description: "Romanitos caseros de papa y harina",
        price: 250,
        unit: "kg",
        category: "PASTA_FRESCA",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 4,
        name: "Sorrentinos",
        description: "Sorrentinos de huevo de 500gr",
        price: 300,
        unit: "kg",
        category: "PASTA_FRESCA",
        imageUrl: null,
        available: true,
        sabores: "- Jamón y queso\n- Queso y puerro",
    },
    {
        id: 5,
        name: "Capeletis",
        description: "Capeletis de huevo",
        price: 260,
        unit: "kg",
        category: "PASTA_FRESCA",
        imageUrl: null,
        available: true,
        sabores: "- Carne\n- Ricota",
    },
    {
        id: 6,
        name: "Canelones",
        description: "Masa para canelones",
        price: 150,
        unit: "kg",
        category: "PASTA_FRESCA",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 7,
        name: "Lasaña",
        description: "Masa para lasaña al huevo",
        price: 140,
        unit: "kg",
        category: "PASTA_FRESCA",
        imageUrl: null,
        available: true,
        sabores: null,
    },

    // ─── PASTA SECA ──────────────────────────────────────────────
    {
        id: 8,
        name: "Tallarines",
        description: "Tallarines de huevo de 500gr",
        price: 180,
        unit: "kg",
        category: "PASTA_SECA",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 9,
        name: "Moñas",
        description: "Moñas de huevo",
        price: 170,
        unit: "kg",
        category: "PASTA_SECA",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 10,
        name: "Moñitas",
        description: "Moñitas de huevo",
        price: 170,
        unit: "kg",
        category: "PASTA_SECA",
        imageUrl: null,
        available: true,
        sabores: null,
    },

    // ─── SALSAS ──────────────────────────────────────────────────
    {
        id: 11,
        name: "Salsa carusso",
        description: "Salsa carusso artesanal",
        price: 30,
        unit: "1",
        category: "SALSAS",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 12,
        name: "Salsa de queso",
        description: "Salsa de queso cremosa",
        price: 28,
        unit: "1",
        category: "SALSAS",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 13,
        name: "Salsa pesto",
        description: "Pesto de albahaca fresca",
        price: 35,
        unit: "1",
        category: "SALSAS",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 14,
        name: "Tuco de carne",
        description: "Tuco casero con carne",
        price: 40,
        unit: "1",
        category: "SALSAS",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 15,
        name: "Tuco de pollo",
        description: "Tuco casero con pollo",
        price: 38,
        unit: "1",
        category: "SALSAS",
        imageUrl: null,
        available: true,
        sabores: null,
    },
    {
        id: 16,
        name: "Pomarola",
        description: "Salsa pomarola de tomate natural",
        price: 25,
        unit: "1",
        category: "SALSAS",
        imageUrl: null,
        available: true,
        sabores: null,
    },

    // ─── COMIDAS PREPARADAS ───────────────────────────────────────
    {
        id: 17,
        name: "Empanadas",
        description: "Empanadas horneadas",
        price: 45,
        unit: "1",
        category: "COMIDAS_PREPARADAS",
        imageUrl: null,
        available: true,
        sabores: "- Carne\n- Jamón y queso\n- Caprese",
    },
    {
        id: 18,
        name: "Pizza",
        description: "Pizza al molde",
        price: 250,
        unit: "1",
        category: "COMIDAS_PREPARADAS",
        imageUrl: null,
        available: true,
        sabores: "- Mozzarella\n- Napolitana\n- Jamón y morrones",
    },

    // ─── POSTRES ─────────────────────────────────────────────────
    {
        id: 19,
        name: "Torta de ricota",
        description: "Torta de ricota artesanal",
        price: 300,
        unit: "1",
        category: "POSTRES",
        imageUrl: null,
        available: true,
        sabores: null,
    },

    // ─── BEBIDAS ─────────────────────────────────────────────────
    {
        id: 20,
        name: "Agua mineral",
        description: "Agua mineral 500ml",
        price: 45,
        unit: "1",
        category: "BEBIDAS",
        imageUrl: null,
        available: true,
        sabores: null,
    },
];
