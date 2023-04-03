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

export function chunk<T>(elements: T[], chunkSize: number): T[][] {
  return elements.reduce(
    (accumulator, _, idx) =>
      idx % chunkSize !== 0
        ? accumulator
        : [...accumulator, elements.slice(idx, idx + chunkSize)],
    [] as T[][]
  );
}
