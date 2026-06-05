import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pencil, Trash2, Plus, Star } from 'lucide-react';
import { api } from '../../lib/api.js';
import { formatPrice, formatKm } from '../../lib/format.js';

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    api.listCars().then((data) => { setCars(data); setLoading(false); });
  };

  useEffect(refresh, []);

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este carro?')) return;
    try {
      await api.deleteCar(id);
      refresh();
    } catch (err) {
      alert('Erro ao excluir: ' + err.message);
    }
  };

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-ink-900">Gerenciar Carros</h1>
          <p className="text-sm text-ink-600">{cars.length} veículo(s) no estoque</p>
        </div>
        <Link to="/admin/novo"
          className="bg-primary-600 hover:bg-primary-700 text-white font-semibold px-4 py-2.5 rounded-lg flex items-center gap-2 text-sm">
          <Plus className="w-4 h-4" /> Novo carro
        </Link>
      </header>

      <div className="bg-white rounded-2xl shadow-card overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-ink-600">Carregando...</div>
        ) : cars.length === 0 ? (
          <div className="p-10 text-center text-ink-600">Nenhum carro cadastrado.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-bgsoft text-left text-ink-600">
                <tr>
                  <th className="px-6 py-3 font-semibold">Veículo</th>
                  <th className="px-6 py-3 font-semibold">Ano</th>
                  <th className="px-6 py-3 font-semibold">KM</th>
                  <th className="px-6 py-3 font-semibold">Preço</th>
                  <th className="px-6 py-3 font-semibold">Badge</th>
                  <th className="px-6 py-3 font-semibold text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {cars.map((car) => (
                  <tr key={car.id} className="border-t border-slate-100">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {car.imagem_url && (
                          <img src={car.imagem_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        )}
                        <div>
                          <p className="font-semibold text-ink-900 flex items-center gap-2">
                            {car.marca} {car.modelo}
                            {car.destaque && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />}
                          </p>
                          <p className="text-xs text-ink-400">{car.combustivel} • {car.cambio}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-ink-600">{car.ano}</td>
                    <td className="px-6 py-4 text-ink-600">{formatKm(car.km)}</td>
                    <td className="px-6 py-4 font-semibold text-primary-600">{formatPrice(car.preco)}</td>
                    <td className="px-6 py-4">
                      {car.badge ? (
                        <span className="text-xs bg-slate-100 text-ink-800 px-2 py-1 rounded-full">{car.badge}</span>
                      ) : (
                        <span className="text-xs text-ink-400">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/editar/${car.id}`}
                          className="p-2 rounded-lg hover:bg-slate-100 text-ink-600">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button onClick={() => handleDelete(car.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
