import { DocumentNode } from '../interfaces/common';

export function flatten(nodes: DocumentNode[]): DocumentNode[] {
  return nodes.map((n) => ({ ...n }));
}
