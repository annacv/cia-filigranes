import type { BaseDropdownOption, CardImage, ContentType } from './index'

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

/**
 * Event type item configuration
 */
export interface EventTypeItem extends BaseDropdownOption {
  activeIndicatorClass: string
  inactiveIndicatorClass: string
}
