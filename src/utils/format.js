const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 });
const dateFormat = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export const formatCount = (value) => compact.format(value ?? 0);
export const formatDate = (value) => dateFormat.format(new Date(value));
export const initialOf = (name) => (name?.trim()?.[0] ?? '?').toUpperCase();
export const slugifyUsername = (value) =>
  value.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20);
