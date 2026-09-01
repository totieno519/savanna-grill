"use client";

import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";

const WHATSAPP_NUMBER = "254716680579";

type MenuCategory =
  | "All"
  | "Starters"
  | "Grills"
  | "Main Courses"
  | "Sides"
  | "Desserts"
  | "Drinks";

type MenuItem = {
  name: string;
  category: Exclude<MenuCategory, "All">;
  description: string;
  price: string;
  image: string;
};

const menuItems: MenuItem[] = [
  {
    name: "Chicken Wings",
    category: "Starters",
    description: "Char-grilled wings with your choice of spicy or smoky house glaze.",
    price: "KSh 750",
    image: "/images/chicken-wings.jpg",
  },
  {
    name: "Samosas",
    category: "Starters",
    description: "Crispy golden samosas filled with seasoned beef or chicken and served with chutney.",
    price: "KSh 550",
    image: "/images/chicken-wings.jpg",
  },
  {
    name: "Beef Skewers",
    category: "Starters",
    description: "Tender beef skewers grilled over open flame with fresh tomato relish.",
    price: "KSh 800",
    image: "/images/nyama-choma.jpg",
  },
  {
    name: "Nyama Choma",
    category: "Grills",
    description: "Slow-grilled tender meat served with kachumbari and our signature house sauce.",
    price: "KSh 1,450",
    image: "/images/nyama-choma.jpg",
  },
  {
    name: "Savanna Steak",
    category: "Grills",
    description: "Prime-cut beef grilled to your preference with roasted vegetables and herb butter.",
    price: "KSh 1,850",
    image: "/images/nyama-choma.jpg",
  },
  {
    name: "Grilled Tilapia",
    category: "Grills",
    description: "Fresh whole tilapia grilled over open flame and finished with bright citrus relish.",
    price: "KSh 1,250",
    image: "/images/nyama-choma.jpg",
  },
  {
    name: "Beef Pilau",
    category: "Main Courses",
    description: "Aromatic East African rice cooked with tender spiced beef.",
    price: "KSh 900",
    image: "/images/beef-pilau.jpg",
  },
  {
    name: "Chicken Curry",
    category: "Main Courses",
    description: "Slow-cooked chicken in a rich coconut and spice sauce.",
    price: "KSh 950",
    image: "/images/beef-pilau.jpg",
  },
  {
    name: "Classic Beef Burger",
    category: "Main Courses",
    description: "House beef patty, caramelized onions and signature sauce.",
    price: "KSh 850",
    image: "/images/nyama-choma.jpg",
  },
  {
    name: "Ugali & Sukuma",
    category: "Sides",
    description: "A Kenyan classic served with seasonal greens and house gravy.",
    price: "KSh 550",
    image: "/images/ugali-sukuma.jpg",
  },
  {
    name: "Seasoned Fries",
    category: "Sides",
    description: "Crispy golden fries finished with our house seasoning.",
    price: "KSh 350",
    image: "/images/ugali-sukuma.jpg",
  },
  {
    name: "Chocolate Lava Cake",
    category: "Desserts",
    description: "Warm chocolate cake with a rich molten centre and vanilla ice cream.",
    price: "KSh 650",
    image: "/images/chocolate-lava-cake.jpg",
  },
  {
    name: "Fresh Fruit Plate",
    category: "Desserts",
    description: "A refreshing selection of seasonal fresh fruit.",
    price: "KSh 450",
    image: "/images/fresh-juice.jpg",
  },
  {
    name: "Mango Passion Juice",
    category: "Drinks",
    description: "Freshly blended tropical mango and passion fruit juice.",
    price: "KSh 350",
    image: "/images/fresh-juice.jpg",
  },
  {
    name: "Fresh Orange Juice",
    category: "Drinks",
    description: "Freshly squeezed orange juice served chilled.",
    price: "KSh 300",
    image: "/images/fresh-juice.jpg",
  },
];

const categories: MenuCategory[] = [
  "All",
  "Starters",
  "Grills",
  "Main Courses",
  "Sides",
  "Desserts",
  "Drinks",
];

const experiences = [
  {
    icon: "✦",
    title: "Authentic Flavours",
    description: "Traditional African inspiration meets modern culinary technique.",
  },
  {
    icon: "◉",
    title: "Fresh Ingredients",
    description: "Carefully selected ingredients prepared fresh for every service.",
  },
  {
    icon: "⌂",
    title: "Warm Hospitality",
    description: "A relaxed environment designed for family, friends and good conversation.",
  },
  {
    icon: "◆",
    title: "Memorable Moments",
    description: "Perfect for dinners, celebrations, meetings and special occasions.",
  },
];

const testimonials = [
  {
    quote: "The food was excellent and the atmosphere felt warm and welcoming. The nyama choma was the highlight of our evening.",
    name: "Brian M.",
    role: "Dinner Guest",
  },
  {
    quote: "A beautiful place for family dinner. The service was friendly, the portions were generous and everything arrived fresh.",
    name: "Mercy W.",
    role: "Family Guest",
  },
  {
    quote: "Savanna Grill has the kind of atmosphere where you can relax, eat well and actually enjoy the conversation.",
    name: "Daniel K.",
    role: "Weekend Guest",
  },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const [menuSearch, setMenuSearch] = useState("");
  const [reservationStatus, setReservationStatus] = useState("");
  const [reservationUrl, setReservationUrl] = useState("");

  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch =
        activeCategory === "All" || item.category === activeCategory;

      const searchMatch =
        item.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
        item.description.toLowerCase().includes(menuSearch.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, menuSearch]);

  const whatsappUrl = (message: string) =>
    `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
      message
    )}`;

  const orderMessage = (item: MenuItem) =>
    `Hello Savanna Grill, I would like to order/ask about ${item.name} (${item.price}).`;

  const handleReservation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const date = String(form.get("date") || "").trim();
    const time = String(form.get("time") || "").trim();
    const guests = String(form.get("guests") || "").trim();
    const request = String(form.get("request") || "").trim();

    const message = [
      "Hello Savanna Grill, I would like to make a reservation.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Date: ${date}`,
      `Preferred Time: ${time}`,
      `Number of Guests: ${guests}`,
      request ? `Special Request: ${request}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    setReservationUrl(whatsappUrl(message));
    setReservationStatus("Your reservation message is ready. Click the button below to open WhatsApp.");
  };

  return (
    <main className="savanna-texture">
      <header className="site-nav">
        <div className="site-container nav-inner">
          <a href="#home" className="brand" aria-label="Savanna Grill home">
            <Image
              src="/images/logo-dark.png"
              alt="Savanna Grill"
              width={145}
              height={113}
              className="brand-logo"
              priority
            />
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            <a href="#home">Home</a>
            <a href="#about">Our Story</a>
            <a href="#menu">Menu</a>
            <a href="#gallery">Gallery</a>
            <a href="#testimonials">Reviews</a>
            <a href="#reservation">Reservations</a>
            <a href="#contact">Contact</a>
          </nav>

          <a
            href="#reservation"
            className="nav-cta"
            aria-label="Reserve a table"
          >
            Reserve a Table →
          </a>

          <details className="mobile-menu">
            <summary aria-label="Open navigation menu">☰</summary>
            <div className="mobile-menu-content">
              <a href="#home">Home</a>
              <a href="#about">Our Story</a>
              <a href="#menu">Menu</a>
              <a href="#gallery">Gallery</a>
              <a href="#testimonials">Reviews</a>
              <a href="#reservation">Reservations</a>
              <a href="#contact">Contact</a>
            </div>
          </details>
        </div>
      </header>

      <section id="home" className="hero">
        <div className="site-container hero-content">
          <div className="hero-grid">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                Authentic African Dining
              </div>

              <h1>
                Taste the
                <br />
                <span>Spirit</span> of Africa.
              </h1>

              <p className="hero-description">
                Discover bold African flavours, beautifully prepared and served
                with genuine Kenyan hospitality. From the grill to your table,
                every plate tells a story.
              </p>

              <div className="hero-actions">
                <a href="#menu" className="primary-button">
                  Explore Our Menu →
                </a>
                <a href="#reservation" className="secondary-button">
                  Reserve a Table
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <Image
                src="/images/hero-grill.jpg"
                alt="Savanna Grill signature grilled food"
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className="hero-image"
              />
              <div className="hero-image-overlay" />
              <div className="hero-card">
                <small>Chef&apos;s Choice</small>
                <strong>Nyama Choma</strong>
                <p>Fire-grilled, tender and served with signature accompaniments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section section-dark">
        <div className="site-container">
          <div className="about-grid">
            <div className="about-visual gold-glow">
              <Image
                src="/images/restaurant-interior.jpg"
                alt="Savanna Grill dining room"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="section-image"
              />
              <div className="about-visual-overlay" />
              <div className="about-visual-content">
                <div className="about-number">01</div>
                <div className="about-number-label">One table. Many stories.</div>
              </div>
            </div>

            <div className="about-copy">
              <div className="section-label">Our Story</div>
              <h2 className="section-title">
                Rooted in tradition.
                <br />
                Made for today.
              </h2>
              <p>
                Savanna Grill is inspired by the warmth, generosity and bold
                flavours of African food culture. Our kitchen brings together
                familiar Kenyan favourites and contemporary grill-house
                techniques to create food that feels both authentic and exciting.
              </p>
              <p>
                Whether you are joining us for lunch, a family dinner, a business
                meeting or a celebration, our goal is simple: excellent food,
                warm service and an experience worth remembering.
              </p>
              <div className="about-signature">Welcome to our table.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="site-container">
          <div className="section-heading">
            <div className="section-label">From the Grill</div>
            <h2 className="section-title">
              Our signature
              <br />
              dishes.
            </h2>
            <p className="section-description">
              A selection of customer favourites prepared with bold seasoning,
              fresh ingredients and plenty of fire.
            </p>
          </div>

          <div className="dishes-grid">
            {menuItems
              .filter((item) => item.category === "Grills")
              .map((dish) => (
                <article key={dish.name} className="dish-card">
                  <div className="dish-image">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 900px) 100vw, 33vw"
                      className="card-image"
                    />
                  </div>
                  <div className="dish-content">
                    <div className="dish-content-top">
                      <h3 className="dish-name">{dish.name}</h3>
                      <span className="dish-price">{dish.price}</span>
                    </div>
                    <p className="dish-description">{dish.description}</p>
                    <a
                      className="card-order-button"
                      href={whatsappUrl(orderMessage(dish))}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ask / Order →
                    </a>
                  </div>
                </article>
              ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section section-dark">
        <div className="site-container">
          <div className="section-heading center">
            <div className="section-label">The Savanna Experience</div>
            <h2 className="section-title">
              More than
              <br />
              just a meal.
            </h2>
            <p className="section-description">
              We believe great dining is about the food, the people and the
              moments created around the table.
            </p>
          </div>

          <div className="experience-grid">
            {experiences.map((experience) => (
              <article key={experience.title} className="experience-card">
                <div className="experience-icon" aria-hidden="true">
                  {experience.icon}
                </div>
                <h3>{experience.title}</h3>
                <p>{experience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="section">
        <div className="site-container">
          <div className="section-heading">
            <div className="section-label">Explore the Menu</div>
            <h2 className="section-title">
              Good food.
              <br />
              No shortcuts.
            </h2>
            <p className="section-description">
              Browse the menu by category, search for a dish and contact us
              directly on WhatsApp when you are ready to order.
            </p>
          </div>

          <div className="menu-controls">
            <div className="category-tabs" aria-label="Menu categories">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="menu-search">
              <span className="sr-only">Search menu</span>
              <input
                type="search"
                value={menuSearch}
                onChange={(event) => setMenuSearch(event.target.value)}
                placeholder="Search dishes..."
              />
            </label>
          </div>

          <div className="full-menu-grid">
            {filteredMenu.map((item) => (
              <article key={item.name} className="menu-card">
                <div className="menu-card-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className="card-image"
                  />
                  <span className="menu-badge">{item.category}</span>
                </div>

                <div className="menu-card-body">
                  <div className="menu-card-title-row">
                    <h3>{item.name}</h3>
                    <span>{item.price}</span>
                  </div>
                  <p>{item.description}</p>
                  <a
                    className="menu-order-button"
                    href={whatsappUrl(orderMessage(item))}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ask / Order on WhatsApp →
                  </a>
                </div>
              </article>
            ))}
          </div>

          {filteredMenu.length === 0 && (
            <div className="empty-menu">
              No dishes found. Try another search or choose a different category.
            </div>
          )}
        </div>
      </section>

      <section id="gallery" className="section section-dark">
        <div className="site-container">
          <div className="section-heading">
            <div className="section-label">Gallery</div>
            <h2 className="section-title">
              See the
              <br />
              experience.
            </h2>
            <p className="section-description">
              From the warmth of our dining room to the fire of the grill, every
              detail is designed to make your visit memorable.
            </p>
          </div>

          <div className="gallery-grid">
            <figure className="gallery-item gallery-large">
              <Image
                src="/images/restaurant-interior.jpg"
                alt="Savanna Grill dining room"
                fill
                sizes="(max-width: 800px) 100vw, 50vw"
                className="gallery-image"
              />
              <figcaption>Our dining room</figcaption>
            </figure>

            <figure className="gallery-item">
              <Image
                src="/images/nyama-choma.jpg"
                alt="Nyama choma from the grill"
                fill
                sizes="(max-width: 800px) 50vw, 25vw"
                className="gallery-image"
              />
              <figcaption>From the fire</figcaption>
            </figure>

            <figure className="gallery-item">
              <Image
                src="/images/chicken-wings.jpg"
                alt="Chicken wings"
                fill
                sizes="(max-width: 800px) 50vw, 25vw"
                className="gallery-image"
              />
              <figcaption>Fresh from the kitchen</figcaption>
            </figure>

            <figure className="gallery-item">
              <Image
                src="/images/beef-pilau.jpg"
                alt="Beef pilau"
                fill
                sizes="(max-width: 800px) 50vw, 25vw"
                className="gallery-image"
              />
              <figcaption>African favourites</figcaption>
            </figure>

            <figure className="gallery-item">
              <Image
                src="/images/chocolate-lava-cake.jpg"
                alt="Chocolate lava cake"
                fill
                sizes="(max-width: 800px) 50vw, 25vw"
                className="gallery-image"
              />
              <figcaption>Sweet endings</figcaption>
            </figure>

            <figure className="gallery-item gallery-wide">
              <Image
                src="/images/restaurant-exterior.jpg"
                alt="Savanna Grill exterior"
                fill
                sizes="(max-width: 800px) 100vw, 66vw"
                className="gallery-image"
              />
              <figcaption>Welcome to Savanna Grill</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section">
        <div className="site-container">
          <div className="section-heading center">
            <div className="section-label">Guest Reviews</div>
            <h2 className="section-title">
              Loved around
              <br />
              the table.
            </h2>
            <p className="section-description">
              A few words from guests who enjoyed the Savanna Grill experience.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card">
                <div className="stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
                <blockquote>“{testimonial.quote}”</blockquote>
                <div className="testimonial-author">
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="reservation" className="section section-dark">
        <div className="site-container">
          <div className="reservation-layout">
            <div className="reservation-intro">
              <div className="section-label">Reservations</div>
              <h2 className="section-title">
                Planning a meal?
                <br />
                Let&apos;s save you a seat.
              </h2>
              <p>
                Complete the form and we&apos;ll open WhatsApp with your
                reservation details ready to send.
              </p>
              <div className="reservation-note">
                <strong>Quick &amp; direct</strong>
                <span>Your request goes straight to our WhatsApp.</span>
              </div>
            </div>

            <form className="reservation-form" onSubmit={handleReservation}>
              <div className="form-row">
                <label>
                  Full Name
                  <input name="name" type="text" required placeholder="Your name" />
                </label>
                <label>
                  Phone Number
                  <input
                    name="phone"
                    type="tel"
                    required
                    placeholder="+254 7XX XXX XXX"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Date
                  <input name="date" type="date" required />
                </label>
                <label>
                  Preferred Time
                  <input name="time" type="time" required />
                </label>
              </div>

              <label>
                Number of Guests
                <select name="guests" required defaultValue="2">
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                  <option value="5">5 Guests</option>
                  <option value="6">6 Guests</option>
                  <option value="7+">7+ Guests</option>
                </select>
              </label>

              <label>
                Special Request
                <textarea
                  name="request"
                  rows={4}
                  placeholder="Birthday, business meeting, seating preference..."
                />
              </label>

              <button
                type="submit"
                className="primary-button form-submit"
              >
                Prepare Reservation for WhatsApp →
              </button>

              {reservationStatus && (
                <div className="form-status" role="status">
                  <p>{reservationStatus}</p>
                  {reservationUrl && (
                    <a
                      className="whatsapp-direct-link"
                      href={reservationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open WhatsApp →
                    </a>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="site-container">
          <div className="contact-grid">
            <div>
              <div className="section-label">Visit Us</div>
              <h2 className="section-title">
                Come hungry.
                <br />
                Leave happy.
              </h2>

              <div className="contact-list">
                <div className="contact-item">
                  <small>Location</small>
                  <p>Nyahururu, Kenya</p>
                </div>

                <div className="contact-item">
                  <small>Opening Hours</small>
                  <p>
                    Monday – Sunday
                    <br />
                    10:00 AM – 10:00 PM
                  </p>
                </div>

                <div className="contact-item">
                  <small>Reservations</small>
                  <p>
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      +254 716 680 579
                    </a>
                  </p>
                </div>

                <div className="contact-item">
                  <small>Email</small>
                  <p>
                    <a href="mailto:hello@savannagrill.example">
                      hello@savannagrill.example
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-panel">
              <Image
                src="/images/restaurant-exterior.jpg"
                alt="Savanna Grill exterior"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                className="contact-panel-image"
              />
              <div className="contact-panel-overlay" />
              <div className="contact-panel-inner">
                <span>Find us</span>
                <h3>Nyahururu</h3>
                <p>
                  A warm table, a good meal and great company. We look forward
                  to welcoming you.
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Nyahururu%2C%20Kenya"
                  target="_blank"
                  rel="noreferrer"
                  className="primary-button"
                >
                  Open Location →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#home" className="brand" aria-label="Savanna Grill home">
                <Image
                  src="/images/logo-dark.png"
                  alt="Savanna Grill"
                  width={145}
                  height={113}
                  className="brand-logo"
                />
              </a>
              <p>
                Authentic African flavours, modern hospitality and memorable
                moments around the table.
              </p>
            </div>

            <nav className="footer-links" aria-label="Footer navigation">
              <a href="#about">Our Story</a>
              <a href="#menu">Menu</a>
              <a href="#gallery">Gallery</a>
              <a href="#testimonials">Reviews</a>
              <a href="#reservation">Reservations</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Savanna Grill. All rights reserved.</span>
            <span>Authentic flavours. Warm hospitality.</span>
          </div>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hello Savanna Grill, I would like to make a reservation."
        )}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Savanna Grill on WhatsApp"
      >
        <span>●</span> WhatsApp
      </a>
    </main>
  );
}
