import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { api } from '../../lib/api.js';

const empty = {
  marca: '', modelo: '', ano: new Date().getFullYear(), km: 0,
  combustivel: 'Flex', cambio: 'Automático', preco: 0,
  imagem_url: '', descricao: '', badge: '', destaque: false,
};

export default function AdminCarForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState(empty);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;
    api.getCar(id).then((car) => setForm({ ...empty, ...car, badge: car.badge ?? '' }));
  }, [id, isEdit]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = { ...form, badge: form.badge || null };
      if (isEdit) await api.updateCar(id, payload);
      else        await api.createCar(payload);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <Link to="/admin" className="inline-flex items-center gap-2 text-ink-600 hover:text-primary-600 mb-4 text-sm">
        <ArrowLeft className="w-4 h-4" /> Voltar
      </Link>
      <h1 className="text-2xl font-bold text-ink-900 mb-8">
        {isEdit ? 'Editar Carro' : 'Cadastrar Novo Carro'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-card p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Marca *">
            <input required value={form.marca} onChange={(e) => set('marca', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Modelo *">
            <input required value={form.modelo} onChange={(e) => set('modelo', e.target.value)} className={inputCls} />
          </Field>
          <Field label="Ano *">
            <input required type="number" min="1990" max="2030" value={form.ano}
              onChange={(e) => set('ano', Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="Quilometragem">
            <input type="number" min="0" value={form.km}
              onChange={(e) => set('km', Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="Combustível">
            <select value={form.combustivel} onChange={(e) => set('combustivel', e.target.value)} className={inputCls}>
              {['Gasolina','Etanol','Flex','Diesel','Híbrido','Elétrico'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Câmbio">
            <select value={form.cambio} onChange={(e) => set('cambio', e.target.value)} className={inputCls}>
              {['Manual','Automático','CVT','Automatizado'].map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Preço (R$) *">
            <input required type="number" min="0" step="100" value={form.preco}
              onChange={(e) => set('preco', Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="Badge">
            <select value={form.badge} onChange={(e) => set('badge', e.target.value)} className={inputCls}>
              <option value="">Nenhum</option>
              <option>Baixa KM</option><option>Novo</option><option>Promoção</option><option>Destaque</option>
            </select>
          </Field>
        </div>

        <Field label="URL da imagem">
          <input value={form.imagem_url} onChange={(e) => set('imagem_url', e.target.value)}
            placeholder="https://..." className={inputCls} />
          {form.imagem_url && (
            <img src={form.imagem_url} alt="preview" className="mt-3 h-32 rounded-lg object-cover" />
          )}
        </Field>

        <Field label="Descrição">
          <textarea rows="4" value={form.descricao} onChange={(e) => set('descricao', e.target.value)} className={inputCls} />
        </Field>

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.destaque} onChange={(e) => set('destaque', e.target.checked)}
            className="w-4 h-4 accent-primary-600" />
          <span>Exibir este carro na seção "Carros em Destaque" da home</span>
        </label>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Link to="/admin" className="px-5 py-2.5 rounded-lg text-ink-600 hover:bg-slate-50 text-sm font-medium">
            Cancelar
          </Link>
          <button type="submit" disabled={saving}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm">
            <Save className="w-4 h-4" /> {saving ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputCls = 'w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500';

function Field({ label, children }) {
  return (
    <div>
      <label className="text-sm font-semibold text-ink-800 mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}
