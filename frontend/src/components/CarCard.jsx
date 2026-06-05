import { Link } from 'react-router-dom';
import { Calendar, Gauge, Fuel, Settings } from 'lucide-react';
import { formatPrice, formatKm, BADGE_STYLES } from '../lib/format.js';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function CarCard({ car }) {
  const { t } = useLanguage();
  const badgeClass = BADGE_STYLES[car.badge] || 'bg-primary-600 text-white';

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-card flex flex-col">
      <div className="relative aspect-[16/10] bg-slate-200 overflow-hidden">
        {car.imagem_url ? (
          <img src={car.imagem_url} alt={`${car.marca} ${car.modelo}`} className="w-full h-full object-cover" loading="lazy" />
        ) : (
          <div className="w-full h-full grid place-items-center text-slate-400 text-sm">{t('card_no_image')}</div>
        )}
        {car.badge && (
          <span className={`absolute top-3 right-3 ${badgeClass} text-xs font-semibold px-3 py-1 rounded-full shadow`}>
            {car.badge}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <h3 className="font-bold text-ink-900 leading-tight">
          {car.marca} {car.modelo}
        </h3>

        <div className="grid grid-cols-2 gap-y-2 text-sm text-ink-600">
          <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-ink-400" /> {car.ano}</span>
          <span className="flex items-center gap-2"><Gauge    className="w-4 h-4 text-ink-400" /> {formatKm(car.km)}</span>
          <span className="flex items-center gap-2"><Fuel     className="w-4 h-4 text-ink-400" /> {car.combustivel}</span>
          <span className="flex items-center gap-2"><Settings className="w-4 h-4 text-ink-400" /> {car.cambio}</span>
        </div>

        <hr className="border-slate-100" />

        <div className="mt-auto">
          <p className="text-primary-600 text-xl font-bold">{formatPrice(car.preco)}</p>
          <Link
            to={`/carro/${car.id}`}
            className="mt-4 block text-center bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {t('card_details')}
          </Link>
        </div>
      </div>
    </article>
  );
}
