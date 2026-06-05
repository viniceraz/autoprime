import { Link, NavLink, useLocation } from 'react-router-dom';
import { Car, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Navbar() {
  const location = useLocation();
  const { lang, toggleLang, t } = useLanguage();

  if (location.pathname.startsWith('/admin')) return null;

  const navItems = [
    { to: '/',        label: t('nav_home'),    end: true },
    { to: '/estoque', label: t('nav_stock') },
    { to: '/contato', label: t('nav_contact') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-10 h-10 rounded-xl bg-primary-600 grid place-items-center">
            <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold text-ink-900">AutoPrime</span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `text-[15px] font-medium transition-colors ${
                  isActive ? 'text-primary-600' : 'text-ink-800 hover:text-primary-600'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="hidden md:flex items-center gap-1.5 text-sm font-medium text-ink-600 hover:text-primary-600 border border-slate-200 hover:border-primary-400 rounded-lg px-3 py-1.5 transition-colors"
          >
            <Globe className="w-4 h-4" />
            {lang === 'pt' ? 'EN' : 'PT'}
          </button>
          <Link
            to="/estoque"
            className="bg-primary-600 hover:bg-primary-700 transition-colors text-white font-semibold px-6 py-2.5 rounded-lg text-sm shadow-sm"
          >
            {t('nav_see_cars')}
          </Link>
        </div>
      </div>
    </header>
  );
}
