/**
 * Centralized type definitions for the Filigranes project
 */

/**
 * Image route types for asset organization
 */
export type ImageRoute = '' | 'espectacles' | 'tallers' | 'animacions' | 'contacte'

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
