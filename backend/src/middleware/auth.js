import { supabasePublic } from '../lib/supabase.js';

/**
 * Middleware que verifica o JWT do Supabase no header Authorization.
 * Se válido, anexa req.user; senão devolve 401.
 */
export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const { data, error } = await supabasePublic.auth.getUser(token);
    if (error || !data?.user) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    req.user = data.user;
    next();
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ error: 'Erro interno na autenticação' });
  }
}
