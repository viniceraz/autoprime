import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShieldCheck, FileCheck2, CreditCard, Truck } from 'lucide-react';
import { api } from '../lib/api.js';
import CarCard from '../components/CarCard.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Home() {
  const [destaques, setDestaques] = useState([]);
  const [search, setSearch] = useState({ marca: 'Todas', modelo: '', ano: 'Todos', precoMax: '' });
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    api.getDestaques().then(setDestaques).catch(() => setDestaques([]));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.marca && search.marca !== 'Todas') params.set('marca', search.marca);
    if (search.modelo) params.set('modelo', search.modelo);
    if (search.ano && search.ano !== 'Todos') params.set('ano', search.ano);
    if (search.precoMax) params.set('precoMax', search.precoMax);
    navigate(`/estoque?${params.toString()}`);
  };

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section
        className="relative min-h-[600px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.4) 60%, rgba(15,23,42,0.1) 100%), url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600)',
        }}
      >
        <div className="max-w-7xl mx-auto w-full px-6 py-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] mb-6">
              {t('hero_title_1')}<br />{t('hero_title_2')}
            </h1>
            <p className="text-lg text-slate-200 mb-10 leading-relaxed max-w-lg">
              {t('hero_sub_1')}<br />{t('hero_sub_2')}
            </p>

            {/* Search card */}
            <form onSubmit={handleSearch} className="bg-white rounded-2xl p-6 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <SearchField label={t('search_brand')}>
                  <select value={search.marca} onChange={(e) => setSearch({ ...search, marca: e.target.value })} className={inputCls}>
                    <option value="Todas">{t('search_all_brands')}</option>
                    <option>BMW</option><option>Mercedes-Benz</option><option>Audi</option>
                    <option>Volkswagen</option><option>Jeep</option><option>Toyota</option>
                  </select>
                </SearchField>
                <SearchField label={t('search_model')}>
                  <input placeholder={t('search_model_ph')} value={search.modelo}
                    onChange={(e) => setSearch({ ...search, modelo: e.target.value })} className={inputCls} />
                </SearchField>
                <SearchField label={t('search_year')}>
                  <select value={search.ano} onChange={(e) => setSearch({ ...search, ano: e.target.value })} className={inputCls}>
                    <option value="Todos">{t('search_all_years')}</option>
                    {[2025,2024,2023,2022,2021,2020].map((a) => <option key={a}>{a}</option>)}
                  </select>
                </SearchField>
                <SearchField label={t('search_price_max')}>
                  <select value={search.precoMax} onChange={(e) => setSearch({ ...search, precoMax: e.target.value })} className={inputCls}>
                    <option value="">{t('search_any_price')}</option>
                    <option value="100000">{t('search_up_to_100')}</option>
                    <option value="200000">{t('search_up_to_200')}</option>
                    <option value="300000">{t('search_up_to_300')}</option>
                    <option value="500000">{t('search_up_to_500')}</option>
                  </select>
                </SearchField>
              </div>
              <button type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                <Search className="w-5 h-5" /> {t('search_btn')}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ===================== POR QUE ESCOLHER ===================== */}
      <section className="py-20 px-6 bg-bgsoft">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-3">{t('why_title')}</h2>
          <p className="text-ink-600">{t('why_sub')}</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Feature icon={ShieldCheck} title={t('feat_warranty')}      text={t('feat_warranty_desc')} />
          <Feature icon={FileCheck2}  title={t('feat_origin')}        text={t('feat_origin_desc')} />
          <Feature icon={CreditCard}  title={t('feat_finance')}       text={t('feat_finance_desc')} />
          <Feature icon={Truck}       title={t('feat_delivery')}      text={t('feat_delivery_desc')} />
        </div>
      </section>

      {/* ===================== CARROS EM DESTAQUE ===================== */}
      <section className="py-20 px-6 bg-bgsoft">
        <div className="max-w-7xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-ink-900 mb-3">{t('featured_title')}</h2>
          <p className="text-ink-600">{t('featured_sub')}</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destaques.length === 0 && (
            <p className="col-span-full text-center text-ink-400">{t('featured_empty')}</p>
          )}
          {destaques.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
        <div className="text-center mt-10">
          <Link to="/estoque" className="inline-block text-primary-600 font-semibold hover:underline">
            {t('see_all_cars')}
          </Link>
        </div>
      </section>
    </>
  );
}

const inputCls =
  'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white text-ink-800 focus:outline-none focus:ring-2 focus:ring-primary-500';

function SearchField({ label, children }) {
  return (
    <div>
      <label className="text-xs font-semibold text-ink-800 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Feature({ icon: Icon, title, text }) {
  return (
    <div className="bg-white rounded-2xl p-8 text-center shadow-card">
      <div className="w-14 h-14 rounded-full bg-primary-100 grid place-items-center mx-auto mb-4">
        <Icon className="w-7 h-7 text-primary-600" />
      </div>
      <h3 className="font-bold text-ink-900 mb-2">{title}</h3>
      <p className="text-sm text-ink-600 leading-relaxed">{text}</p>
    </div>
  );
}
