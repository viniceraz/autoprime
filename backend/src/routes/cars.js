import { Router } from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/cars
 * Listagem pública com filtros opcionais via query:
 *   marca, ano, combustivel, cambio, precoMin, precoMax, modelo
 */
router.get('/', async (req, res) => {
  try {
    const { marca, ano, combustivel, cambio, precoMin, precoMax, modelo } = req.query;

    let query = supabaseAdmin
      .from('cars')
      .select('*')
      .order('created_at', { ascending: false });

    if (marca && marca !== 'Todas') query = query.eq('marca', marca);
    if (ano && ano !== 'Todos') query = query.eq('ano', Number(ano));
    if (combustivel && combustivel !== 'Todos') query = query.eq('combustivel', combustivel);
    if (cambio && cambio !== 'Todos') query = query.eq('cambio', cambio);
    if (precoMin) query = query.gte('preco', Number(precoMin));
    if (precoMax) query = query.lte('preco', Number(precoMax));
    if (modelo) query = query.ilike('modelo', `%${modelo}%`);

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('GET /cars error:', err);
    res.status(500).json({ error: err.message });
  }
});

/** GET /api/cars/destaques - retorna até 3 carros marcados como destaque */
router.get('/destaques', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      .eq('destaque', true)
      .order('created_at', { ascending: false })
      .limit(3);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** GET /api/cars/:id - detalhe de um carro */
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('cars')
      .select('*')
      .eq('id', req.params.id)
      .single();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Carro não encontrado' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/** POST /api/cars - cria carro (admin) */
router.post('/', requireAuth, async (req, res) => {
  try {
    const payload = sanitizeCarBody(req.body);
    const { data, error } = await supabaseAdmin
      .from('cars')
      .insert(payload)
      .select()
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error('POST /cars error:', err);
    res.status(400).json({ error: err.message });
  }
});

/** PUT /api/cars/:id - atualiza carro (admin) */
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const payload = sanitizeCarBody(req.body);
    const { data, error } = await supabaseAdmin
      .from('cars')
      .update(payload)
      .eq('id', req.params.id)
      .select()
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/** DELETE /api/cars/:id - remove carro (admin) */
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('cars')
      .delete()
      .eq('id', req.params.id);
    if (error) throw error;
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * Sanitiza/normaliza payload do carro - aceita só os campos esperados.
 */
function sanitizeCarBody(body = {}) {
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
    badge: body.badge ?? null, // 'Baixa KM' | 'Novo' | 'Promoção' | 'Destaque' | null
    destaque: Boolean(body.destaque),
  };
}

export default router;
