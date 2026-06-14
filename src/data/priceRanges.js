export const PRICE_RANGES = [
    { label: "$0 - $99 / unidad o 250g",    min: 0,   max: 99 },
    { label: "$100 - $199 / unidad o 250g", min: 100, max: 199 },
    { label: "$200 - $299 / unidad o 250g", min: 200, max: 299 },
    { label: "$300 - $399 / unidad o 250g", min: 300, max: 399 },
    { label: "$400+ / unidad o 250g",       min: 400, max: Infinity },
];

export const SORT_OPTIONS = [
    { key: "name_asc",      label: "Nombre A–Z" },
    { key: "name_desc",     label: "Nombre Z–A" },
    { key: "price_asc",     label: "Precio menor a mayor" },
    { key: "price_desc",    label: "Precio mayor a menor" },
    { key: "category_asc",  label: "Categorías" },
];
