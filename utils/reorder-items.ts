/**
 * Reorders an array by moving the item at the specified position to the end.
 * Moves all following items to the beginning while maintaining their order.
 *
 * @param array - The array to reorder
 * @param position - The index of the item to move to the end
 * @returns A new array with the reordered items
 */
export function reorderItems<T>(array: T[], position: number): T[] {
  if (position < 0 || position >= array.length) return [...array];
  if (position === array.length - 1) return [...array];

  const beforePosition = array.slice(0, position);
  const itemAtPosition = array[position];
  const afterPosition = array.slice(position + 1);

  return [...afterPosition, ...beforePosition, itemAtPosition];
}
