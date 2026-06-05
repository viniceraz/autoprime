import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api.js';
import CarCard from '../components/CarCard.jsx';
import FiltersSidebar from '../components/FiltersSidebar.jsx';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Estoque() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const { t } = useLanguage();

  const fetchCars = (filters) => {
    setLoading(true);
    api.listCars(filters).then((data) => {
      setCars(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    const initial = {};
    searchParams.forEach((v, k) => { initial[k] = v; });
    fetchCars(initial);
  }, [searchParams]);

  return (
    <section className="bg-bgsoft py-16 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-3">{t('stock_title')}</h1>
          <p className="text-ink-600">{t('stock_sub')}</p>
        </header>

        <div className="flex flex-col md:flex-row gap-6">
          <FiltersSidebar onApply={fetchCars} />

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-card" />
                ))}
              </div>
            ) : cars.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-card p-12 text-center text-ink-600">
                {t('stock_empty')}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => <CarCard key={car.id} car={car} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
