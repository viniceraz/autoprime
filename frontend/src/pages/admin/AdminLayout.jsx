import { Link, NavLink, Outlet, Navigate } from 'react-router-dom';
import { Car, LayoutDashboard, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();

  if (loading) return <div className="min-h-screen grid place-items-center">Carregando...</div>;
  if (!user) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen flex bg-bgsoft">
      <aside className="w-64 bg-white border-r border-slate-100 p-6 flex flex-col">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <span className="w-10 h-10 rounded-xl bg-primary-600 grid place-items-center">
            <Car className="w-5 h-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-lg font-bold text-ink-900">AutoPrime</span>
        </Link>

        <nav className="space-y-1 flex-1">
          <NavLink to="/admin" end className={navCls}>
            <LayoutDashboard className="w-4 h-4" /> Carros
          </NavLink>
          <NavLink to="/admin/novo" className={navCls}>
            <Plus className="w-4 h-4" /> Novo carro
          </NavLink>
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <p className="text-xs text-ink-400 mb-2 truncate">{user.email}</p>
          <button onClick={logout}
            className="w-full flex items-center gap-2 text-sm text-ink-600 hover:text-red-600 transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}

const navCls = ({ isActive }) =>
  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    isActive ? 'bg-primary-50 text-primary-600' : 'text-ink-600 hover:bg-slate-50'
  }`;
