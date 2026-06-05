import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Settings, ArrowLeft, Phone } from 'lucide-react';
import { api } from '../lib/api.js';
import { formatPrice, formatKm, BADGE_STYLES } from '../lib/format.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [error, setError] = useState(null);
  const { t } = useLanguage();

  useEffect(() => {
    api.getCar(id).then(setCar).catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-6 text-center">
        <p className="text-red-600 mb-4">{t('detail_not_found')}</p>
        <Link to="/estoque" className="text-primary-600 hover:underline">← {t('detail_back')}</Link>
      </div>
    );
  }

  if (!car) {
    return <div className="max-w-3xl mx-auto py-20 px-6 text-center text-ink-600">{t('detail_loading')}</div>;
  }

  const badgeClass = BADGE_STYLES[car.badge] || 'bg-primary-600 text-white';

  return (
    <section className="bg-bgsoft py-12 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <Link to="/estoque" className="inline-flex items-center gap-2 text-ink-600 hover:text-primary-600 mb-6">
          <ArrowLeft className="w-4 h-4" /> {t('detail_back')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white rounded-2xl shadow-card p-8">
          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-200">
            {car.imagem_url && (
              <img src={car.imagem_url} alt={`${car.marca} ${car.modelo}`} className="w-full h-full object-cover" />
            )}
            {car.badge && (
              <span className={`absolute top-4 right-4 ${badgeClass} text-xs font-semibold px-3 py-1 rounded-full`}>
                {car.badge}
              </span>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-ink-900 mb-2">{car.marca} {car.modelo}</h1>
            <p className="text-primary-600 text-3xl font-bold mb-6">{formatPrice(car.preco)}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Info icon={Calendar} label={t('detail_year')}         value={car.ano} />
              <Info icon={Gauge}    label={t('detail_km')}           value={formatKm(car.km)} />
              <Info icon={Fuel}     label={t('detail_fuel')}         value={car.combustivel} />
              <Info icon={Settings} label={t('detail_transmission')} value={car.cambio} />
            </div>

            {car.descricao && (
              <>
                <h3 className="font-semibold text-ink-900 mb-2">{t('detail_description')}</h3>
                <p className="text-ink-600 leading-relaxed mb-6">{car.descricao}</p>
              </>
            )}

            <a href="https://wa.me/5511987654321" target="_blank" rel="noreferrer"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
              <Phone className="w-5 h-5" /> {t('detail_cta')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-bgsoft rounded-xl p-3">
      <span className="w-10 h-10 grid place-items-center rounded-lg bg-primary-100">
        <Icon className="w-5 h-5 text-primary-600" />
      </span>
      <div>
        <p className="text-xs text-ink-600">{label}</p>
        <p className="text-sm font-semibold text-ink-900">{value}</p>
      </div>
    </div>
  );
}
