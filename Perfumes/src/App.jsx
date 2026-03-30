import './App.css'
import { useState } from 'react'
import perfumeImg from './assets/Perfume 1.jpeg'

const products = [
  {
    id: 1,
    name: 'Sonrisa del Alma',
    price: 6000,
    priceLabel: 'Desde $6.000',
    description: 'Felicidad que florece suavemente. Frescura exótica y delicadeza floral.',
    crystal: 'Rodocrosita',
    category: 'Difusores',
    featured: true,
    image: perfumeImg,
  },
  {
    id: 2,
    name: 'Aurora Dulce',
    price: 6000,
    priceLabel: 'Desde $6.000',
    description: 'Luz, dulzura y armonía con limón, vainilla y coco.',
    crystal: 'Amatista',
    category: 'Difusores',
    featured: false,
    image: perfumeImg,
  },
  {
    id: 3,
    name: 'Luz Serena',
    price: 6000,
    priceLabel: 'Desde $6.000',
    description: 'Equilibrio que inspira. Frescura de naranja y flores blancas.',
    crystal: 'Amatista',
    category: 'Difusores',
    featured: false,
    image: perfumeImg,
  },
  {
    id: 4,
    name: 'Néctar de Cristal',
    price: 6000,
    priceLabel: 'Desde $6.000',
    description: 'Fragancia de luz y amor profundo. Bergamota y rosas.',
    crystal: 'Cuarzo Cristal',
    category: 'Difusores',
    featured: false,
    image: perfumeImg,
  },
  {
    id: 5,
    name: 'Escudo de Luz',
    price: 5000,
    priceLabel: '$5.000',
    description: 'Tu energía es sagrada, hónrala, cuídala. Lavanda y rosas.',
    crystal: 'Cuarzo Cristal, Amatista y Turmalina',
    category: 'Brumas',
    featured: false,
    image: perfumeImg,
  },
  {
    id: 6,
    name: 'Amor Profundo',
    price: 10000,
    priceLabel: '$10.000',
    description: 'Fragancia que abraza el alma con dulzura sagrada.',
    crystal: 'Cuarzo Rosa',
    category: 'Sprays',
    featured: false,
    image: perfumeImg,
  },
]

const categories = [
  {
    id: 1,
    name: 'Difusores',
    description: 'Aromas que transforman ambientes',
    image: perfumeImg,
  },
  {
    id: 2,
    name: 'Brumas y Sprays',
    description: 'Pureza concentrada en cada gota',
    image: perfumeImg,
  },
  {
    id: 3,
    name: 'Velas y Piedras',
    description: 'Rituales de luz y energía',
    image: perfumeImg,
  },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-logo">Free Elixires</a>
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span className="material-icons">menu</span>
        </button>
        <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#hero" onClick={() => setMenuOpen(false)}>INICIO</a></li>
          <li><a href="#tienda" onClick={() => setMenuOpen(false)}>TIENDA</a></li>
          <li><a href="#productos" onClick={() => setMenuOpen(false)}>ELIXIRES</a></li>
          <li><a href="#proceso" onClick={() => setMenuOpen(false)}>NOSOTROS</a></li>
          <li><a href="#footer" onClick={() => setMenuOpen(false)}>CONTACTO</a></li>
        </ul>
        <a href="#" className="navbar-cart">
          <span className="material-icons">shopping_bag</span>
        </a>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero-section">
      <div className="hero-overlay"></div>
      <img
        src="https://freeelixires.com/assets/images/hero-principal.jpg"
        alt="Fragancias artesanales con cristales"
        className="hero-bg"
      />
      <div className="hero-content">
        <h1>El elixir de la naturaleza<br />en tu hogar</h1>
        <p>
          Fragancias artesanales con esencias puras y cristales naturales.
          Transformá tus espacios y tu energía con la alquimia de Free Elixires.
        </p>
        <a href="#productos" className="btn-primary">VER COLECCIÓN</a>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section className="features-section">
      <div className="features-grid">
        <div className="feature-card">
          <span className="material-icons feature-icon">eco</span>
          <h3>Ingredientes naturales</h3>
          <p>Esencias puras, sin sintéticos. Cristales seleccionados uno a uno para cada fragancia.</p>
        </div>
        <div className="feature-card">
          <span className="material-icons feature-icon">pan_tool</span>
          <h3>Elaboración artesanal</h3>
          <p>Cada producto creado a mano, con tiempo, intención y propósito consciente.</p>
        </div>
        <div className="feature-card">
          <span className="material-icons feature-icon">local_shipping</span>
          <h3>Envíos a todo el país</h3>
          <p>Correo Argentino, mensajería local y puntos de retiro. Tu elixir llega a donde estés.</p>
        </div>
      </div>
      <div className="features-cta">
        <a href="#productos" className="btn-outline">NUESTRAS ESENCIAS</a>
      </div>
    </section>
  )
}

function Categories() {
  return (
    <section id="categorias" className="categories-section">
      <h2 className="section-title">Categorías Destacadas</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <a key={cat.id} href="#productos" className="category-card">
            <div className="category-img-wrapper">
              <img src={cat.image} alt={cat.name} />
              <div className="category-overlay"></div>
            </div>
            <div className="category-info">
              <span className="category-label">Categoría {cat.id}</span>
              <h3>{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}

function Tienda() {
  const [filtro, setFiltro] = useState('Todos')
  const categoriasFiltro = ['Todos', ...new Set(products.map((p) => p.category))]
  const productosFiltrados =
    filtro === 'Todos' ? products : products.filter((p) => p.category === filtro)

  return (
    <section id="tienda" className="tienda-section">
      <div className="tienda-header">
        <span className="tienda-label">CATÁLOGO</span>
        <h2 className="section-title">Nuestra Tienda</h2>
        <p className="tienda-subtitle">
          Explorá todas nuestras fragancias artesanales, elaboradas con esencias puras y cristales naturales.
        </p>
      </div>
      <div className="tienda-filtros">
        {categoriasFiltro.map((cat) => (
          <button
            key={cat}
            className={`tienda-filtro-btn ${filtro === cat ? 'active' : ''}`}
            onClick={() => setFiltro(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="tienda-grid">
        {productosFiltrados.map((product) => (
          <div key={product.id} className="tienda-card">
            <div className="tienda-card-img">
              <img src={product.image} alt={product.name} />
              <span className="tienda-card-category">{product.category}</span>
            </div>
            <div className="tienda-card-body">
              <h3 className="tienda-card-name">{product.name}</h3>
              <p className="tienda-card-desc">{product.description}</p>
              <div className="tienda-card-footer">
                <span className="tienda-card-price">{product.priceLabel}</span>
                <button className="tienda-card-btn">AGREGAR</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section className="quote-section">
      <div className="quote-container">
        <blockquote>
          &ldquo;La esencia de lo invisible hecha aroma. Fragancias con alma, creadas con intención.&rdquo;
        </blockquote>
        <span className="quote-label">LO MÁS BUSCADO</span>
      </div>
    </section>
  )
}

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <a href="#" className="product-link">
        {product.featured && <span className="product-badge">DESTACADO</span>}
        <div className="product-img-wrapper">
          <img src={product.image} alt={`${product.name} — Fragancia artesanal con ${product.crystal}`} />
        </div>
        <div className="product-info">
          <h4 className="product-name">{product.name}</h4>
          <span className="product-price">{product.priceLabel}</span>
          <p className="product-desc">{product.description}</p>
        </div>
      </a>
      <button className="btn-add-cart">AGREGAR AL CARRITO</button>
    </div>
  )
}

function BestSellers() {
  return (
    <section id="productos" className="bestsellers-section">
      <div className="bestsellers-header">
        <h2 className="section-title">Los Más Vendidos</h2>
        <a href="#productos" className="btn-outline-sm">VER TODO</a>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

function Process() {
  return (
    <section id="proceso" className="process-section">
      <div className="process-grid">
        <div className="process-image">
          <img
            src="https://freeelixires.com/assets/images/nosotros-proceso.jpg"
            alt="Proceso artesanal"
          />
        </div>
        <div className="process-content">
          <span className="process-label">NUESTRO PROCESO</span>
          <blockquote>
            &ldquo;Creemos que el bienestar comienza con la pureza de lo que nos rodea.
            Cada elixir es una invitación a pausar y conectar.&rdquo;
          </blockquote>
          <p>
            Utilizamos materias primas seleccionadas a mano: aceites esenciales de grado
            terapéutico y cristales cargados bajo la luz de los elementos. Cada producto es
            creado individualmente en nuestro taller, preservando la energía de lo artesanal.
          </p>
          <a href="#footer" className="btn-link">
            CONOCÉ NUESTRA HISTORIA <span className="material-icons">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  )
}

function Instagram() {
  return (
    <section className="instagram-section">
      <span className="instagram-tag">@FREEELIXIRES</span>
      <h2>Seguinos en Instagram y descubrí nuevos rituales</h2>
      <a
        href="https://www.instagram.com/freeelixires"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-instagram"
      >
        <span className="material-icons">photo_camera</span>
        VER INSTAGRAM
      </a>
    </section>
  )
}

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <h2>Free Elixires</h2>
          <p>Artesanía botánica para elevar tus sentidos y armonizar tus espacios.</p>
        </div>
        <div className="footer-col">
          <h4>NAVEGACIÓN</h4>
          <ul>
            <li><a href="#hero">Inicio</a></li>
            <li><a href="#categorias">Tienda</a></li>
            <li><a href="#productos">Elixires</a></li>
            <li><a href="#proceso">Nosotros</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>ATENCIÓN</h4>
          <ul>
            <li><a href="#footer">Contacto</a></li>
            <li><a href="#footer">Envíos y Devoluciones</a></li>
            <li>Correo Argentino · Moto / Mensajería local · Punto de retiro</li>
            <li>Tel: 358 432-3047</li>
            <li>sandrapeano@hotmail.com</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SEGUINOS</h4>
          <div className="footer-social">
            <a href="https://www.instagram.com/freeelixires" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/freeelixires" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://wa.me/5493584323047" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Free Elixires. Todos los derechos reservados.</p>
        <p className="footer-tagline">La esencia de lo invisible hecha aroma.</p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Categories />
      <Tienda />
      <Quote />
      <BestSellers />
      <Process />
      <Instagram />
      <Footer />
    </>
  )
}

export default App

