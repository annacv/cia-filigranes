import type { ContentType, EventTypeItem } from "~/types"
import { routePages } from '~/i18n/custom-routes'

export const ROUTES_INDEX = [
  {
    name: "espectacles",
    children: [ 'vint-anys', 'plis-plas', 'circ-filixic', 'circ-makutu', 'circ-trinxeta', 'freak-frac']
  },
  {
    name: "tallers",
    children: ['circ', 'bombolles-sabo', 'pallassos', 'maquillatge', 'enginys-aigua']
  },
  {
    name: "animacions"
  },
  {
    name: "collaboracions"
  },
  {
    name: "filipersones",
    children: ['trinxeta', 'makutu']
  },
  {
    name: "agenda"
  },
  {
    name: "contacte"
  }
]

export const LOCALE_ROUTES = routePages as Record<
  keyof typeof routePages,
  { ca: string; en: string; es: string }
>

export const GLOB_IMPORTS = {
  mobileShowImages: import.meta.glob('~/assets/images/mobile/espectacles/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopShowImages: import.meta.glob('~/assets/images/desktop/espectacles/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  mobileTallerImages: import.meta.glob('~/assets/images/mobile/tallers/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopTallerImages: import.meta.glob('~/assets/images/desktop/tallers/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  mobileAnimacionsImages: import.meta.glob('~/assets/images/mobile/animacions/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopAnimacionsImages: import.meta.glob('~/assets/images/desktop/animacions/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  mobileContacteImages: import.meta.glob('~/assets/images/mobile/contacte/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopContacteImages: import.meta.glob('~/assets/images/desktop/contacte/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  mobileFilipersonesImages: import.meta.glob('~/assets/images/mobile/filipersones/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopFilipersonesImages: import.meta.glob('~/assets/images/desktop/filipersones/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  mobileAgendaImages: import.meta.glob('~/assets/images/mobile/agenda/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopAgendaImages: import.meta.glob('~/assets/images/desktop/agenda/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  mobileCollaboracionsImages: import.meta.glob('~/assets/images/mobile/collaboracions/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopCollaboracionsImages: import.meta.glob('~/assets/images/desktop/collaboracions/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  mobileImages: import.meta.glob('~/assets/images/mobile/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopImages: import.meta.glob('~/assets/images/desktop/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  commonImages: import.meta.glob('~/assets/images/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,
};

export const PERFORMANCES_IMG = [
  {
    imageName: 'animacions_foc',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_circ-epoca',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_forner',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_domador-1',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_cuiners-1',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_foc-2',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_torpede-1',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_caixes-1',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_foc-3',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_cuiners-2',
    imageRoute: 'animacions' as const
  }
]

export const PERFORMANCES_GALLERY_IMG = [
  {
    imageName: 'animacions_foc-2',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_circ-epoca',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_forner',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_foc-3',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_cuiners-2',
    imageRoute: 'animacions' as const
  },
  {
    imageName: 'animacions_foc',
    imageRoute: 'animacions' as const
  },
]

export const CONTACT = {
  "email": "ciafiligranes@gmail.com",
  "adress": "Carrer de Sant Leopold, 63. Local 5. 08221. Terrassa (Barcelona)",
  "adressHref": "https://www.google.com/maps/place/Cia+Filigranes/@41.567796,2.0127018,17z/data=!3m1!4b1!4m6!3m5!1s0x12a492c3e2155299:0x4d072d8f6b4f6768!8m2!3d41.567796!4d2.0127018!16s%2Fg%2F11c5846tgk?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D",
  "phones": {
    "albert": '615 411 652',
    "jordi": '620 27 25 20'
  }
}

export const RRSS = [
  // { platform: "twitter", url: "https://twitter.com/ciafiligranes" },
  { platform: "instagram", url: "https://www.instagram.com/cia.filigranes/" },
  { platform: "facebook", url: "https://www.facebook.com/Cia-Filigranes-204888372926384/" },
  { platform: "youtube", url: "https://www.youtube.com/channel/UCaH3Bb7VIiuzwy51TyyKzpg" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/ciafiligranes" }
]

export const YOUTUBE_VIDEO_IDS = {
  vintAnys: 'TBbBS05njec',
  plisPlas: 'VOcQTqZ9C2A',
  circFilixic: 'rg3XzGQIPpU',
  freakFrac: 'dY4GelzNlRc',
  numeroCaixes: 'GQ67p38vqcY',
  circFilirates: 'lU5b5V7U6Wc',
  plisPlasAlt: 'D46T_hy1Mck',
} as const

export const YOUTUBE_PLAYLIST_IDS = [
  YOUTUBE_VIDEO_IDS.vintAnys,
  YOUTUBE_VIDEO_IDS.plisPlas,
  YOUTUBE_VIDEO_IDS.circFilixic,
  YOUTUBE_VIDEO_IDS.freakFrac,
  YOUTUBE_VIDEO_IDS.numeroCaixes,
  YOUTUBE_VIDEO_IDS.circFilirates,
  YOUTUBE_VIDEO_IDS.plisPlasAlt,
].join(',')

export const HEADER_MOBILE_HEIGHT = '72px'
export const HEADER_DESKTOP_HEIGHT = '87px'
export const HERO_COVER_ANIMATION_DURATION_MS = 800

export const EVENT_TYPE_COLORS: Record<
  Extract<ContentType, 'shows' | 'workshops' | 'performances'>,
  { text: string; bg: string; bgLight: string }
> = {
  shows: { text: 'text-primary-500', bg: 'bg-primary-500', bgLight: 'bg-primary-300' },
  workshops: { text: 'text-secondary-500', bg: 'bg-secondary-500', bgLight: 'bg-secondary-300' },
  performances: { text: 'text-tertiary-500', bg: 'bg-tertiary-500', bgLight: 'bg-tertiary-300' },
}

export const EVENT_TYPE_ITEMS: EventTypeItem[] = [
  {
    value: 'shows',
    labelKey: 'routes.espectacles',
    activeIndicatorClass: EVENT_TYPE_COLORS.shows.bg,
    inactiveIndicatorClass: EVENT_TYPE_COLORS.shows.bgLight,
  },
  {
    value: 'workshops',
    labelKey: 'routes.tallers',
    activeIndicatorClass: EVENT_TYPE_COLORS.workshops.bg,
    inactiveIndicatorClass: EVENT_TYPE_COLORS.workshops.bgLight,
  },
  {
    value: 'performances',
    labelKey: 'routes.animacions',
    activeIndicatorClass: EVENT_TYPE_COLORS.performances.bg,
    inactiveIndicatorClass: EVENT_TYPE_COLORS.performances.bgLight,
  },
]

export const COLLABORATION_ENTRIES = [
  {
    i18nKey: 'clownDePas',
    imageSlug: 'clown-de-pas',
    href: 'https://www.albertvinyes.cat/ca/espectacles/clown-de-pas/',
  },
  {
    i18nKey: 'vendaval',
    imageSlug: 'vendaval',
    href: 'https://www.youtube.com/watch?v=HpkRH-YxNXE&feature=youtu.be',
  },
  {
    i18nKey: 'fingerlight',
    imageSlug: 'fingerlight',
    href: 'https://improvistos.com/espectacles/espectacle-2/',
  },
  {
    i18nKey: 'heeelp',
    imageSlug: 'heeelp',
    href: 'https://improvistos.com/heeelp/',
  },
  {
    i18nKey: 'circFilikrusty',
    imageSlug: 'circ-filikrusty',
    href: 'https://improvistos.com/espectacles/espectacle-1/',
  },
  {
    i18nKey: 'totEsPossible',
    imageSlug: 'tot-es-possible',
    href: 'https://improvistos.com/tot-es-possible/',
  },
] as const

/**
 * Hash navigations that scroll deep into the page — must not trigger the
 * "first scroll" fallback to #main-content-anchor.
 */
export const IN_PAGE_ANCHOR_HASHES = new Set([
  '#agenda',
  '#video',
  // Collaborations page anchors (CalendarTrends -> "Més info")
  '#vendaval',
  '#heeelp',
  '#fingerlight',
  '#clown-de-pas',
  '#circ-filikrusty',
  '#tot-es-possible',
])
