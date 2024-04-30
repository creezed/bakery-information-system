export const positiveNumberOrDefault = (
  value: number | undefined,
  defaultValue: number,
  minValue: 0 | 1 = 0
) => (value === undefined || value < minValue ? defaultValue : value);

export function isEntityKey<T>(
  entityColumns: (keyof T & string)[],
  column: string
): column is keyof T & string {
  return !!entityColumns.find((c) => c === column);
}
