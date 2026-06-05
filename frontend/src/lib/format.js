export const formatPrice = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value || 0);

export const formatKm = (value) =>
  `${new Intl.NumberFormat('pt-BR').format(value || 0)} km`;

export const BADGE_STYLES = {
  'Baixa KM':  'bg-primary-600 text-white',
  'Novo':      'bg-emerald-500 text-white',
  'Promoção':  'bg-red-500 text-white',
  'Destaque':  'bg-purple-500 text-white',
};
