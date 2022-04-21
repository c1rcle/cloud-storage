export const mapSeries = async <T, U>(
  array: Array<T>,
  transform: (item: T) => Promise<U>
): Promise<Array<U>> => {
  const results: Array<U> = [];
  for (const item of array) {
    results.push(await transform(item));
  }
  return results;
};
