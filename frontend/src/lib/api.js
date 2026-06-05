import { supabase } from './supabase.js';

export const api = {
  listCars: async (filters = {}) => {
    let query = supabase
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    const { marca, ano, combustivel, cambio, precoMin, precoMax, modelo } = filters;
    if (marca && marca !== 'Todas') query = query.eq('marca', marca);
    if (ano && ano !== 'Todos') query = query.eq('ano', Number(ano));
    if (combustivel && combustivel !== 'Todos') query = query.eq('combustivel', combustivel);
    if (cambio && cambio !== 'Todos') query = query.eq('cambio', cambio);
    if (precoMin) query = query.gte('preco', Number(precoMin));
    if (precoMax) query = query.lte('preco', Number(precoMax));
    if (modelo) query = query.ilike('modelo', `%${modelo}%`);

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  },

  getDestaques: async () => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('destaque', true)
      .order('created_at', { ascending: false })
      .limit(3);
    if (error) throw new Error(error.message);
    return data;
  },

  getCar: async (id) => {
    const { data, error } = await supabase
      .from('cars')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  createCar: async (body) => {
    const { data, error } = await supabase
      .from('cars')
      .insert(sanitize(body))
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  updateCar: async (id, body) => {
    const { data, error } = await supabase
      .from('cars')
      .update(sanitize(body))
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  },

  deleteCar: async (id) => {
    const { error } = await supabase.from('cars').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return null;
  },
};

function sanitize(body = {}) {
  return {
    marca: body.marca ?? null,
    modelo: body.modelo ?? null,
    ano: body.ano ? Number(body.ano) : null,
    km: body.km ? Number(body.km) : 0,
    combustivel: body.combustivel ?? null,
    cambio: body.cambio ?? null,
    preco: body.preco ? Number(body.preco) : 0,
    imagem_url: body.imagem_url ?? null,
    descricao: body.descricao ?? null,
    badge: body.badge ?? null,
    destaque: Boolean(body.destaque),
  };
}
