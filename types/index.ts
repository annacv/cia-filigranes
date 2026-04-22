/**
 * Centralized type definitions for the Filigranes project
 */

/**
 * Supported locale codes for internationalization
 */
export type LocaleCode = 'ca' | 'es' | 'en';

/**
 * Route item configuration
 */
export type RouteItem = {
  name: string;
  children?: string[];
}

/**
 * Image route types for asset organization
 * Set in ca to match the image route in the assets' folder
 */
export type ImageRoute = '' | 'espectacles' | 'tallers' | 'animacions' | 'contacte' | 'filipersones' | 'agenda' | 'collaboracions' | 'descarregues'

/**
 * Content type for the Filigranes project
 * Set in en to match the content type in the translations
 */
export type ContentType = 'performances' | 'shows' | 'workshops' | 'filipersones' | 'contact';

/**
 * Card link configuration
 */
export type CardLink = {
  target: string;
  href: string;
}

/**
 * Card image configuration
 */
export type CardImage = {
  imageName: string;
  imageRoute: ImageRoute;
}

export type BaseDropdownOption = {
  value: string | null
  labelKey: string
  [key: string]: unknown
}

/** Show vs workshop when opening the hire contract flow from synopsis */
export type HireProductKind = 'show' | 'workshop'

export type HireContractContext = {
  kind: HireProductKind
  /** Route slug, e.g. plis-plas or circ */
  productKey: string
}
