import { useTranslation } from 'react-i18next';
import useStore from '../store/useStore';
import { Truck, Tag, ShieldCheck, Heart, Sparkles, Clock3, ShoppingBag } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  const { t } = useTranslation();
  const { user } = useStore();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">{t('hero_badge')}</div>
          <h1 className="hero-title">{t('app_title')}</h1>
          <p className="hero-subtitle">{t('hero_subtitle')}</p>
          <div className="hero-actions">
            <a href="/menu" className="btn-primary btn-hero">{t('explore_menu')}</a>
            {!user && (
              <a href="/register" className="btn-secondary btn-hero-secondary">{t('register')}</a>
            )}
          </div>

          
        </div>
      </section>

      <section className="featured-dishes">
        <div className="featured-header">
          <span className="section-tag">{t('popular_now')}</span>
          <h2>{t('popular_dishes_title')}</h2>
          <p>{t('popular_dishes_desc')}</p>
        </div>
        <div className="dish-grid">
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
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="premium-features">
        <div className="premium-features-header">
          <span className="section-tag">{t('more_features_badge')}</span>
          <h2>{t('more_features')}</h2>
          <p>{t('more_features_desc')}</p>
        </div>
        <div className="premium-features-grid">
          <article className="premium-feature-card">
            <div className="premium-feature-icon"><Truck size={24} /></div>
            <h3>{t('live_tracking')}</h3>
            <p>{t('live_tracking_desc')}</p>
          </article>
          <article className="premium-feature-card">
            <div className="premium-feature-icon"><Clock3 size={24} /></div>
            <h3>{t('fresh_preparation')}</h3>
            <p>{t('fresh_preparation_desc')}</p>
          </article>
          <article className="premium-feature-card">
            <div className="premium-feature-icon"><ShoppingBag size={24} /></div>
            <h3>{t('easy_reorders')}</h3>
            <p>{t('easy_reorders_desc')}</p>
          </article>
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

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>{t('how_it_works')}</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>{t('step_browse')}</h3>
            <p>{t('step_browse_desc')}</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>{t('step_select')}</h3>
            <p>{t('step_select_desc')}</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>{t('step_checkout')}</h3>
            <p>{t('step_checkout_desc')}</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>{t('step_enjoy')}</h3>
            <p>{t('step_enjoy_desc')}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <h4>{t('satisfied_customers')}</h4>
          <p>50K+</p>
        </div>
        <div className="stat-item">
          <h4>{t('delivery_cities')}</h4>
          <p>25+</p>
        </div>
        <div className="stat-item">
          <h4>{t('avg_delivery_time')}</h4>
          <p>25 min</p>
        </div>
        <div className="stat-item">
          <h4>{t('restaurant_partners')}</h4>
          <p>100+</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>{t('ready_to_order')}</h2>
        <p>{t('ready_to_order_desc')}</p>
        <a href="/menu" className="btn-primary btn-cta">{t('start_ordering')}</a>
      </section>
    </div>
  );
}
