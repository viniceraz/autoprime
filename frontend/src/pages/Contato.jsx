import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext.jsx';

export default function Contato() {
  const [form, setForm] = useState({ nome: '', email: '', mensagem: '' });
  const [sent, setSent] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ nome: '', email: '', mensagem: '' });
  };

  return (
    <section className="bg-bgsoft min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-ink-900 mb-3">{t('contact_title')}</h1>
          <p className="text-ink-600">{t('contact_sub')}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-card p-8 space-y-6">
            <h2 className="font-bold text-xl text-ink-900 mb-2">{t('contact_info')}</h2>
            <Item icon={MapPin} title={t('contact_address')} text="Av. Paulista, 1000 - São Paulo, SP" />
            <Item icon={Phone}  title={t('contact_phone')}   text="(11) 98765-4321" />
            <Item icon={Mail}   title={t('contact_email')}   text="contato@autoprime.com" />
            <Item icon={Clock}  title={t('contact_hours')}   text={t('contact_hours_val')} />
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8">
            <h2 className="font-bold text-xl text-ink-900 mb-6">{t('contact_form_title')}</h2>
            <div className="space-y-4">
              <input required placeholder={t('contact_name_ph')} value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })} className={inputCls} />
              <input required type="email" placeholder={t('contact_email_ph')} value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} />
              <textarea required rows="5" placeholder={t('contact_msg_ph')} value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })} className={inputCls} />
              <button type="submit"
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 rounded-lg transition-colors">
                {t('contact_send')}
              </button>
              {sent && <p className="text-emerald-600 text-sm text-center">{t('contact_sent')}</p>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputCls = 'w-full border border-slate-200 rounded-lg px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500';

function Item({ icon: Icon, title, text }) {
  return (
    <div className="flex gap-4">
      <span className="w-11 h-11 rounded-lg bg-primary-100 grid place-items-center flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-600" />
      </span>
      <div>
        <p className="font-semibold text-ink-900">{title}</p>
        <p className="text-sm text-ink-600">{text}</p>
      </div>
    </div>
  );
}
