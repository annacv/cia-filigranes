import type { CalendarEvent, GoogleCalendarEvent, ContentType, CardImage, EventInfoLink } from '~/types'
import { getImageByRoute } from '~/utils/image-by-route'

const FILI_SHOWS: Record<string, string> = {
  '20 anys no son res': 'vint-anys',
  'el circ filixic': 'circ-filixic',
  'plis plas': 'plis-plas',
  'cercavila germans freak frac': 'freak-frac',
  'el petit circ de makutu': 'circ-makutu',
  'trinxat no tremola': 'circ-trinxeta',
}

const OTHER_FILI_SHOWS: Record<string, string> = {
  'germans filigranes': 'germans-filigranes',
  'els germans filigranes': 'germans-filigranes',
}

const COLLABORATIONS_SHOWS: Record<string, string> = {
  'el circ filikrusty': 'circ-filikrusty',
  'heeelp': 'heeelp',
  'help': 'heeelp',
  'fingerlight': 'fingerlight',
  'vendaval': 'vendaval',
  'clown de pas': 'clown-de-pas',
  'alter': 'clown-de-pas'
}

export const FILI_SHOWS_IMAGE_KEYS = Object.values(FILI_SHOWS)
export const OTHER_FILI_SHOWS_IMAGE_KEYS = Object.values(OTHER_FILI_SHOWS)
export const COLLABORATIONS_SHOWS_IMAGE_KEYS = Object.values(COLLABORATIONS_SHOWS)

const SHOWS_TITLE_TO_IMAGE_KEY: Record<string, string> = {
  ...FILI_SHOWS,
  // Espectacles "fora de carta" o pendents d'afegir a la web
  ...OTHER_FILI_SHOWS,
  // Col·laboracions:
  ...COLLABORATIONS_SHOWS
}

const WORKSHOPS_TITLE_TO_IMAGE_KEY: Record<string, string> = {
  'taller de circ': 'circ',
  'circ': 'circ',
  'taller de bombolles de sabo': 'bombolles-sabo',
  'bombolles de sabo': 'bombolles-sabo',
  'taller de pallassos': 'pallassos',
  'pallassos': 'pallassos',
  'taller de maquillatge': 'maquillatge',
  'maquillatge': 'maquillatge',
  "taller d'enginys d'aigua": 'enginys-aigua',
  "enginys d'aigua": 'enginys-aigua',
}

// Uses the same base keys as HighlightPerformances
const PERFORMANCES_TITLE_TO_IMAGE_KEY: Record<string, string> = {
  'animacions a la carta': 'caixes-1',
  'animacio amb malabars de foc': 'foc',
  'animacio circ d epoca': 'circ-epoca',
  'animacio malabars amb caixes': 'caixes-1',
}

const normalizeTitle = (value: string): string => {
  return value
    .replace(/@/g, 'o')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s'-]/g, ' ')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

const getTitleMapByEventType = (eventType: ContentType): Record<string, string> | null => {
  return eventType === 'shows'
    ? SHOWS_TITLE_TO_IMAGE_KEY
    : eventType === 'workshops'
      ? WORKSHOPS_TITLE_TO_IMAGE_KEY
      : eventType === 'performances'
        ? PERFORMANCES_TITLE_TO_IMAGE_KEY
        : null
}

const getImageRouteByEventType = (eventType: ContentType) => {
  return eventType === 'shows'
    ? 'espectacles'
    : eventType === 'workshops'
      ? 'tallers'
      : 'animacions'
}

export const getMatchedContentKeyByTitle = (title: string, eventType: ContentType): string | undefined => {
  const normalizedTitle = normalizeTitle(title)
  const titleMap = getTitleMapByEventType(eventType)
  if (!titleMap) return undefined

  const exact = titleMap[normalizedTitle]
  if (exact) return exact

  const matched = Object.entries(titleMap).find(([candidate]) => {
    return normalizedTitle.includes(candidate)
  })

  return matched?.[1]
}

export const getRouteTranslationKeyByTitle = (title: string, eventType: ContentType): string | undefined => {
  const matchedContentKey = getMatchedContentKeyByTitle(title, eventType)
  return matchedContentKey ? `routes.${matchedContentKey}` : undefined
}

const getEventImageByTitle = (title: string, eventType: ContentType): CardImage | undefined => {
  const matchedContentKey = getMatchedContentKeyByTitle(title, eventType)
  if (!matchedContentKey) return undefined

  return getImageByRoute(getImageRouteByEventType(eventType), matchedContentKey)
}

const getFallbackImageForType = (eventType: ContentType): CardImage | undefined => {
  switch (eventType) {
    case 'shows':
      return getImageByRoute('espectacles', 'fallback')
    case 'workshops':
      return getImageByRoute('tallers', 'fallback')
    case 'performances':
      return getImageByRoute('animacions', 'caixes-1')
    default:
      return undefined
  }
}

/**
 * Returns an event "info link" used by the agenda trend cards.
 *
 * - For shows with dedicated pages: link to the page video anchor (`#video`)
 * - For collaborations shows: link to the collaborations page section (`#<contentKey>`)
 * - For OTHER_FILI_SHOWS: returns `undefined` (no button)
 */
const getEventInfoLink = (title: string, eventType: ContentType): EventInfoLink | undefined => {
  const contentKey = getMatchedContentKeyByTitle(title, eventType)

  if (eventType === 'shows') {
    if (!contentKey) return undefined

    if (OTHER_FILI_SHOWS_IMAGE_KEYS.includes(contentKey)) return undefined

    if (FILI_SHOWS_IMAGE_KEYS.includes(contentKey)) {
      return {
        href: `/espectacles/${contentKey}#video`,
        target: '_self',
        text: 'button.teaser',
      }
    }

    if (COLLABORATIONS_SHOWS_IMAGE_KEYS.includes(contentKey)) {
      return {
        href: `/collaboracions#${contentKey}`,
        target: '_self',
        text: 'button.info',
      }
    }

    return undefined
  }

  if (eventType === 'workshops') {
    return contentKey
      ? {
          href: `/tallers/${contentKey}`,
          target: '_self',
          text: 'button.info',
        }
      : undefined
  }

  if (eventType === 'performances') {
    return {
      href: '/animacions',
      target: '_self',
      text: 'button.info',
    }
  }

  return undefined
}

const extractUrlFromDescription = (description: string | undefined): { link: string; raw: string } | undefined => {
  if (!description || typeof description !== 'string') return undefined
  const match = description.match(/https?:\/\/[^\s]+/)
  if (!match) return undefined
  const raw = match[0]
  const link = raw.replace(/[.,;:)\]]+$/, '')
  return { link, raw }
}

export const transformGoogleCalendarEvent = (event: GoogleCalendarEvent): CalendarEvent => {
  const isAllDay = !event.start.dateTime
  const normalizedSummary = event.summary.replace(/@/g, 'o')

  // Use a fully normalized version of the summary for type detection so
  // accents and punctuation don't affect matching.
  const typeDetectionSource = normalizeTitle(event.summary)
  const typeWords = typeDetectionSource.split(' ')

  const hasEspectacle = typeDetectionSource.includes('espectacle') || typeDetectionSource.includes('espectacles')
  const hasNumero = typeDetectionSource.includes('numero')
  const hasWorkshopTerm = typeWords.some((word) => word === 'taller' || word === 'tallers')
  const hasPerformanceTerm = typeDetectionSource.includes('animacio') || typeDetectionSource.includes('animacions')

  let eventType: ContentType
  if (hasEspectacle) {
    eventType = 'shows'
  } else if (hasNumero || hasPerformanceTerm) {
    eventType = 'performances'
  } else if (hasWorkshopTerm) {
    eventType = 'workshops'
  } else {
    eventType = 'shows'
  }

  const titleForDisplay = hasEspectacle
    ? normalizedSummary.replace(/^\s*Espectacle\s+/i, '')
    : normalizedSummary

  const urlResult = extractUrlFromDescription(event.description)
  const description = event.description
    ? (urlResult ? event.description.replace(urlResult.raw, '').replace(/\s+/g, ' ').trim() : event.description)
    : undefined

  const isClosedGroupEvent = /\btancats?\b/i.test(description ?? '')

  return {
    id: event.id,
    eventType,
    title: titleForDisplay,
    description: description || undefined,
    location: event.location,
    image: getEventImageByTitle(normalizedSummary, eventType) ?? getFallbackImageForType(eventType),
    eventInfoLink: getEventInfoLink(normalizedSummary, eventType),
    reservationLink: urlResult?.link,
    isClosedGroupEvent,
    start: event.start.dateTime || event.start.date || '',
    end: event.end?.dateTime || event.end?.date || null,
    isAllDay,
    htmlLink: event.htmlLink,
  }
}

export const transformGoogleCalendarEvents = (events: GoogleCalendarEvent[]): CalendarEvent[] => {
  return events.map(transformGoogleCalendarEvent)
}
