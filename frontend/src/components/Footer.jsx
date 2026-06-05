import { Link, useLocation } from 'react-router-dom';
import { Car, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Footer() {
  const { pathname } = useLocation();
  const { t } = useLanguage();

  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="bg-ink-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-10 h-10 rounded-xl bg-primary-600 grid place-items-center">
              <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
            </span>
            <span className="text-xl font-bold text-white">AutoPrime</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{t('footer_desc')}</p>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer_quick_links')}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/"        className="hover:text-white">{t('footer_home')}</Link></li>
            <li><Link to="/estoque" className="hover:text-white">{t('footer_stock')}</Link></li>
            <li><Link to="/contato" className="hover:text-white">{t('footer_contact')}</Link></li>
            <li><span className="text-slate-400">{t('footer_financing')}</span></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer_contact')}</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Av. Paulista, 1000 - São Paulo, SP</li>
            <li className="flex items-center gap-2"><Phone  className="w-4 h-4" /> (11) 98765-4321</li>
            <li className="flex items-center gap-2"><Mail   className="w-4 h-4" /> contato@autoprime.com</li>
          </ul>
        </div>

        {/* Horário */}
        <div>
          <h4 className="text-white font-semibold mb-4">{t('footer_hours_title')}</h4>
          <ul className="space-y-1 text-sm text-slate-300">
            <li>{t('footer_hours_weekdays')}</li>
            <li>{t('footer_hours_sat')}</li>
            <li>{t('footer_hours_sun')}</li>
          </ul>
          <div className="mt-4 flex gap-3">
            <a href="#" className="w-9 h-9 grid place-items-center rounded-full bg-white/5 hover:bg-white/10"><Facebook  className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 grid place-items-center rounded-full bg-white/5 hover:bg-white/10"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 grid place-items-center rounded-full bg-white/5 hover:bg-white/10"><Twitter   className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 text-xs text-slate-500 flex justify-between">
          <span>© {new Date().getFullYear()} AutoPrime. {t('footer_rights')}</span>
          <Link to="/admin/login" className="hover:text-slate-300">{t('footer_admin')}</Link>
        </div>
      </div>
    </footer>
  );
}
