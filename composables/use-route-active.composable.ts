/**
 * Composable for checking if a route is currently active
 * @returns Function to check if a route path is active (exact match)
 */
export function useRouteActive() {
  const route = useRoute();
  const localePath = useLocalePath();

  // Uses exact match strategy to match only the exact route
  const isRouteActiveExact = (path: string): boolean => {
    if (path === '/') {
      return route.path === localePath('/');
    }
    const routePath = localePath(path);
    return route.path === routePath;
  };

  return {
    isRouteActiveExact
  };
}

