import { ROUTES_INDEX } from "~/constants";

const routes = ROUTES_INDEX;

const getItemsByRoute = (section: string) => {
  return routes.find(route => route.name === section);
}

export { getItemsByRoute };