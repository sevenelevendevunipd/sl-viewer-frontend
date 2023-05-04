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

export function min<T>(a: T, b: T): T {
  return a <= b ? a : b;
}

export function max<T>(a: T, b: T): T {
  return a >= b ? a : b;
}

export function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }
  return color;
}

export function getContrastYIQ(hexcolor: string) {
  hexcolor = hexcolor.replace(`#`, ``);
  const r = parseInt(hexcolor.slice(0, 2), 16),
    g = parseInt(hexcolor.slice(2, 4), 16),
    b = parseInt(hexcolor.slice(4, 7), 16),
    yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#ffffff";
}
