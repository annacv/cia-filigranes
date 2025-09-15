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
 */
export type ImageRoute = '' | 'espectacles' | 'tallers' | 'animacions' | 'contacte'

/**
 * Card type for the Filigranes project
 */
export type CardType = 'animacions' | 'espectacles' | 'tallers';

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