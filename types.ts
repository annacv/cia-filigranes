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
export type ImageRoute = '' | 'espectacles' | 'tallers' | 'animacions' | 'contacte'

/**
 * Content type for the Filigranes project
 * Set in en to match the content type in the translations
 */
export type ContentType = 'performances' | 'shows' | 'workshops';

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