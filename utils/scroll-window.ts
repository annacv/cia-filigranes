/**
 * Programmatic vertical scroll that ignores `html { scroll-behavior: smooth }`.
 * Used for hero anchor follow (rAF) and hard scroll resets after navigation.
 */
export function scrollWindowY(y: number): void {
  window.scrollTo({ top: y, left: 0, behavior: 'instant' })
}
