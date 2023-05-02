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

export  function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).slice(-2);
  }
  return color;
}

export function reshade(hexColor: string, magnitude: number){
  hexColor = hexColor.replace(`#`, ``);
    const decimalColor = parseInt(hexColor, 16);
    let r = (decimalColor >> 16) + magnitude;
    r > 255 && (r = 255);
    r < 0 && (r = 0);
    let g = (decimalColor & 0x0000ff) + magnitude;
    g > 255 && (g = 255);
    g < 0 && (g = 0);
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
    b > 255 && (b = 255);
    b < 0 && (b = 0);
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
}
