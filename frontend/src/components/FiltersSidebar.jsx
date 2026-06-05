import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

const MARCAS = ['Todas', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Jeep', 'Toyota', 'Honda', 'Hyundai', 'Chevrolet', 'Ford'];
const ANOS = ['Todos', 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];
const COMBUSTIVEIS = ['Todos', 'Gasolina', 'Etanol', 'Flex', 'Diesel', 'Híbrido', 'Elétrico'];
const CAMBIOS = ['Todos', 'Manual', 'Automático', 'CVT', 'Automatizado'];

const FUEL_EN = { Todos: 'All', Gasolina: 'Gasoline', Etanol: 'Ethanol', Flex: 'Flex', Diesel: 'Diesel', Híbrido: 'Hybrid', Elétrico: 'Electric' };
const CAMBIO_EN = { Todos: 'All', Manual: 'Manual', Automático: 'Automatic', CVT: 'CVT', Automatizado: 'Automated' };

const empty = {
  marca: 'Todas',
  ano: 'Todos',
  combustivel: 'Todos',
  cambio: 'Todos',
  precoMin: 0,
  precoMax: 500000,
};

export default function FiltersSidebar({ onApply }) {
  const [filters, setFilters] = useState(empty);
  const { lang, t } = useLanguage();

  const update = (key, val) => setFilters((f) => ({ ...f, [key]: val }));

  const handleApply = () => {
    const payload = { ...filters };
    Object.keys(payload).forEach((k) => {
      if (payload[k] === 'Todos' || payload[k] === 'Todas') delete payload[k];
    });
    if (payload.precoMin === 0) delete payload.precoMin;
    if (payload.precoMax === 500000) delete payload.precoMax;
    onApply?.(payload);
  };

  const handleClear = () => {
    setFilters(empty);
    onApply?.({});
  };

  return (
    <aside className="bg-white rounded-2xl p-6 shadow-card w-full md:w-72 flex-shrink-0 h-fit">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">{t('filters_title')}</h3>
        <button onClick={handleClear} className="text-primary-600 text-sm font-medium hover:underline">
          {t('filters_clear')}
        </button>
      </div>

      <Field label={t('filters_brand')}>
        <select value={filters.marca} onChange={(e) => update('marca', e.target.value)} className={selectCls}>
          {MARCAS.map((m) => (
            <option key={m} value={m}>
              {m === 'Todas' ? t('filters_all_f') : m}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('filters_year')}>
        <select value={filters.ano} onChange={(e) => update('ano', e.target.value)} className={selectCls}>
          {ANOS.map((a) => (
            <option key={a} value={a}>
              {a === 'Todos' ? t('filters_all') : a}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('filters_fuel')}>
        <select value={filters.combustivel} onChange={(e) => update('combustivel', e.target.value)} className={selectCls}>
          {COMBUSTIVEIS.map((c) => (
            <option key={c} value={c}>
              {lang === 'en' ? FUEL_EN[c] : c}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t('filters_transmission')}>
        <select value={filters.cambio} onChange={(e) => update('cambio', e.target.value)} className={selectCls}>
          {CAMBIOS.map((c) => (
            <option key={c} value={c}>
              {lang === 'en' ? CAMBIO_EN[c] : c}
            </option>
          ))}
        </select>
      </Field>

      <div className="mb-6">
        <label className="text-sm font-semibold text-ink-800 mb-3 block">{t('filters_price_range')}</label>
        <div className="space-y-3">
          <div>
            <span className="text-xs text-ink-600">{t('filters_min')}</span>
            <input type="range" min="0" max="500000" step="5000" value={filters.precoMin}
              onChange={(e) => update('precoMin', Number(e.target.value))} className="w-full" />
            <span className="text-xs text-ink-600">R$ {filters.precoMin.toLocaleString('pt-BR')}</span>
          </div>
          <div>
            <span className="text-xs text-ink-600">{t('filters_max')}</span>
            <input type="range" min="0" max="500000" step="5000" value={filters.precoMax}
              onChange={(e) => update('precoMax', Number(e.target.value))} className="w-full" />
            <span className="text-xs text-ink-600">R$ {filters.precoMax.toLocaleString('pt-BR')}</span>
          </div>
        </div>
      </div>

      <button onClick={handleApply}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-2.5 rounded-lg transition-colors">
        {t('filters_apply')}
      </button>
    </aside>
  );
}

const selectCls =
  'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500';

function Field({ label, children }) {
  return (
    <div className="mb-5">
      <label className="text-sm font-semibold text-ink-800 mb-2 block">{label}</label>
      {children}
    </div>
  );
}
