/**
 * Composable for checking if a route is currently active
 * @returns Functions to check if a route path is active (startsWith and exact match)
 */
export function useRouteActive() {
  const route = useRoute();
  const localePath = useLocalePath();

  // Uses startsWith strategy to match both parent and child routes
  const isRouteActive = (path: string): boolean => {
    if (path === '/') {
      return route.path === localePath('/');
    }
    return route.path.startsWith(localePath(path)) && route.path !== localePath('/');
  };

  // Uses exact match strategy to match only the exact route
  const isRouteActiveExact = (path: string): boolean => {
    if (path === '/') {
      return route.path === localePath('/');
    }
    const routePath = localePath(path);
    return route.path === routePath;
  };

  return {
    isRouteActive,
    isRouteActiveExact
  };
}

