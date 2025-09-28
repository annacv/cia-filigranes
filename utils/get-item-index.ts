import { ROUTES_INDEX } from "~/constants";

/**
 * Gets the index of an item within its root route's children array in ROUTES_INDEX
 * 
 * @param rootRoute - The root route name (e.g., 'espectacles', 'tallers')
 * @param item - The item name to find the index for (e.g., 'vint-anys', 'circ')
 * @returns The index of the item in the children array, or -1 if not found
 */
export function getItemIndex(rootRoute: string, item: string): number {
  const routeConfig = ROUTES_INDEX.find(route => route.name === rootRoute);
  
  if (!routeConfig?.children) {
    return -1;
  }
  
  return routeConfig.children.indexOf(item);
}
