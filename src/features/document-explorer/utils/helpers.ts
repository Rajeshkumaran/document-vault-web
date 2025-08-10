import { DocumentNode, FileNode } from '../interfaces/common';

export function flatten(nodes: DocumentNode[]): DocumentNode[] {
  return nodes.map((n) => ({ ...n }));
}

export function mapExtensionToType(name: string): FileNode['file_type'] {
  const ext = name.split('.').pop()?.toLowerCase();
  switch (ext) {
    case 'pdf':
    case 'docx':
      return ext;
    default:
      return 'pdf';
  }
}

function formatDate(dateString: Date) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function parseISOWithMicros(isoString: string) {
  if (!isoString) return null;

  // Split into date and time parts
  const [datePart, timePart] = isoString.split('T');
  if (!datePart || !timePart) return null;

  const [year, month, day] = datePart.split('-').map(Number);

  const [hours, minutes, secAndMicros] = timePart.split(':');
  const [seconds, microsStr] = secAndMicros.split('.');

  const micros = Number(microsStr || 0);
  const millis = Math.floor(micros / 1000); // JS Date supports only ms

  return formatDate(
    new Date(year, month - 1, Number(day), Number(hours), Number(minutes), Number(seconds), millis),
  );
}
