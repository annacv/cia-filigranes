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

/**
 * Google Calendar API response event structure
 */
export interface GoogleCalendarEvent {
  id: string
  summary: string
  description: string
  location: string
  start: { dateTime?: string; date?: string }
  end?: { dateTime?: string; date?: string }
  htmlLink: string
}

/**
 * Google Calendar API response structure
 */
export interface CalendarApiResponse {
  items: GoogleCalendarEvent[]
}

/**
 * Normalized calendar event for frontend use
 */
export interface CalendarEvent {
  id: string
  eventType: ContentType
  title: string
  description?: string
  location?: string
  image?: CardImage
  reservationLink?: string
  eventInfoLink?: EventInfoLink
  isClosedGroupEvent: boolean
  start: string
  end: string | null
  isAllDay: boolean
  htmlLink?: string
}

export type EventInfoLinkTextKey = 'button.teaser' | 'button.info'

export type EventInfoLink = {
  href: string
  target: '_self' | '_blank'
  text: EventInfoLinkTextKey
}

export type BaseDropdownOption = {
  value: string | null
  labelKey: string
  [key: string]: unknown
}

/**
 * Event type item configuration
 */
export interface EventTypeItem extends BaseDropdownOption {
  activeIndicatorClass: string
  inactiveIndicatorClass: string
}

/** Show vs workshop when opening the hire contract flow from synopsis */
export type HireProductKind = 'show' | 'workshop'

export type HireContractContext = {
  kind: HireProductKind
  /** Route slug, e.g. plis-plas or circ */
  productKey: string
}
