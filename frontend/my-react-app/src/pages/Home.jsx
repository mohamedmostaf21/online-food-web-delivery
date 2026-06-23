import { useTranslation } from 'react-i18next';
import { Zap, DollarSign, Lock, ChefHat, MapPin, Clock, Star } from 'lucide-react';
import '../styles/Home.css';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">{t('app_title')}</h1>
          
          <p className="hero-subtitle">{t('hero_subtitle')}</p>
          <a href="/menu" className="btn-primary btn-hero">{t('explore_menu')}</a>
        </div>
        <div className="hero-background"></div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-header">
          <h2>🌟 {t('why_choose_us')}</h2>
          <p>{t('why_choose_us_desc')}</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={40} strokeWidth={1.5} />
            </div>
            <h3>⚡ {t('fast_delivery')}</h3>
            <p>{t('fast_delivery_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <DollarSign size={40} strokeWidth={1.5} />
            </div>
            <h3>💰 {t('great_prices')}</h3>
            <p>{t('great_prices_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Lock size={40} strokeWidth={1.5} />
            </div>
            <h3>🔒 {t('secure_payment')}</h3>
            <p>{t('secure_payment_desc')}</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <ChefHat size={40} strokeWidth={1.5} />
            </div>
            <h3>👨‍🍳 {t('quality_food')}</h3>
            <p>{t('quality_food_desc')}</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>🎯 {t('how_it_works')}</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>🔍 {t('step_browse')}</h3>
            <p>{t('step_browse_desc')}</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>🛒 {t('step_select')}</h3>
            <p>{t('step_select_desc')}</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>💳 {t('step_checkout')}</h3>
            <p>{t('step_checkout_desc')}</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>🎉 {t('step_enjoy')}</h3>
            <p>{t('step_enjoy_desc')}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <Star size={32} />
          <h4>{t('satisfied_customers')}</h4>
          <p>50K+</p>
        </div>
        <div className="stat-item">
          <MapPin size={32} />
          <h4>{t('delivery_cities')}</h4>
          <p>25+</p>
        </div>
        <div className="stat-item">
          <Clock size={32} />
          <h4>{t('avg_delivery_time')}</h4>
          <p>25 min</p>
        </div>
        <div className="stat-item">
          <ChefHat size={32} />
          <h4>{t('restaurant_partners')}</h4>
          <p>100+</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>🚀 {t('ready_to_order')}</h2>
        <p>{t('ready_to_order_desc')}</p>
        <a href="/menu" className="btn-primary btn-cta">🍕 {t('start_ordering')}</a>
      </section>
    </div>
  );
}
