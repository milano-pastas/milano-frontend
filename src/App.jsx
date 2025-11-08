import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import Catalog from "./pages/Catalog.jsx";


export default function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Catalog />} />
            </Routes>

            <footer id="contacto" className="footer">
                <div className="container foot-grid">
                    <div>
                        <h4>Contacto</h4>
                        <p>
                            <span className="icon"><i className="fas fa-phone"></i></span>
                            Tel: <a href="tel:24801607">2480 1607</a>
                        </p>
                        <p>
                            <span className="icon"><i className="fas fa-map-marker-alt"></i></span>
                            <a
                                href="https://www.google.com/maps/place/Fabrica+de+Pastas+Milano/@-34.8826742,-56.1557937,17z"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Av. 8 de Octubre 3084, Montevideo
                            </a>
                        </p>
                        <p>
                            <span className="icon"><i className="far fa-clock"></i></span>
                            Lun–Sáb 9:00–19:00
                        </p>
                    </div>

                    <div>
                        <h4>Seguinos</h4>
                        <div className="social-links">
                            <a
                                href="https://www.instagram.com/milano_pastas_/"
                                target="_blank"
                                rel="noreferrer"
                                className="social instagram"
                            >
                                <i className="fab fa-instagram"></i> Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/milanopastas/?locale=es_LA"
                                target="_blank"
                                rel="noreferrer"
                                className="social facebook"
                            >
                                <i className="fab fa-facebook"></i> Facebook
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4>Ubicación</h4>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.946654573555!2d-56.15798162360486!3d-34.88268517228508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959f80f7481b96cf%3A0xf65be77206304acc!2sF%C3%A1brica%20de%20Pastas%20Milano!5e0!3m2!1ses-419!2suy!4v1730291234567!5m2!1ses-419!2suy"
                            width="100%"
                            height="250"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                <div className="copy">
                    © {new Date().getFullYear()} Fábrica de Pastas Milano — Todos los derechos reservados
                </div>
            </footer>
        </>
    );
}
