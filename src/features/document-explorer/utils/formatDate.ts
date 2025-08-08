export function formatDate(iso: string) {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return 'Invalid date';
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
