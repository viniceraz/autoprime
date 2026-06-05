import { createContext, useContext, useState } from 'react';
import { translations } from '../locales/translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('autoprime_lang') || 'pt');

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : 'pt';
    setLang(next);
    localStorage.setItem('autoprime_lang', next);
  };

  const t = (key) => translations[lang][key] ?? translations.pt[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
