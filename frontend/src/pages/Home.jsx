import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import useStore from '../store/useStore';
import { Truck, Tag, ShieldCheck, Heart, Sparkles, Clock3, ShoppingBag, Users, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import heroImage from '../assets/hero.png';
import '../styles/Home.css';
import ProductCard from '../components/ProductCard';
import { productsAPI } from '../api/api';

const promoImageUrl = 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80';

function HeroCarousel({ t, user }) {
  const { i18n } = useTranslation();
  const isRTL = i18n?.dir?.() === 'rtl';
  const defaultSlides = [
    { id: 1, img: 'https://images.unsplash.com/photo-1577906096429-f73c2c312435?auto=format&fit=crop&w=2600&q=80' },
    { id: 2, img: 'https://images.unsplash.com/photo-1612874740247-e8d25338c8f4?auto=format&fit=crop&w=2600&q=80' },
    { id: 3, img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2600&q=80' }
  ];

  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(defaultSlides);
  const intervalRef = useRef(null);

  useEffect(() => {
    productsAPI.getAll().then(res => {
      const items = (res.data || []).slice(0, 3);
      if (items.length > 0) {
        const heroSlides = items.map((p, idx) => ({
          id: idx + 1,
          img: p.image || defaultSlides[idx % defaultSlides.length].img
        }));
        setSlides(heroSlides);
      }
    }).catch(() => { /* keep defaults */ });
  }, []);

  useEffect(() => {
    function start() {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000);
    }
    start();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [slides]);

  const restartAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000);
  };

  function handlePrev() {
    setIndex((index - 1 + slides.length) % slides.length);
  }

  function handleNext() {
    setIndex((index + 1) % slides.length);
  }

  return (
    <section className="hero" onMouseEnter={() => intervalRef.current && clearInterval(intervalRef.current)} onMouseLeave={restartAutoSlide}>
      {slides.map((s, i) => (
        <div key={s.id} className={`hero-slide ${i === index ? 'active' : ''}`} style={{ backgroundImage: `url(${s.img})` }} aria-hidden={i !== index} />
      ))}

      <div className="hero-overlay">
        <div className="hero-content hero-grid">
          <div className="hero-copy">
            <div className="hero-badge">{t('hero_badge')}</div>
            <h1 className="hero-title">
              <span className="hero-title-first">{t('hero_title_part1')}</span>
            
              <span className="hero-title-second">{t('hero_title_part2')}</span>
            </h1>
            <p className="hero-subtitle">{t('hero_subtitle')}</p>
            <div className={`hero-actions ${i18n && i18n.dir && i18n.dir() === 'rtl' ? 'align-right' : 'align-left'}`}>
              <Link to="/menu" className="btn-primary btn-hero">{t('explore_menu')}</Link>
              {!user && <Link to="/register" className="btn-secondary btn-hero-secondary">{t('register')}</Link>}
            </div>
          </div>
        </div>
      </div>

      <button className="hero-arrow left" onClick={handlePrev} aria-label={t('hero_previous_slide')}>‹</button>
      <button className="hero-arrow right" onClick={handleNext} aria-label={t('hero_next_slide')}>›</button>

      <div className="hero-dots">
        {slides.map((_, i) => (
          <button key={i} className={`dot ${i === index ? 'active' : ''}`} onClick={() => setIndex(i)} aria-label={t('hero_slide_dot', { index: i + 1 })}></button>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const { user } = useStore();
  const navigate = useNavigate();

  const [featured, setFeatured] = useState([]);
  const [countdown, setCountdown] = useState({ seconds: 0, minutes: 0, hours: 0, days: 0 });
  const [statsCount, setStatsCount] = useState({ customers: 0, cities: 0, avgDelivery: 0, partners: 0 });
  const [statsVisible, setStatsVisible] = useState(false);
  const countdownTarget = useRef(null);
  const statsRef = useRef(null);
  const statsItems = [
    { key: 'customers', label: t('satisfied_customers'), icon: Users, value: 50, suffix: 'K+' },
    { key: 'cities', label: t('delivery_cities'), icon: MapPin, value: 25, suffix: '+' },
    { key: 'avgDelivery', label: t('avg_delivery_time'), icon: Clock3, value: 25, suffix: ' min' },
    { key: 'partners', label: t('restaurant_partners'), icon: ShoppingBag, value: 100, suffix: '+' }
  ];

  useEffect(() => {
    if (!countdownTarget.current) {
      const target = new Date();
      target.setHours(target.getHours() + 23);
      target.setMinutes(target.getMinutes() + 59);
      target.setSeconds(target.getSeconds() + 21);
      countdownTarget.current = target;
    }

    const updateCountdown = () => {
      const now = new Date();
      const diff = Math.max(countdownTarget.current.getTime() - now.getTime(), 0);
      const seconds = Math.floor((diff / 1000) % 60);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setCountdown({ seconds, minutes, hours, days });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!statsRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !statsVisible) {
        setStatsVisible(true);
      }
    }, { threshold: 0.3 });

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [statsVisible]);

  useEffect(() => {
    if (!statsVisible) return;

    const duration = 4000;
    const start = performance.now();

    const animate = now => {
      const progress = Math.min((now - start) / duration, 1);
      setStatsCount({
        customers: Math.round(50 * progress),
        cities: Math.round(25 * progress),
        avgDelivery: Math.round(25 * progress),
        partners: Math.round(100 * progress)
      });
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [statsVisible]);

  useEffect(() => {
    productsAPI.getAll().then(res => {
      const items = res.data || [];
      setFeatured(items.slice(0, 8));
    }).catch(() => { /* ignore, keep defaults */ });
  }, []);

  return (
    <div className="home-container">
      {/* Hero Carousel */}
      <HeroCarousel t={t} user={user} />

      <section className="featured-dishes">
        <div className="featured-header">
          <span className="section-tag">{t('popular_now')}</span>
          <h2>{t('popular_dishes_title')}</h2>
          <p>{t('popular_dishes_desc')}</p>
        </div>
        <div className="dish-grid">
          {featured.length > 0 ? (
            featured.slice(0,4).map(p => (
              <ProductCard key={p._id || p.id || p.name} product={p} />
            ))
          ) : (
            <>
              <article className="dish-card">
                <div className="dish-card-icon" aria-hidden="true">🍲</div>
                <h3>{t('dish_spicy_chicken_bowl')}</h3>
                <p>{t('dish_spicy_chicken_bowl_desc')}</p>
              </article>
              <article className="dish-card">
                <div className="dish-card-icon" aria-hidden="true">🥗</div>
                <h3>{t('dish_signature_veggie_feast')}</h3>
                <p>{t('dish_signature_veggie_feast_desc')}</p>
              </article>
              <article className="dish-card">
                <div className="dish-card-icon" aria-hidden="true">🍔</div>
                <h3>{t('dish_classic_burger_combo')}</h3>
                <p>{t('dish_classic_burger_combo_desc')}</p>
              </article>
            </>
          )}
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="premium-features">
        <div className="premium-features-inner">
          <div className="premium-feature-visual">
            <div className="premium-feature-image" style={{ backgroundImage: `url(${heroImage})` }} />
          </div>
          <div className="premium-feature-details">
            <span className="section-tag">{t('more_features_badge')}</span>
            <h2 className="premium-section-title">{t('epicurean_elegance')}</h2>
            <p className="premium-section-subtitle">{t('epicurean_subtitle')}</p>
            <div className="premium-quote">{t('epicurean_quote')}</div>
            <div className="premium-features-grid">
              <article className="premium-feature-card">
                <div className="premium-feature-icon premium-icon-bright"><Sparkles size={24} /></div>
                <h3>{t('instant_ordering')}</h3>
                <p>{t('instant_ordering_desc')}</p>
              </article>
              <article className="premium-feature-card">
                <div className="premium-feature-icon premium-icon-pink"><Clock3 size={24} /></div>
                <h3>{t('always_open')}</h3>
                <p>{t('always_open_desc')}</p>
              </article>
              <article className="premium-feature-card">
                <div className="premium-feature-icon premium-icon-teal"><ShieldCheck size={24} /></div>
                <h3>{t('exclusive_booking')}</h3>
                <p>{t('exclusive_booking_desc')}</p>
              </article>
              <article className="premium-feature-card">
                <div className="premium-feature-icon premium-icon-purple"><Heart size={24} /></div>
                <h3>{t('signature_dishes')}</h3>
                <p>{t('signature_dishes_desc')}</p>
              </article>
            </div>
            <div className="premium-features-footer">
              <Link to="/opinion" className="btn-view-menu btn-primary">{t('discover_our_opinions')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>{t('why_choose_us')}</h2>
          <p>{t('why_choose_us_desc')}</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Truck size={28} /></div>
            <h3>{t('fast_delivery')}</h3>
            <p>{t('fast_delivery_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Tag size={28} /></div>
            <h3>{t('great_prices')}</h3>
            <p>{t('great_prices_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><ShieldCheck size={28} /></div>
            <h3>{t('secure_payment')}</h3>
            <p>{t('secure_payment_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Heart size={28} /></div>
            <h3>{t('quality_food')}</h3>
            <p>{t('quality_food_desc')}</p>
          </div>
        </div>
      </section>

      <section id="limited-offer" className="limited-offer-section">
        <div className="limited-offer-card">
          <div className="offer-banner">
            <img
              src={promoImageUrl}
              alt={t('special_burger_deal_title')}
            />
            <div className="offer-content">
              <span className="discount">{t('off_50')}</span>
              <h2>{t('special_burger_deal_title')}</h2>
              <button type="button" className="btn-primary" onClick={() => navigate('/deal')}>{t('order_now')}</button>
            </div>
          </div>
          <div className="limited-offer-copy">
            <div className="limited-offer-label">{t('limited_time_offer')}</div>
            <h2>{t('order_favorite_now')}</h2>
            <p>{t('order_favorite_now_desc')}</p>
            <div className="countdown-grid">
              <div className="countdown-item">
                <span>{String(countdown.seconds).padStart(2, '0')}</span>
                <small>{t('seconds')}</small>
              </div>
              <div className="countdown-item">
                <span>{String(countdown.minutes).padStart(2, '0')}</span>
                <small>{t('minutes')}</small>
              </div>
              <div className="countdown-item">
                <span>{String(countdown.hours).padStart(2, '0')}</span>
                <small>{t('hours')}</small>
              </div>
              <div className="countdown-item">
                <span>{String(countdown.days).padStart(2, '0')}</span>
                <small>{t('days')}</small>
              </div>
            </div>
            <div className="limited-offer-actions">
              <button type="button" className="btn-primary btn-view-menu" onClick={() => navigate('/menu')}>{t('order_now')}</button>
              <button type="button" className="btn-offer-secondary" onClick={() => navigate('/offers#offers-end')}>{t('view_offers')}</button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats" ref={statsRef}>
        {statsItems.map(item => {
          const Icon = item.icon;
          const value = statsCount[item.key];
          return (
            <div key={item.key} className="stat-item">
              <Icon size={34} />
              <h4>{item.label}</h4>
              <p>{value}{item.suffix}</p>
            </div>
          );
        })}
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>{t('ready_to_order')}</h2>
        <p>{t('ready_to_order_desc')}</p>
        <button type="button" className="btn-primary btn-cta" onClick={() => navigate('/menu')}>{t('start_ordering')}</button>
      </section>
    </div>
  );
}

