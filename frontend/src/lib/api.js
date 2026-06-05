import { supabase } from './supabase.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function authHeader() {
  const { data } = await supabase.auth.getSession();
  const token = data?.session?.access_token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.auth ? await authHeader() : {}),
    ...(options.headers || {}),
  };
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

export const api = {
  listCars: (filters = {}) => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') params.append(k, v);
    });
    const qs = params.toString();
    return request(`/cars${qs ? `?${qs}` : ''}`);
  },
  getDestaques: () => request('/cars/destaques'),
  getCar: (id) => request(`/cars/${id}`),
  createCar: (data) => request('/cars', { method: 'POST', body: JSON.stringify(data), auth: true }),
  updateCar: (id, data) => request(`/cars/${id}`, { method: 'PUT', body: JSON.stringify(data), auth: true }),
  deleteCar: (id) => request(`/cars/${id}`, { method: 'DELETE', auth: true }),
};
