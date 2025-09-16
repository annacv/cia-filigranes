import { ROUTES_INDEX } from "~/constants";
import type { RouteItem } from "~/types";

const routes = ROUTES_INDEX;

const getItemsByRoute = (section: string): RouteItem | undefined => {
  return routes.find(route => route.name === section);
}

export { getItemsByRoute };