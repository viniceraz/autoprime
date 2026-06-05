import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { Car, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLogin() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Falha no login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-bgsoft px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-card p-8">
        <Link to="/" className="flex items-center gap-2 justify-center mb-8">
          <span className="w-10 h-10 rounded-xl bg-primary-600 grid place-items-center">
            <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-bold text-ink-900">AutoPrime</span>
        </Link>

        <h1 className="text-2xl font-bold text-ink-900 mb-1 text-center">Painel Administrativo</h1>
        <p className="text-ink-600 text-sm text-center mb-8">Faça login para gerenciar o estoque</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-ink-800 mb-1.5 block">E-mail</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>
          <div>
            <label className="text-sm font-semibold text-ink-800 mb-1.5 block">Senha</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button type="submit" disabled={loading}
            className="w-full bg-primary-600 hover:bg-primary-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <LogIn className="w-4 h-4" /> {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className="text-xs text-ink-400 mt-6 text-center">
          Crie um usuário no Supabase &rarr; Authentication &rarr; Users
        </p>
      </div>
    </div>
  );
}
