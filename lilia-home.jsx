import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, X, ChevronLeft, ChevronRight, Plus, Trash2,
  Edit2, MessageCircle, Phone, Mail, MapPin, Instagram,
  Facebook, ExternalLink, Star, ArrowLeft, Package,
  Image as ImageIcon, Users, LayoutDashboard, LogOut, Eye
} from "lucide-react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Paleta extraída del PDF / logo de Lilia Home
// Cream:   #F5EFE6  (fondo principal)
// Sand:    #E8D5B7  (fondo secundario / separadores)
// Taupe:   #9E8A73  (color medio, botones secundarios)
// Brown:   #6B5140  (color principal texto / botones)
// Dark:    #3D2B1F  (títulos, énfasis)
// Accent:  #C4956A  (dorado cálido, hover states)
// White:   #FDFAF6  (blanco cálido)

const COLORS = {
  cream:  "#F5EFE6",
  sand:   "#E8D5B7",
  taupe:  "#9E8A73",
  brown:  "#6B5140",
  dark:   "#3D2B1F",
  accent: "#C4956A",
  white:  "#FDFAF6",
};

// ─── LOGO SVG (fiel al logo adjunto) ─────────────────────────────────────────
const LiliaLogo = ({ size = 80, dark = false }) => {
  const textColor = dark ? "#FDFAF6" : "#3D2B1F";
  const flowerColor = dark ? "#E8D5B7" : "#9E8A73";
  const circleColor = dark ? "#E8D5B7" : "#9E8A73";

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 120 100" width={size} height={size * 0.83} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Círculo exterior */}
        <ellipse cx="60" cy="42" rx="36" ry="36" stroke={circleColor} strokeWidth="1.2" fill="none"/>
        {/* Pétalos superiores */}
        <ellipse cx="60" cy="22" rx="5" ry="10" fill={flowerColor} opacity="0.6"/>
        <ellipse cx="60" cy="22" rx="5" ry="10" fill="none" stroke={flowerColor} strokeWidth="0.8"/>
        <ellipse cx="74" cy="28" rx="5" ry="10" fill={flowerColor} opacity="0.6" transform="rotate(50 74 28)"/>
        <ellipse cx="74" cy="28" rx="5" ry="10" fill="none" stroke={flowerColor} strokeWidth="0.8" transform="rotate(50 74 28)"/>
        <ellipse cx="46" cy="28" rx="5" ry="10" fill={flowerColor} opacity="0.6" transform="rotate(-50 46 28)"/>
        <ellipse cx="46" cy="28" rx="5" ry="10" fill="none" stroke={flowerColor} strokeWidth="0.8" transform="rotate(-50 46 28)"/>
        {/* Pétalos laterales */}
        <ellipse cx="79" cy="43" rx="5" ry="9" fill={flowerColor} opacity="0.5" transform="rotate(90 79 43)"/>
        <ellipse cx="41" cy="43" rx="5" ry="9" fill={flowerColor} opacity="0.5" transform="rotate(90 41 43)"/>
        {/* Centro */}
        <circle cx="60" cy="42" r="5" fill={flowerColor}/>
        {/* Estambres */}
        <line x1="60" y1="37" x2="58" y2="31" stroke={flowerColor} strokeWidth="0.8"/>
        <line x1="60" y1="37" x2="62" y2="31" stroke={flowerColor} strokeWidth="0.8"/>
        <line x1="60" y1="37" x2="60" y2="30" stroke={flowerColor} strokeWidth="0.8"/>
        <circle cx="58" cy="31" r="1" fill={flowerColor}/>
        <circle cx="62" cy="31" r="1" fill={flowerColor}/>
        <circle cx="60" cy="30" r="1" fill={flowerColor}/>
        {/* Tallos / hojas */}
        <path d="M60 78 Q58 68 55 58" stroke={flowerColor} strokeWidth="1.2" fill="none"/>
        <path d="M55 58 Q45 60 42 54" stroke={flowerColor} strokeWidth="1" fill="none"/>
        <ellipse cx="48" cy="57" rx="6" ry="3" fill={flowerColor} opacity="0.5" transform="rotate(-30 48 57)"/>
        <path d="M55 58 Q65 52 68 46" stroke={flowerColor} strokeWidth="1" fill="none"/>
        <ellipse cx="62" cy="52" rx="6" ry="3" fill={flowerColor} opacity="0.5" transform="rotate(30 62 52)"/>
      </svg>
      {/* Tipografía */}
      <div style={{ fontFamily: "'Dancing Script', cursive", fontSize: size * 0.38, color: textColor, lineHeight: 1, marginTop: -4 }}>
        Lilia
      </div>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: size * 0.12, letterSpacing: "0.25em", color: textColor, opacity: 0.75, marginTop: 2 }}>
        — HOME —
      </div>
    </div>
  );
};

// ─── DATOS INICIALES ──────────────────────────────────────────────────────────
const INIT_PRODUCTS = [
  { id: 1, name: "Aromatizador línea hogar 500 ML", price: 9500, image: "https://images.unsplash.com/photo-1609254900033-e39ce00acd93?w=400&h=400&fit=crop", description: "Aromatizador premium para el hogar con aroma duradero. 500 ml de pura fragancia.", details: "Duración: 30 días · Fragrancias disponibles: lavanda, cedro, vainilla", category: "Hogar" },
  { id: 2, name: "Aromatizador línea infantil 500 ML", price: 9500, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop", description: "Formulado especialmente para ambientes de niños. Suave y seguro.", details: "Sin alcohol · Fragrancias: talco, manzanilla, bebé fresco", category: "Infantil" },
  { id: 3, name: "Aromatizador línea perfume 500ML", price: 9500, image: "https://images.unsplash.com/photo-1585515320310-39b22bc1cb60?w=400&h=400&fit=crop", description: "Inspirado en los mejores perfumes del mundo. Una experiencia sensorial única.", details: "Inspiraciones: Chanel, Dior, Carolina Herrera · 500 ml", category: "Perfume" },
  { id: 4, name: "Gatillo", price: 1000, image: "https://images.unsplash.com/photo-1608244876244-fe906e37e816?w=400&h=400&fit=crop", description: "Gatillo spray de repuesto compatible con todos nuestros aromatizadores 500ml.", details: "Material: plástico reciclado · Ajuste universal", category: "Accesorios" },
  { id: 5, name: "Aerosol 270 ML", price: 6500, image: "https://images.unsplash.com/photo-1615996001641-b4b4d1f2d4f0?w=400&h=400&fit=crop", description: "Aerosol instantáneo para refrescar ambientes al instante. Fácil de usar.", details: "Presentación compacta · Ideal para baños y autos · 270 ml", category: "Hogar" },
  { id: 6, name: "Difusor aromático 130ML", price: 6500, image: "https://images.unsplash.com/photo-1608244876244-fe906e37e816?w=400&h=400&fit=crop", description: "Difusor con palitos de ratán para una fragancia constante y elegante.", details: "Incluye 6 palitos · Duración: 45 días · 130 ml", category: "Hogar" },
  { id: 7, name: "Difusor de auto 10 ML", price: 6500, image: "https://images.unsplash.com/photo-1609254900033-e39ce00acd93?w=400&h=400&fit=crop", description: "Mantén tu auto siempre perfumado. Diseño elegante para rejilla de ventilación.", details: "Clip universal · Fragrancias: madera, fresco, cítrico · 10 ml", category: "Auto" },
  { id: 8, name: "Aromatizador auto 120ML", price: 3500, image: "https://images.unsplash.com/photo-1585515320310-39b22bc1cb60?w=400&h=400&fit=crop", description: "Spray compacto específico para automóviles. Elimina olores y perfuma al instante.", details: "120 ml · Compatible con ambientadores de auto", category: "Auto" },
  { id: 9, name: "Colonia infantil 120 ML", price: 6500, image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=400&fit=crop", description: "Suave colonia para bebés y niños. Hipoalergénica y sin alcohol.", details: "Dermatológicamente testeada · 120 ml · Apto desde 0 meses", category: "Infantil" },
  { id: 10, name: "Cubo", price: 5000, image: "https://images.unsplash.com/photo-1570129477492-45667003000f?w=400&h=400&fit=crop", description: "Cubo aromatizador decorativo. Fusiona diseño y fragancia en un solo objeto.", details: "Material: madera · Disponible en varios aromas · Ideal regalo", category: "Hogar" },
];

const INIT_CAROUSEL = [
  { id: 1, url: "https://images.unsplash.com/photo-1570129477492-45667003000f?w=1200&h=600&fit=crop", link: null, caption: "Bienvenidos a Lilia HOME" },
  { id: 2, url: "https://images.unsplash.com/photo-1603561596411-07134e71a2a9?w=1200&h=600&fit=crop", link: null, caption: "Aromas que transforman tu hogar" },
  { id: 3, url: "https://images.unsplash.com/photo-1608244876244-fe906e37e816?w=1200&h=600&fit=crop", link: null, caption: "Descubrí nuestra línea premium" },
];

const INIT_TESTIMONIALS = [
  { id: 1, name: "María García", text: "Productos de excelente calidad. Me encantó el aroma del difusor, dura muchísimo!", rating: 5 },
  { id: 2, name: "Juan López", text: "Muy buen servicio y entrega rápida. Los aromatizadores son increíbles.", rating: 5 },
  { id: 3, name: "Carolina Sánchez", text: "Lilia Home cambió mi hogar completamente. Recomendado 100%.", rating: 5 },
];

// ─── STYLES GLOBALES ─────────────────────────────────────────────────────────
const gStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;600;700&family=Cinzel:wght@400;600&family=Lato:wght@300;400;700&display=swap');
  body { background: #F5EFE6; }
  * { box-sizing: border-box; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #F5EFE6; }
  ::-webkit-scrollbar-thumb { background: #9E8A73; border-radius: 3px; }
  .lilia-btn {
    background: #6B5140;
    color: #FDFAF6;
    border: none;
    cursor: pointer;
    transition: all 0.25s;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .lilia-btn:hover { background: #3D2B1F; transform: translateY(-1px); box-shadow: 0 4px 16px rgba(61,43,31,0.25); }
  .lilia-btn-outline {
    background: transparent;
    color: #6B5140;
    border: 1.5px solid #6B5140;
    cursor: pointer;
    transition: all 0.25s;
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    letter-spacing: 0.06em;
  }
  .lilia-btn-outline:hover { background: #6B5140; color: #FDFAF6; }
  .card-hover { transition: all 0.3s; }
  .card-hover:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(61,43,31,0.15) !important; }
  .bounce-wa { animation: waFloat 2.5s ease-in-out infinite; }
  @keyframes waFloat {
    0%, 100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-8px) scale(1.06); }
  }
  .fade-in { animation: fadeIn 0.4s ease; }
  @keyframes fadeIn { from { opacity:0; transform:translateY(12px);} to {opacity:1; transform:translateY(0);} }
  .slide-up { animation: slideUp 0.35s ease; }
  @keyframes slideUp { from { opacity:0; transform:translateY(30px);} to {opacity:1; transform:translateY(0);} }
`;

// ─── MAIN APP ────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("store"); // "store" | "admin"
  const [adminAuth, setAdminAuth] = useState(false);
  const [adminPass, setAdminPass] = useState("");

  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [carousel, setCarousel] = useState(INIT_CAROUSEL);
  const [testimonials, setTestimonials] = useState(INIT_TESTIMONIALS);

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Carrusel auto
  useEffect(() => {
    const t = setInterval(() => setCarouselIdx(p => (p + 1) % carousel.length), 5000);
    return () => clearInterval(t);
  }, [carousel.length]);

  // Carrito helpers
  const addToCart = (product) => {
    setCart(c => {
      const ex = c.find(i => i.id === product.id);
      if (ex) return c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...c, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(c => c.map(i => i.id === id ? { ...i, qty } : i));
  };
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const sendWhatsApp = () => {
    const items = cart.map(i => `• ${i.name} x${i.qty} — $${(i.price * i.qty).toLocaleString("es-AR")}`).join("\n");
    const msg = `Hola! Quiero hacer el siguiente pedido:\n\n${items}\n\n*Total: $${cartTotal.toLocaleString("es-AR")}*\n\n¿Cuál es la forma de pago y envío?`;
    window.open(`https://wa.me/+5491112345678?text=${encodeURIComponent(msg)}`, "_blank");
  };

  // Admin
  const goAdmin = () => setPage("admin");
  const goStore = () => setPage("store");

  if (page === "admin") {
    return <AdminPage
      adminAuth={adminAuth} setAdminAuth={setAdminAuth}
      adminPass={adminPass} setAdminPass={setAdminPass}
      products={products} setProducts={setProducts}
      carousel={carousel} setCarousel={setCarousel}
      testimonials={testimonials} setTestimonials={setTestimonials}
      goStore={goStore}
    />;
  }

  return (
    <div style={{ fontFamily: "'Lato', sans-serif", background: COLORS.cream, minHeight: "100vh" }}>
      <style>{gStyle}</style>

      {/* ── HEADER ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(253,250,246,0.92)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${COLORS.sand}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <LiliaLogo size={70} />
          <nav style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <button onClick={goAdmin} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.taupe, fontSize: 13, fontFamily: "'Lato', sans-serif", letterSpacing: "0.08em" }}>
              Admin
            </button>
            <button onClick={() => setCartOpen(true)} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", color: COLORS.brown }}>
              <ShoppingCart size={26} />
              {cartCount > 0 && (
                <span style={{ position: "absolute", top: -8, right: -8, background: COLORS.accent, color: "#fff", borderRadius: "50%", width: 20, height: 20, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* ── CARRUSEL ── */}
      <section style={{ position: "relative", height: 480, overflow: "hidden", margin: "0 0 0 0" }}>
        {carousel.map((img, i) => (
          <div key={img.id} style={{ position: "absolute", inset: 0, opacity: i === carouselIdx ? 1 : 0, transition: "opacity 1s ease", cursor: img.link ? "pointer" : "default" }}
            onClick={() => img.link && (window.location.hash = img.link)}>
            <img src={img.url} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(61,43,31,0.1), rgba(61,43,31,0.45))" }} />
            <div style={{ position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)", textAlign: "center", color: "#fff" }}>
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 32, textShadow: "0 2px 8px rgba(0,0,0,0.4)", margin: 0 }}>{img.caption}</p>
              {img.link && <span style={{ fontSize: 12, background: "rgba(255,255,255,0.2)", padding: "4px 12px", borderRadius: 20, marginTop: 8, display: "inline-block" }}>Ver producto →</span>}
            </div>
          </div>
        ))}
        {/* Logo overlay */}
        <div style={{ position: "absolute", top: 24, left: "50%", transform: "translateX(-50%)", zIndex: 10, background: "rgba(253,250,246,0.88)", borderRadius: 16, padding: "12px 24px", backdropFilter: "blur(6px)" }}>
          <LiliaLogo size={90} />
        </div>
        {/* Controles */}
        <button onClick={() => setCarouselIdx(p => (p - 1 + carousel.length) % carousel.length)}
          style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(253,250,246,0.85)", border: "none", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.brown, zIndex: 10 }}>
          <ChevronLeft size={22} />
        </button>
        <button onClick={() => setCarouselIdx(p => (p + 1) % carousel.length)}
          style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(253,250,246,0.85)", border: "none", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.brown, zIndex: 10 }}>
          <ChevronRight size={22} />
        </button>
        {/* Dots */}
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 10 }}>
          {carousel.map((_, i) => (
            <button key={i} onClick={() => setCarouselIdx(i)}
              style={{ width: i === carouselIdx ? 28 : 8, height: 8, borderRadius: 4, border: "none", background: i === carouselIdx ? COLORS.accent : "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.3s", padding: 0 }} />
          ))}
        </div>
      </section>

      {/* ── PRODUCTOS ── */}
      <section id="productos" style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 20, color: COLORS.accent, margin: 0 }}>Nuestra colección</p>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 36, color: COLORS.dark, margin: "8px 0 12px" }}>Productos</h2>
          <div style={{ width: 60, height: 2, background: COLORS.accent, margin: "0 auto" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 28 }}>
          {products.map(p => (
            <div key={p.id} className="card-hover" style={{ background: COLORS.white, borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(61,43,31,0.08)", cursor: "pointer" }}>
              <div style={{ position: "relative", height: 240, overflow: "hidden" }} onClick={() => setSelectedProduct(p)}>
                <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                <div style={{ position: "absolute", top: 12, right: 12, background: COLORS.accent, color: "#fff", borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{p.category}</div>
                <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(253,250,246,0.9)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                  onClick={e => { e.stopPropagation(); setSelectedProduct(p); }}>
                  <Eye size={16} color={COLORS.brown} />
                </div>
              </div>
              <div style={{ padding: "20px 20px 24px" }}>
                <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: 14, color: COLORS.dark, margin: "0 0 8px", lineHeight: 1.4 }}>{p.name}</h3>
                <p style={{ color: COLORS.taupe, fontSize: 13, margin: "0 0 16px", lineHeight: 1.5 }}>{p.description.slice(0, 70)}...</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "'Cinzel', serif", fontSize: 20, color: COLORS.brown, fontWeight: 600 }}>${p.price.toLocaleString("es-AR")}</span>
                  <button className="lilia-btn" style={{ borderRadius: 8, padding: "8px 16px", fontSize: 12 }} onClick={() => addToCart(p)}>
                    + Agregar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section style={{ background: COLORS.sand, padding: "64px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: 20, color: COLORS.brown, margin: 0 }}>Lo que dicen</p>
            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: 32, color: COLORS.dark, margin: "8px 0" }}>Nuestros Clientes</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.id} style={{ background: COLORS.white, borderRadius: 16, padding: 28, boxShadow: "0 4px 16px rgba(61,43,31,0.07)" }}>
                <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill={COLORS.accent} color={COLORS.accent} />)}
                </div>
                <p style={{ color: COLORS.taupe, fontStyle: "italic", margin: "0 0 16px", fontSize: 14, lineHeight: 1.7 }}>"{t.text}"</p>
                <p style={{ fontFamily: "'Cinzel', serif", color: COLORS.brown, margin: 0, fontSize: 13 }}>{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: COLORS.dark, color: COLORS.sand, padding: "56px 20px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 40, marginBottom: 40 }}>
            <div>
              <LiliaLogo size={80} dark />
              <p style={{ color: COLORS.taupe, fontSize: 13, lineHeight: 1.8, marginTop: 16 }}>Aromas únicos que transforman cada rincón de tu hogar.</p>
            </div>
            <div>
              <h4 style={{ fontFamily: "'Cinzel', serif", color: COLORS.accent, marginBottom: 16, fontSize: 13, letterSpacing: "0.12em" }}>CONTACTO</h4>
              {[{ icon: <Phone size={14}/>, text: "+54 9 11 1234-5678" }, { icon: <Mail size={14}/>, text: "hola@liliahome.com" }, { icon: <MapPin size={14}/>, text: "Buenos Aires, Argentina" }].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, color: COLORS.taupe, fontSize: 13 }}>{c.icon}{c.text}</div>
              ))}
            </div>
            <div>
              <h4 style={{ fontFamily: "'Cinzel', serif", color: COLORS.accent, marginBottom: 16, fontSize: 13, letterSpacing: "0.12em" }}>REDES</h4>
              <div style={{ display: "flex", gap: 12 }}>
                {[{ icon: <Instagram size={20}/>, href: "#" }, { icon: <Facebook size={20}/>, href: "#" }, { icon: <MessageCircle size={20}/>, href: "https://wa.me/5491112345678" }].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noreferrer"
                    style={{ background: COLORS.brown, color: COLORS.sand, width: 42, height: 42, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.2s", textDecoration: "none" }}
                    onMouseEnter={e => e.currentTarget.style.background = COLORS.accent}
                    onMouseLeave={e => e.currentTarget.style.background = COLORS.brown}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${COLORS.brown}`, paddingTop: 24, textAlign: "center", color: COLORS.taupe, fontSize: 12 }}>
            © 2024 Lilia HOME · Todos los derechos reservados
          </div>
        </div>
      </footer>

      {/* ── WHATSAPP FLOTANTE ── */}
      <a href="https://wa.me/5491112345678" target="_blank" rel="noreferrer" className="bounce-wa"
        style={{ position: "fixed", bottom: 28, right: 28, background: "#25D366", color: "#fff", width: 60, height: 60, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 24px rgba(37,211,102,0.5)", zIndex: 40, textDecoration: "none" }}>
        <MessageCircle size={30} />
      </a>

      {/* ── CARRITO DRAWER ── */}
      {cartOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 60 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(61,43,31,0.5)" }} onClick={() => setCartOpen(false)} />
          <div className="slide-up" style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "min(420px, 100vw)", background: COLORS.white, overflowY: "auto", display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "24px 24px 16px", borderBottom: `1px solid ${COLORS.sand}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: 0, fontSize: 20 }}>Tu pedido</h2>
              <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.taupe }}><X size={24} /></button>
            </div>
            <div style={{ flex: 1, padding: "16px 24px", overflowY: "auto" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", padding: "60px 0", color: COLORS.taupe }}>
                  <ShoppingCart size={48} style={{ margin: "0 auto 16px", display: "block", opacity: 0.3 }} />
                  <p style={{ fontFamily: "'Cinzel', serif" }}>Tu carrito está vacío</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: `1px solid ${COLORS.sand}` }}>
                  <img src={item.image} alt={item.name} style={{ width: 72, height: 72, objectFit: "cover", borderRadius: 10 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Cinzel', serif", fontSize: 13, color: COLORS.dark, margin: "0 0 6px" }}>{item.name}</p>
                    <p style={{ color: COLORS.brown, fontWeight: 700, margin: "0 0 10px", fontSize: 15 }}>${(item.price * item.qty).toLocaleString("es-AR")}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${COLORS.sand}`, background: "none", cursor: "pointer", color: COLORS.brown, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ fontWeight: 700, color: COLORS.dark }}>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 28, height: 28, borderRadius: "50%", border: `1.5px solid ${COLORS.sand}`, background: "none", cursor: "pointer", color: COLORS.brown, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                      <button onClick={() => removeFromCart(item.id)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", color: "#c0392b" }}><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: `1px solid ${COLORS.sand}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark }}>Total</span>
                  <span style={{ fontFamily: "'Cinzel', serif", color: COLORS.brown, fontWeight: 700, fontSize: 22 }}>${cartTotal.toLocaleString("es-AR")}</span>
                </div>
                <button className="lilia-btn" style={{ width: "100%", borderRadius: 12, padding: "14px", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }} onClick={sendWhatsApp}>
                  <MessageCircle size={20} /> Confirmar por WhatsApp
                </button>
                <p style={{ textAlign: "center", fontSize: 11, color: COLORS.taupe, marginTop: 10 }}>Te enviamos un mensaje con los detalles de pago y envío</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── MODAL PRODUCTO ── */}
      {selectedProduct && (
        <div style={{ position: "fixed", inset: 0, zIndex: 70, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(61,43,31,0.6)" }} onClick={() => setSelectedProduct(null)} />
          <div className="fade-in" style={{ position: "relative", background: COLORS.white, borderRadius: 20, width: "min(700px, 100%)", maxHeight: "90vh", overflow: "auto", boxShadow: "0 24px 80px rgba(61,43,31,0.3)" }}>
            <button onClick={() => setSelectedProduct(null)} style={{ position: "absolute", top: 16, right: 16, background: COLORS.sand, border: "none", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}><X size={18} color={COLORS.brown} /></button>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 360 }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "20px 0 0 20px" }} />
              <div style={{ padding: "36px 32px" }}>
                <span style={{ background: COLORS.sand, color: COLORS.brown, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700 }}>{selectedProduct.category}</span>
                <h2 style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: "16px 0 12px", fontSize: 18, lineHeight: 1.4 }}>{selectedProduct.name}</h2>
                <p style={{ color: COLORS.taupe, lineHeight: 1.7, fontSize: 14, marginBottom: 16 }}>{selectedProduct.description}</p>
                <div style={{ background: COLORS.cream, borderRadius: 10, padding: "12px 16px", marginBottom: 24 }}>
                  <p style={{ color: COLORS.brown, fontSize: 13, margin: 0 }}>📋 {selectedProduct.details}</p>
                </div>
                <p style={{ fontFamily: "'Cinzel', serif", fontSize: 28, color: COLORS.brown, margin: "0 0 24px", fontWeight: 600 }}>${selectedProduct.price.toLocaleString("es-AR")}</p>
                <button className="lilia-btn" style={{ width: "100%", borderRadius: 12, padding: "13px", fontSize: 14 }} onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────────────────
function AdminPage({ adminAuth, setAdminAuth, adminPass, setAdminPass, products, setProducts, carousel, setCarousel, testimonials, setTestimonials, goStore }) {
  const [section, setSection] = useState("products"); // products | carousel | testimonials
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({});

  if (!adminAuth) {
    return (
      <div style={{ minHeight: "100vh", background: COLORS.cream, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Lato', sans-serif" }}>
        <style>{gStyle}</style>
        <div style={{ background: COLORS.white, borderRadius: 20, padding: 48, width: "min(400px, 95vw)", boxShadow: "0 16px 60px rgba(61,43,31,0.15)", textAlign: "center" }}>
          <LiliaLogo size={90} />
          <h2 style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: "24px 0 8px" }}>Panel Admin</h2>
          <p style={{ color: COLORS.taupe, fontSize: 13, marginBottom: 28 }}>Ingresá tu contraseña para continuar</p>
          <input type="password" placeholder="Contraseña" value={adminPass} onChange={e => setAdminPass(e.target.value)}
            onKeyDown={e => e.key === "Enter" && (adminPass === "admin123" ? setAdminAuth(true) : alert("Contraseña incorrecta"))}
            style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `2px solid ${COLORS.sand}`, background: COLORS.cream, fontSize: 15, marginBottom: 16, outline: "none", fontFamily: "'Lato', sans-serif" }} />
          <button className="lilia-btn" style={{ width: "100%", borderRadius: 10, padding: 14, fontSize: 14 }}
            onClick={() => adminPass === "admin123" ? setAdminAuth(true) : alert("Contraseña incorrecta")}>
            Ingresar
          </button>
          <button onClick={goStore} style={{ marginTop: 12, background: "none", border: "none", cursor: "pointer", color: COLORS.taupe, fontSize: 13 }}>← Volver a la tienda</button>
        </div>
      </div>
    );
  }

  // ── Helpers CRUD ──
  const saveProduct = () => {
    if (editItem?.id) {
      setProducts(p => p.map(x => x.id === editItem.id ? { ...editItem } : x));
    } else {
      setProducts(p => [...p, { ...newItem, id: Date.now(), price: parseFloat(newItem.price || 0) }]);
    }
    setEditItem(null); setNewItem({});
  };
  const deleteProduct = (id) => setProducts(p => p.filter(x => x.id !== id));

  const saveCarousel = () => {
    if (editItem?.id) {
      setCarousel(c => c.map(x => x.id === editItem.id ? { ...editItem } : x));
    } else {
      setCarousel(c => [...c, { ...newItem, id: Date.now() }]);
    }
    setEditItem(null); setNewItem({});
  };
  const deleteCarousel = (id) => setCarousel(c => c.filter(x => x.id !== id));

  const saveTestimonial = () => {
    if (editItem?.id) {
      setTestimonials(t => t.map(x => x.id === editItem.id ? { ...editItem } : x));
    } else {
      setTestimonials(t => [...t, { ...newItem, id: Date.now(), rating: parseInt(newItem.rating || 5) }]);
    }
    setEditItem(null); setNewItem({});
  };
  const deleteTestimonial = (id) => setTestimonials(t => t.filter(x => x.id !== id));

  const Field = ({ label, field, obj, setObj, type = "text", placeholder = "" }) => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.taupe, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</label>
      <input type={type} placeholder={placeholder} value={obj?.[field] || ""}
        onChange={e => setObj({ ...obj, [field]: e.target.value })}
        style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${COLORS.sand}`, background: COLORS.cream, fontSize: 14, outline: "none", fontFamily: "'Lato', sans-serif" }} />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: COLORS.cream, fontFamily: "'Lato', sans-serif" }}>
      <style>{gStyle}</style>

      {/* Admin Header */}
      <header style={{ background: COLORS.dark, color: COLORS.sand, padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={goStore} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.taupe, display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
            <ArrowLeft size={16} /> Tienda
          </button>
          <span style={{ color: COLORS.brown, fontSize: 20 }}>|</span>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: 16, color: COLORS.accent }}>Panel Admin · Lilia HOME</span>
        </div>
        <button onClick={() => setAdminAuth(false)} style={{ background: "none", border: `1px solid ${COLORS.brown}`, cursor: "pointer", color: COLORS.taupe, display: "flex", alignItems: "center", gap: 6, fontSize: 12, borderRadius: 8, padding: "6px 12px" }}>
          <LogOut size={14} /> Salir
        </button>
      </header>

      <div style={{ display: "flex", minHeight: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <aside style={{ width: 220, background: COLORS.white, borderRight: `1px solid ${COLORS.sand}`, padding: "32px 16px" }}>
          {[
            { id: "products", icon: <Package size={18}/>, label: "Productos" },
            { id: "carousel", icon: <ImageIcon size={18}/>, label: "Carrusel" },
            { id: "testimonials", icon: <Users size={18}/>, label: "Comentarios" },
          ].map(s => (
            <button key={s.id} onClick={() => { setSection(s.id); setEditItem(null); setNewItem({}); }}
              style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 6, textAlign: "left", fontSize: 14, fontWeight: section === s.id ? 700 : 400, background: section === s.id ? COLORS.sand : "transparent", color: section === s.id ? COLORS.dark : COLORS.taupe, transition: "all 0.2s" }}>
              {s.icon} {s.label}
            </button>
          ))}
        </aside>

        {/* Main */}
        <main style={{ flex: 1, padding: 32, overflowY: "auto" }}>

          {/* ── Productos ── */}
          {section === "products" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <h2 style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: 0 }}>Productos</h2>
                <button className="lilia-btn" style={{ borderRadius: 8, padding: "10px 20px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}
                  onClick={() => { setEditItem({}); setNewItem({}); }}>
                  <Plus size={16} /> Agregar
                </button>
              </div>

              {(editItem !== null) && (
                <div className="fade-in" style={{ background: COLORS.white, borderRadius: 14, padding: 28, marginBottom: 28, border: `1.5px solid ${COLORS.sand}` }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", color: COLORS.brown, margin: "0 0 20px" }}>{editItem?.id ? "Editar" : "Nuevo"} Producto</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <Field label="Nombre" field="name" obj={editItem} setObj={setEditItem} />
                    <Field label="Precio" field="price" obj={editItem} setObj={setEditItem} type="number" />
                    <Field label="Categoría" field="category" obj={editItem} setObj={setEditItem} />
                    <Field label="URL Imagen" field="image" obj={editItem} setObj={setEditItem} />
                    <div style={{ gridColumn: "1/-1" }}><Field label="Descripción corta" field="description" obj={editItem} setObj={setEditItem} /></div>
                    <div style={{ gridColumn: "1/-1" }}><Field label="Detalles técnicos" field="details" obj={editItem} setObj={setEditItem} /></div>
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <button className="lilia-btn" style={{ borderRadius: 8, padding: "10px 24px", fontSize: 13 }} onClick={saveProduct}>Guardar</button>
                    <button className="lilia-btn-outline" style={{ borderRadius: 8, padding: "10px 24px", fontSize: 13 }} onClick={() => { setEditItem(null); setNewItem({}); }}>Cancelar</button>
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gap: 12 }}>
                {products.map(p => (
                  <div key={p.id} style={{ background: COLORS.white, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(61,43,31,0.05)" }}>
                    <img src={p.image} alt={p.name} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: "0 0 4px", fontSize: 14 }}>{p.name}</p>
                      <p style={{ color: COLORS.taupe, margin: 0, fontSize: 13 }}>{p.category} · ${p.price.toLocaleString("es-AR")}</p>
                    </div>
                    <button onClick={() => setEditItem({ ...p })} style={{ background: COLORS.sand, border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Edit2 size={15} color={COLORS.brown} /></button>
                    <button onClick={() => deleteProduct(p.id)} style={{ background: "#fdecea", border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={15} color="#c0392b" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Carrusel ── */}
          {section === "carousel" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <h2 style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: 0 }}>Carrusel</h2>
                <button className="lilia-btn" style={{ borderRadius: 8, padding: "10px 20px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}
                  onClick={() => setEditItem({})}>
                  <Plus size={16} /> Agregar imagen
                </button>
              </div>

              {editItem !== null && (
                <div className="fade-in" style={{ background: COLORS.white, borderRadius: 14, padding: 28, marginBottom: 28, border: `1.5px solid ${COLORS.sand}` }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", color: COLORS.brown, margin: "0 0 20px" }}>{editItem?.id ? "Editar" : "Nueva"} Imagen</h3>
                  <Field label="URL de la imagen" field="url" obj={editItem} setObj={setEditItem} />
                  <Field label="Texto / Caption" field="caption" obj={editItem} setObj={setEditItem} />
                  <Field label="Link a producto (URL interna, ej: #productos)" field="link" obj={editItem} setObj={setEditItem} />
                  {editItem.url && <img src={editItem.url} alt="preview" style={{ width: "100%", maxHeight: 200, objectFit: "cover", borderRadius: 10, marginBottom: 16 }} />}
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="lilia-btn" style={{ borderRadius: 8, padding: "10px 24px", fontSize: 13 }} onClick={saveCarousel}>Guardar</button>
                    <button className="lilia-btn-outline" style={{ borderRadius: 8, padding: "10px 24px", fontSize: 13 }} onClick={() => setEditItem(null)}>Cancelar</button>
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gap: 12 }}>
                {carousel.map(img => (
                  <div key={img.id} style={{ background: COLORS.white, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(61,43,31,0.05)" }}>
                    <img src={img.url} alt={img.caption} style={{ width: 100, height: 60, objectFit: "cover", borderRadius: 8 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: "0 0 4px", fontSize: 14 }}>{img.caption}</p>
                      {img.link && <p style={{ color: COLORS.taupe, margin: 0, fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}><ExternalLink size={12} /> {img.link}</p>}
                    </div>
                    <button onClick={() => setEditItem({ ...img })} style={{ background: COLORS.sand, border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Edit2 size={15} color={COLORS.brown} /></button>
                    <button onClick={() => deleteCarousel(img.id)} style={{ background: "#fdecea", border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={15} color="#c0392b" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Testimonios ── */}
          {section === "testimonials" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                <h2 style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: 0 }}>Comentarios</h2>
                <button className="lilia-btn" style={{ borderRadius: 8, padding: "10px 20px", fontSize: 13, display: "flex", alignItems: "center", gap: 8 }}
                  onClick={() => setEditItem({})}>
                  <Plus size={16} /> Agregar
                </button>
              </div>

              {editItem !== null && (
                <div className="fade-in" style={{ background: COLORS.white, borderRadius: 14, padding: 28, marginBottom: 28, border: `1.5px solid ${COLORS.sand}` }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", color: COLORS.brown, margin: "0 0 20px" }}>{editItem?.id ? "Editar" : "Nuevo"} Comentario</h3>
                  <Field label="Nombre del cliente" field="name" obj={editItem} setObj={setEditItem} />
                  <Field label="Comentario" field="text" obj={editItem} setObj={setEditItem} />
                  <Field label="Puntuación (1-5)" field="rating" obj={editItem} setObj={setEditItem} type="number" />
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="lilia-btn" style={{ borderRadius: 8, padding: "10px 24px", fontSize: 13 }} onClick={saveTestimonial}>Guardar</button>
                    <button className="lilia-btn-outline" style={{ borderRadius: 8, padding: "10px 24px", fontSize: 13 }} onClick={() => setEditItem(null)}>Cancelar</button>
                  </div>
                </div>
              )}

              <div style={{ display: "grid", gap: 12 }}>
                {testimonials.map(t => (
                  <div key={t.id} style={{ background: COLORS.white, borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 2px 8px rgba(61,43,31,0.05)" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>{[...Array(t.rating)].map((_, i) => <Star key={i} size={13} fill={COLORS.accent} color={COLORS.accent} />)}</div>
                      <p style={{ fontFamily: "'Cinzel', serif", color: COLORS.dark, margin: "0 0 4px", fontSize: 14 }}>{t.name}</p>
                      <p style={{ color: COLORS.taupe, margin: 0, fontSize: 13, fontStyle: "italic" }}>"{t.text}"</p>
                    </div>
                    <button onClick={() => setEditItem({ ...t })} style={{ background: COLORS.sand, border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Edit2 size={15} color={COLORS.brown} /></button>
                    <button onClick={() => deleteTestimonial(t.id)} style={{ background: "#fdecea", border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Trash2 size={15} color="#c0392b" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
