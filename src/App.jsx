import React, { useEffect, useState } from 'react';
import { adultConcepts, featuredProducts, formatPrice, regularProducts } from './data/products.js';
import { businessInfo } from './data/business.js';

function BrandMark() {
  return <a className="brand" href="#home" aria-label="Kasi Frost home"><span className="brand-icon" aria-hidden="true">✳</span><span>KASI<span className="brand-light">FROST</span></span></a>;
}

function DrinkArt({ color, accent, label, image }) {
  if (image) {
    return <img className="product-image" src={image} alt={`${label} slushie`} loading="lazy" />;
  }

  return (
    <div className="drink-scene" style={{ '--drink': color, '--drink-accent': accent }} aria-label={`${label} slushie illustration`} role="img">
      <span className="ice ice-one" /><span className="ice ice-two" /><span className="ice ice-three" />
      <span className="cup-straw" /><span className="cup-lid" />
      <span className="cup"><span className="cup-shine" /><span className="cup-logo">KF<span>✳</span></span></span>
      <span className="cup-shadow" />
    </div>
  );
}

function ProductCard({ product, onAdd }) {
  const [sizeName, setSizeName] = useState(product.sizes[1].name);
  const chosenSize = product.sizes.find((size) => size.name === sizeName);
  return (
    <article className="product-card">
      <DrinkArt color={product.color} accent={product.accent} label={product.flavor} image={product.image} />
      <div className="product-copy">
        <div className="product-meta"><span>{product.flavor}</span><span className="product-dot" /></div>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <div className="product-buy">
          <label className="size-select"><span className="sr-only">Choose a size for {product.name}</span>
            <select value={sizeName} onChange={(event) => setSizeName(event.target.value)}>
              {product.sizes.map((size) => <option key={size.name} value={size.name}>{size.name} · {formatPrice(size.price)}</option>)}
            </select>
          </label>
          <button className="add-button" type="button" onClick={() => onAdd(product, chosenSize)} disabled={!product.available} aria-label={product.available ? `Add ${product.name}, ${sizeName}, to cart` : `${product.name} is unavailable`}>{product.available ? '+' : '–'}</button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({ cart, onClose, onChangeQuantity, onRemove }) {
  const [deliveryAreaId, setDeliveryAreaId] = useState('');
  const items = Object.values(cart);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryArea = businessInfo.deliveryAreas.find((area) => area.id === deliveryAreaId);
  const deliveryFee = deliveryArea?.fee;
  const total = deliveryFee == null ? null : subtotal + deliveryFee;
  useEffect(() => {
    const closeOnEscape = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  return (
    <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-heading"><div><p className="eyebrow">YOUR PICKS</p><h2 id="cart-title">The cool-down</h2></div><button className="icon-button" onClick={onClose} aria-label="Close cart">×</button></div>
        {items.length === 0 ? <div className="empty-cart"><span aria-hidden="true">✳</span><h3>Your cup is empty.</h3><p>Pick a flavour and we’ll keep it here.</p><button className="text-button" onClick={onClose}>Explore flavours <span aria-hidden="true">↗</span></button></div> : <>
          <ul className="cart-list">{items.map((item) => <li className="cart-line" key={item.key}>
            <div className="cart-swatch" style={{ '--drink': item.color }} aria-hidden="true" />
            <div className="cart-item-copy"><strong>{item.name}</strong><span>{item.size} · {formatPrice(item.price)}</span><div className="quantity-control"><button onClick={() => onChangeQuantity(item.key, -1)} aria-label={`Decrease ${item.name} quantity`}>−</button><span>{item.quantity}</span><button onClick={() => onChangeQuantity(item.key, 1)} aria-label={`Increase ${item.name} quantity`}>+</button></div></div>
            <div className="cart-item-total"><strong>{formatPrice(item.price * item.quantity)}</strong><button className="remove-button" onClick={() => onRemove(item.key)}>Remove</button></div>
          </li>)}</ul>
          <div className="cart-summary"><label className="cart-delivery"><span>Delivery area</span><select value={deliveryAreaId} onChange={(event) => setDeliveryAreaId(event.target.value)}><option value="">Choose an area</option>{businessInfo.deliveryAreas.map((area) => <option key={area.id} value={area.id}>{area.name}{area.fee === 0 ? ' · Free' : area.fee == null ? ' · Confirm by enquiry' : ` · ${formatPrice(area.fee)}`}</option>)}</select></label><div><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><div><span>Delivery</span><strong>{deliveryArea ? deliveryFee == null ? 'Confirm by enquiry' : deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee) : 'Choose area'}</strong></div><div className="cart-total"><span>Total</span><strong>{total == null ? 'Choose area' : formatPrice(total)}</strong></div><p>Menu prices are editable. Delivery outside the listed areas must be confirmed by enquiry.</p><button className="button button-dark checkout-button" onClick={() => { onClose(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}>Place order <span aria-hidden="true">↗</span></button><p className="checkout-note">Enquiry only. No order or payment is submitted on this website.</p></div>
        </>}
      </aside>
    </div>
  );
}

function App() {
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adultGateOpen, setAdultGateOpen] = useState(false);
  const [adultConfirmed, setAdultConfirmed] = useState(false);
  const [ageCheckbox, setAgeCheckbox] = useState(false);
  const [formNotice, setFormNotice] = useState('');
  const cartCount = Object.values(cart).reduce((total, item) => total + item.quantity, 0);

  function addToCart(product, size) {
    const key = `${product.id}-${size.name}`;
    setCart((current) => ({ ...current, [key]: current[key] ? { ...current[key], quantity: current[key].quantity + 1 } : { key, id: product.id, name: product.name, size: size.name, price: size.price, color: product.color, quantity: 1 } }));
    setCartOpen(true);
  }
  function changeQuantity(key, change) {
    setCart((current) => {
      const quantity = current[key].quantity + change;
      if (quantity <= 0) { const next = { ...current }; delete next[key]; return next; }
      return { ...current, [key]: { ...current[key], quantity } };
    });
  }
  function openAdultSection() {
    setAdultGateOpen(true);
    setAgeCheckbox(false);
    setAdultConfirmed(false);
  }
  function submitEnquiry(event) {
    event.preventDefault();
    setFormNotice('This form is a preview and is not connected yet. Please add your real contact details and a form service before publishing.');
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner"><BrandMark />
          <button className="mobile-menu-button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>{menuOpen ? '×' : '☰'}</button>
          <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation" onClick={() => setMenuOpen(false)}><a href="#menu">The menu</a><a href="#story">Our vibe</a><a href="#grown-up">18+ concepts</a><a href="#contact">Find us</a></nav>
          <button className="cart-trigger" onClick={() => setCartOpen(true)} aria-label={`Open cart, ${cartCount} items`}><span className="cart-word">Your cart</span><span className="cart-count">{cartCount}</span></button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy"><p className="eyebrow hero-eyebrow"><span /> MADE FOR SUNNY DAYS IN THE KASI</p><h1>Beat the Heat.<br /><span>Taste the Frost.</span></h1><p className="hero-description">Big fruit energy. Ice-cold refreshment. Kasi Frost brings a little colour to every hot day.</p><div className="hero-actions"><a className="button button-dark" href="#menu">Explore our flavours <span aria-hidden="true">↘</span></a><a className="button button-outline" href="#menu">See the menu</a></div><div className="hero-footnote"><span className="sparkle">✳</span><span>Fruit slushies<br />for the whole crew</span></div></div>
          <div className="hero-art" role="img" aria-label="Illustration of a colourful strawberry slushie"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><div className="hero-sun">SUN<br />OUT</div><DrinkArt color="#f04f69" accent="#ffd8d9" label="strawberry"/><span className="hero-sticker">SIP<br />HAPPY</span><span className="hero-caption">STRAWBERRY<br />STATE OF MIND</span></div>
          <a className="scroll-cue" href="#menu"><span>SCROLL FOR THE GOOD STUFF</span><span aria-hidden="true">↓</span></a>
        </section>

        <section className="featured-section section-wrap" aria-labelledby="featured-title">
          <div className="featured-heading"><div><p className="eyebrow">A FEW GOOD PLACES TO START</p><h2 id="featured-title">Flavour <span>spotlight.</span></h2></div><a className="text-button" href="#menu">See all flavours <span aria-hidden="true">↘</span></a></div>
          <div className="featured-grid">{featuredProducts.map((product) => <a className="featured-card" href="#menu" key={product.id}><span className="featured-swatch" style={{ '--drink': product.color, '--drink-accent': product.accent }}><span>KF</span></span><span className="featured-card-copy"><small>{product.flavor}</small><strong>{product.name}</strong></span><span className="featured-arrow" aria-hidden="true">↗</span></a>)}</div>
        </section>

        <section className="delivery-band" id="delivery" aria-labelledby="delivery-title">
          <div className="delivery-inner section-wrap">
            <div className="delivery-heading"><p className="eyebrow">DELIVERY AROUND MAMELODI</p><h2 id="delivery-title">Cool comes <span>to you.</span></h2><p>Choose your area to see the delivery fee. Other areas are confirmed by enquiry.</p></div>
            <div className="delivery-rates">{businessInfo.deliveryAreas.filter((area) => area.id !== 'other').map((area) => <article className="delivery-rate" key={area.id}><span className="delivery-pin" aria-hidden="true">⌖</span><div><h3>{area.name}</h3><p>{area.description}</p></div><strong>{area.fee === 0 ? 'FREE' : formatPrice(area.fee)}</strong></article>)}</div>
            <p className="delivery-note">Delivery to other areas: <a href={businessInfo.whatsappUrl} target="_blank" rel="noreferrer">message us to confirm availability and fee</a>.</p>
          </div>
        </section>

        <section className="menu-section section-wrap" id="menu">
          <div className="section-heading"><div><p className="eyebrow">THE EVERYDAY COOL-DOWN</p><h2>Pick your <span>frost.</span></h2></div><p className="section-intro">Five fruity favourites. One very good reason to take the long way home.</p></div>
          <div className="product-grid">{regularProducts.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}</div>
          <p className="sample-price-note">Prices shown are editable sample prices in ZAR, not confirmed business prices.</p>
        </section>

        <section className="manifesto" id="story"><div className="manifesto-inner"><span className="manifesto-symbol" aria-hidden="true">✳</span><p className="eyebrow">A LITTLE MORE JOY IN THE DAY</p><h2>Good vibes.<br /><span>Extra ice.</span></h2><p>Made for the after-school dash, the weekend link-up, and every sunny moment in between. Kasi Frost is all about flavour, colour, and sharing the cool.</p><a className="text-button" href="#contact">Come say hello <span aria-hidden="true">↗</span></a></div><div className="manifesto-pattern" aria-hidden="true"><span>FROST</span><span>FROST</span><span>FROST</span><span>FROST</span></div></section>

        <section className="adult-section" id="grown-up"><div className="adult-inner"><div className="adult-copy"><p className="eyebrow"><span className="age-chip">18+</span> A SEPARATE MENU FOR GROWN-UPS</p><h2>After-hours<br /><span>ice, maybe.</span></h2><p>We’re exploring grown-up frozen drink ideas inspired by cider, beer and bright fruit. These are concepts only, not currently available products.</p><button className="button button-light" onClick={openAdultSection}>Enter adults-only section <span aria-hidden="true">↗</span></button><p className="adult-disclaimer">18+ only. An age checkbox is not identity or age verification. No alcohol is available to order here.</p></div><div className="adult-art" aria-hidden="true"><span className="adult-ring"/><span className="adult-glass"><span/></span><span className="adult-lemon">✳</span><span className="adult-label">FROST<br />AFTER<br />HOURS</span></div></div></section>

        <section className="contact-section section-wrap" id="contact"><div className="contact-heading"><p className="eyebrow">LET’S MAKE IT A COOL ONE</p><h2>Say <span>hello.</span></h2><p>Questions, event enquiries, or just want to talk flavours? Drop us a note.</p><div className="contact-placeholders"><div><span>CALL OR WHATSAPP</span><strong>{businessInfo.phone}</strong><div className="contact-actions"><a href={businessInfo.phoneLink}>Call</a><a href={businessInfo.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a></div></div><div><span>EMAIL</span><strong><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a></strong></div><div><span>FIND THE FROST</span><strong>{businessInfo.location}</strong></div><div><span>WHEN WE’RE OPEN</span><strong>{businessInfo.hours}</strong></div></div><div className="social-placeholder">{businessInfo.socials.map((social) => social.url ? <a href={social.url} key={social.name} target="_blank" rel="noreferrer">{social.name}</a> : <span key={social.name}>{social.name} link to be added</span>)}</div></div><form className="contact-form" onSubmit={submitEnquiry}><label>Your name<input name="name" autoComplete="name" required placeholder="Name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>What’s on your mind?<textarea name="message" rows="4" required placeholder="Tell us a little something..." /></label><button className="button button-dark" type="submit">Send an enquiry <span aria-hidden="true">↗</span></button><p className="form-note" aria-live="polite">{formNotice || 'Preview form only. It does not send or store your message yet.'}</p></form></section>
      </main>

      <footer className="site-footer"><a className="footer-brand" href="#home">KASI<span>FROST</span> <span className="brand-icon" aria-hidden="true">✳</span></a><p>Beat the Heat. Taste the Frost.</p><div><a href="#menu">Menu</a><a href="#grown-up">18+ concepts</a><a href="#contact">Contact</a></div><small><a href={`mailto:${businessInfo.email}`}>{businessInfo.email}</a> · © {new Date().getFullYear()} Kasi Frost. Sample prices must be confirmed before launch.</small></footer>

      {cartOpen && <CartDrawer cart={cart} onClose={() => setCartOpen(false)} onChangeQuantity={changeQuantity} onRemove={(key) => setCart((current) => { const next = { ...current }; delete next[key]; return next; })} />}
      {adultGateOpen && <div className="gate-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setAdultGateOpen(false); }}><section className="age-dialog" role="dialog" aria-modal="true" aria-labelledby="age-title"><button className="icon-button age-close" onClick={() => setAdultGateOpen(false)} aria-label="Close adults-only section">×</button>{!adultConfirmed ? <><p className="eyebrow"><span className="age-chip">18+</span> ADULTS ONLY</p><h2 id="age-title">Before you step in.</h2><p>This section is intended for adults aged 18 and older. Confirming here is only a self-declaration; it does not verify your age or identity and does not make alcohol sales compliant.</p><label className="age-check"><input type="checkbox" checked={ageCheckbox} onChange={(event) => setAgeCheckbox(event.target.checked)} /><span>I am 18 or older and understand this is a concept menu.</span></label><button className="button button-dark" disabled={!ageCheckbox} onClick={() => setAdultConfirmed(true)}>Continue to concepts <span aria-hidden="true">↗</span></button><p className="gate-legal">No alcoholic products are currently available to order. Appropriate licensing, legal review, and age/identity verification are required before any sale.</p></> : <><p className="eyebrow"><span className="age-chip">18+</span> PROPOSED FLAVOUR IDEAS</p><h2 id="age-title">The concept list.</h2><div className="concept-list">{adultConcepts.map((item) => <div className="concept-row" key={item.id}><span className="concept-swatch" style={{ '--drink': item.color }} /><span><strong>{item.name}</strong><small>{item.note}</small></span><em>Coming soon</em></div>)}</div><p className="gate-legal">Concepts only. They do not confirm ingredients, availability, or a brand partnership. No ordering is available.</p><button className="text-button" onClick={() => setAdultGateOpen(false)}>Close section <span aria-hidden="true">×</span></button></>}</section></div>}
    </>
  );
}

export default App;
