import React from "react";

const COLORS = [
    { name: "Cream", hex: "#f7f1e3", textColor: "#1f1f1f", note: "Footer, fondos de sección" },
    { name: "Black", hex: "#1f1f1f", textColor: "#ffffff", note: "Texto principal, cards impares" },
    { name: "Brown", hex: "#b07a4a", textColor: "#ffffff", note: "Acento, precios, hover, Instagram" },
    { name: "White", hex: "#ffffff", textColor: "#1f1f1f", border: true, note: "Fondo general, navbar" },
    { name: "WhatsApp", hex: "#25d366", textColor: "#ffffff", note: "Botón flotante WhatsApp" },
];

const TYPOGRAPHY = [
    { label: "H1 — Títulos de página", size: "2.5rem", weight: 700, sample: "Fábrica de Pastas Milano" },
    { label: "H2 — Secciones", size: "2rem", weight: 700, sample: "Nuestros clásicos" },
    { label: "H3 — Cards de producto", size: "1.25rem", weight: 700, sample: "Sorrentinos de jamón y queso" },
    { label: "Body — Descripción", size: "1rem", weight: 400, sample: "Pasta artesanal fresca, sin conservantes ni aditivos." },
    { label: "Small — Legal / copyright", size: "0.8rem", weight: 400, sample: "© 2026 Fábrica de Pastas Milano — Todos los derechos reservados" },
];

const ACCESSIBILITY = [
    { ok: true,  text: 'Idioma declarado en HTML: lang="es"' },
    { ok: true,  text: 'Botón WhatsApp con aria-label descriptivo' },
    { ok: true,  text: 'Alt text en imágenes de producto (usa el nombre)' },
    { ok: true,  text: 'Página 404 con navegación funcional' },
    { ok: true,  text: 'Spinner de carga visible y animado' },
    { ok: false, text: 'Logo negro (.jpg) invisible sobre fondos oscuros o modo invertido — necesita versión clara del logo' },
    { ok: false, text: 'Catálogo: imagen de card sin fallback cuando imageUrl está vacío (Home sí lo tiene)' },
    { ok: false, text: 'Contraste: #b07a4a (brown) sobre blanco → ratio ~3.2:1, por debajo del nivel AA (requiere 4.5:1 en texto normal)' },
    { ok: false, text: 'Sin soporte explícito a prefers-color-scheme: dark — el sitio no tiene modo oscuro declarado' },
    { ok: false, text: 'window.innerWidth en Header.jsx no responde a cambios de tamaño (resize de ventana / rotación de pantalla)' },
];

function ColorSwatch({ name, hex, textColor, note, border }) {
    return (
        <div style={{ width: "160px" }}>
            <div style={{
                background: hex,
                height: "90px",
                borderRadius: "8px 8px 0 0",
                border: border ? "1px solid #ddd" : "none",
                display: "flex",
                alignItems: "flex-end",
                padding: "8px 10px",
            }}>
                <span style={{ color: textColor, fontSize: "11px", fontFamily: "monospace", fontWeight: 700 }}>{hex}</span>
            </div>
            <div style={{ background: "#fafafa", border: "1px solid #eee", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "8px 10px" }}>
                <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: "13px" }}>{name}</p>
                <p style={{ margin: 0, fontSize: "11px", color: "#888" }}>{note}</p>
            </div>
        </div>
    );
}

export default function StyleGuide() {
    return (
        <div style={{ padding: "60px 2rem", maxWidth: "1100px", margin: "0 auto" }}>
            <div style={{ marginBottom: "48px", paddingBottom: "24px", borderBottom: "2px solid #1f1f1f" }}>
                <h1 style={{ margin: "0 0 8px" }}>Guía de estilos</h1>
                <p style={{ margin: 0, color: "#888" }}>
                    Referencia interna — Fábrica de Pastas Milano · {new Date().getFullYear()}
                </p>
            </div>

            {/* PALETA */}
            <section style={{ marginBottom: "60px" }}>
                <h2 style={{ marginBottom: "20px" }}>Paleta de colores</h2>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                    {COLORS.map((c) => <ColorSwatch key={c.name} {...c} />)}
                </div>
            </section>

            {/* TIPOGRAFÍA */}
            <section style={{ marginBottom: "60px" }}>
                <h2 style={{ marginBottom: "8px" }}>Tipografía</h2>
                <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>
                    Familia principal: <strong>Comfortaa</strong> · Headings alternativos disponibles: <strong>Playfair Display</strong>
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                    {TYPOGRAPHY.map((t) => (
                        <div key={t.label} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "24px", alignItems: "center", padding: "18px 0", borderBottom: "1px solid #eee" }}>
                            <div>
                                <p style={{ margin: "0 0 2px", fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "1px" }}>{t.label}</p>
                                <p style={{ margin: 0, fontSize: "11px", fontFamily: "monospace", color: "#b07a4a" }}>{t.size} · w{t.weight}</p>
                            </div>
                            <span style={{ fontSize: t.size, fontWeight: t.weight, lineHeight: 1.2 }}>{t.sample}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* BOTONES */}
            <section style={{ marginBottom: "60px" }}>
                <h2 style={{ marginBottom: "20px" }}>Botones</h2>
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center" }}>
                    <div style={{ textAlign: "center" }}>
                        <button style={{ display: "block", padding: "12px 24px", background: "#1f1f1f", color: "white", border: "none", fontWeight: 700, textTransform: "uppercase", fontSize: "14px", cursor: "pointer", marginBottom: "6px" }}>
                            Primario
                        </button>
                        <span style={{ fontSize: "11px", color: "#888" }}>bg #1f1f1f</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button style={{ display: "block", padding: "12px 24px", background: "transparent", color: "#1f1f1f", border: "2px solid #1f1f1f", fontWeight: 700, textTransform: "uppercase", fontSize: "14px", cursor: "pointer", marginBottom: "6px" }}>
                            Ghost
                        </button>
                        <span style={{ fontSize: "11px", color: "#888" }}>transparent + border</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button style={{ display: "block", padding: "12px 24px", background: "transparent", color: "#b07a4a", border: "2px solid #b07a4a", fontWeight: 700, textTransform: "uppercase", fontSize: "14px", cursor: "pointer", marginBottom: "6px" }}>
                            Ghost Brown
                        </button>
                        <span style={{ fontSize: "11px", color: "#888" }}>404, secundario</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button style={{ display: "block", padding: "10px 20px", background: "#b07a4a", color: "white", border: "none", borderRadius: "999px", fontWeight: 600, fontSize: "14px", cursor: "pointer", marginBottom: "6px" }}>
                            Instagram
                        </button>
                        <span style={{ fontSize: "11px", color: "#888" }}>pill · #b07a4a</span>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <button style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "54px", height: "54px", background: "#25d366", color: "white", border: "none", borderRadius: "50%", fontSize: "24px", cursor: "pointer", marginBottom: "6px" }}>
                            <i className="fab fa-whatsapp"></i>
                        </button>
                        <span style={{ fontSize: "11px", color: "#888" }}>FAB WhatsApp</span>
                    </div>
                </div>
            </section>

            {/* LOGO */}
            <section style={{ marginBottom: "60px" }}>
                <h2 style={{ marginBottom: "8px" }}>Logo</h2>
                <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>
                    Archivo actual: <code>milano-pastas-logo-black.jpg</code> — verificar visibilidad en fondos oscuros
                </p>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                    <div>
                        <div style={{ background: "#ffffff", border: "1px solid #ddd", borderRadius: "8px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", height: "120px" }}>
                            <img src="/milano-pastas-logo-black.jpg" alt="Logo Milano Pastas" style={{ height: "70px", objectFit: "contain" }} />
                        </div>
                        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#27ae60", fontWeight: 700 }}>✓ Fondo blanco (navbar actual)</p>
                    </div>
                    <div>
                        <div style={{ background: "#1f1f1f", borderRadius: "8px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", height: "120px" }}>
                            <img src="/milano-pastas-logo-black.jpg" alt="Logo Milano Pastas" style={{ height: "70px", objectFit: "contain" }} />
                        </div>
                        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#e74c3c", fontWeight: 700 }}>✗ Fondo oscuro — logo desaparece</p>
                    </div>
                    <div>
                        <div style={{ background: "linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)), url('/sorrentinos-nohechos.jpg') center/cover", borderRadius: "8px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", height: "120px" }}>
                            <img src="/milano-pastas-logo-black.jpg" alt="Logo Milano Pastas" style={{ height: "70px", objectFit: "contain" }} />
                        </div>
                        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#e74c3c", fontWeight: 700 }}>✗ Sobre hero — necesita versión blanca</p>
                    </div>
                    <div>
                        <div style={{ background: "#f7f1e3", borderRadius: "8px", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", height: "120px" }}>
                            <img src="/milano-pastas-logo-black.jpg" alt="Logo Milano Pastas" style={{ height: "70px", objectFit: "contain" }} />
                        </div>
                        <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#27ae60", fontWeight: 700 }}>✓ Fondo cream (footer)</p>
                    </div>
                </div>
            </section>

            {/* SPINNER */}
            <section style={{ marginBottom: "60px" }}>
                <h2 style={{ marginBottom: "20px" }}>Estado de carga</h2>
                <div style={{ display: "flex", gap: "40px", alignItems: "center", flexWrap: "wrap" }}>
                    <div>
                        <div className="spinner-wrap" style={{ padding: "20px" }}>
                            <div className="spinner"></div>
                        </div>
                        <p style={{ textAlign: "center", fontSize: "12px", color: "#888" }}>Spinner (productos)</p>
                    </div>
                    <div>
                        <p style={{ fontSize: "14px", color: "#888" }}>
                            Color: <strong style={{ color: "#b07a4a" }}>#b07a4a (brown)</strong><br />
                            Track: <strong>#e0d9cc</strong><br />
                            Tamaño: 48px · Border: 4px<br />
                            Duración: 0.8s linear
                        </p>
                    </div>
                </div>
            </section>

            {/* ACCESIBILIDAD */}
            <section style={{ marginBottom: "60px" }}>
                <h2 style={{ marginBottom: "8px" }}>Checklist de accesibilidad</h2>
                <p style={{ color: "#888", fontSize: "14px", marginBottom: "24px" }}>
                    Basado en WCAG 2.1 Nivel AA (estándar AGESIC Uruguay)
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {ACCESSIBILITY.map((item) => (
                        <div key={item.text} style={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "flex-start",
                            padding: "12px 16px",
                            borderRadius: "6px",
                            background: item.ok ? "#f0faf4" : "#fff5f5",
                            border: `1px solid ${item.ok ? "#c3e6cb" : "#f5c6cb"}`,
                        }}>
                            <span style={{ color: item.ok ? "#27ae60" : "#e74c3c", fontWeight: 700, fontSize: "16px", flexShrink: 0, lineHeight: 1.4 }}>
                                {item.ok ? "✓" : "✗"}
                            </span>
                            <span style={{ fontSize: "14px", lineHeight: 1.5 }}>{item.text}</span>
                        </div>
                    ))}
                </div>
            </section>

            <div style={{ padding: "16px", background: "#fafafa", border: "1px solid #eee", borderRadius: "6px", fontSize: "13px", color: "#888" }}>
                Esta página no está enlazada en el sitio público. Acceso: <code>/guia-estilos</code>
            </div>
        </div>
    );
}
