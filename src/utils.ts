export function groupBy<T, K extends string | number | symbol>(
  elements: T[],
  indexer: (element: T) => K
): Record<K, T[]> {
  return elements.reduce((elems, elem) => {
    const index = indexer(elem);
    elems[index] = [...(elems[index] || []), elem];
    return elems;
  }, {} as Record<K, T[]>);
}
