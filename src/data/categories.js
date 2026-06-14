export const CATEGORIES = [
    { key: "ALL",               label: "Todos" },
    { key: "PASTA_FRESCA",      label: "Pasta fresca" },
    { key: "PASTA_SECA",        label: "Pasta seca" },
    { key: "SALSAS",            label: "Salsas" },
    { key: "COMIDAS_PREPARADAS",label: "Comidas preparadas" },
    { key: "POSTRES",           label: "Postres" },
    { key: "BEBIDAS",           label: "Bebidas" },
    { key: "OTROS",             label: "Otros" },
];

export const CATEGORY_LABEL = Object.fromEntries(
    CATEGORIES.map(c => [c.key, c.label])
);

// Estructura del menú de navegación (header)
export const NAV_MENU = {
    Pastas: {
        "Pasta Fresca": ["Laminada", "Rellena", "Prensa", "Artesanal", "Masas"],
        "Pasta Seca":   ["Tallarines", "Moñas", "Moñitas"],
    },
    "Comidas Preparadas": ["Rotisería", "Pastas prontas", "Pizza", "Empanadas"],
    Salsas:  ["Caruso", "Queso", "Puerro", "Rosa", "Pesto", "Tuco de carne", "Tuco de pollo", "Pomarola"],
    Postres: ["Helados", "Pastelería", "Panadería"],
    Bebidas: ["Refrescos", "Aguas", "Vinos"],
};

// Mapeo de etiqueta de nav → clave de categoría backend
export const NAV_TO_CATEGORY = {
    Pastas:               null,           // agrupa PASTA_FRESCA + PASTA_SECA
    "Comidas Preparadas": "COMIDAS_PREPARADAS",
    Salsas:               "SALSAS",
    Postres:              "POSTRES",
    Bebidas:              "BEBIDAS",
};
