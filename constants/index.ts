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
    name: "filipersones",
    children: ['trinxeta', 'makutu']
  },
  {
    name: "contacte"
  }
]

export const LOCALE_ROUTES = {
  espectacles: {
    ca: '/espectacles',
    en: '/shows',
    es: '/espectaculos'
  },
  'espectacles/vint-anys': {
    ca: '/espectacles/vint-anys',
    en: '/shows/twenty-years',
    es: '/espectaculos/vint-anys'
  },
  'espectacles/circ-filixic': {
    ca: '/espectacles/circ-filixic',
    en: '/shows/filixic-circus',
    es: '/espectaculos/circo-filixic'
  },
  'espectacles/plis-plas': {
    ca: '/espectacles/plis-plas',
    en: '/shows/plis-plas',
    es: '/espectaculos/plis-plas'
  },
  'espectacles/freak-frac': {
    ca: '/espectacles/freak-frac',
    en: '/shows/freak-frac',
    es: '/espectaculos/freak-frac'
  },
  'espectacles/circ-makutu': {
    ca: '/espectacles/circ-makutu',
    en: '/shows/makutu-circus',
    es: '/espectaculos/circo-makutu'
  },
  'espectacles/circ-trinxeta': {
    ca: '/espectacles/circ-trinxeta',
    en: '/shows/trinxeta-circus',
    es: '/espectaculos/circo-trinxeta'
  },
  tallers: {
    ca: '/tallers',
    en: '/workshops',
    es: '/talleres'
  },
  'tallers/bombolles-sabo': {
    ca: '/tallers/bombolles-sabo',
    en: '/workshops/soap-bubbles',
    es: '/talleres/burbujas-jabon'
  },
  'tallers/circ': {
    ca: '/tallers/circ',
    en: '/workshops/circus',
    es: '/talleres/circo'
  },
  'tallers/pallassos': {
    ca: '/tallers/pallassos',
    en: '/workshops/clowns',
    es: '/talleres/payasos'
  },
  'tallers/maquillatge': {
    ca: '/tallers/maquillatge',
    en: '/workshops/makeup',
    es: '/talleres/maquillaje'
  },
  'tallers/enginys-aigua': {
    ca: '/tallers/enginys-aigua',
    en: '/workshops/water-tricks',
    es: '/talleres/ingenios-agua'
  },
  animacions: {
    ca: '/animacions',
    en: '/performances',
    es: '/animaciones'
  },
  filipersones: {
    ca: '/filipersones',
    en: '/about-us',
    es: '/filipersonas'
  },
  'filipersones/makutu': {
    ca: '/filipersones/makutu',
    en: '/about/makutu',
    es: '/filipersonas/makutu'
  },
  'filipersones/trinxeta': {
    ca: '/filipersones/trinxeta',
    en: '/about/trinxeta',
    es: '/filipersonas/trinxeta'
  },
  contacte: {
    ca: '/contacte',
    en: '/contact',
    es: '/contacto'
  }
}

export const GLOB_IMPORTS = {
  mobileShowImages: import.meta.glob('~/assets/images/mobile/espectacles/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  desktopShowImages: import.meta.glob('~/assets/images/desktop/espectacles/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  mobileTallerImages: import.meta.glob('~/assets/images/mobile/tallers/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  desktopTallerImages: import.meta.glob('~/assets/images/desktop/tallers/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  mobileAnimacionsImages: import.meta.glob('~/assets/images/mobile/animacions/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  desktopAnimacionsImages: import.meta.glob('~/assets/images/desktop/animacions/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  mobileContacteImages: import.meta.glob('~/assets/images/mobile/contacte/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  desktopContacteImages: import.meta.glob('~/assets/images/desktop/contacte/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  mobileFilipersonesImages: import.meta.glob('~/assets/images/mobile/filipersones/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  desktopFilipersonesImages: import.meta.glob('~/assets/images/desktop/filipersones/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  mobileImages: import.meta.glob('~/assets/images/mobile/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>,

  desktopImages: import.meta.glob('~/assets/images/desktop/*.webp', {
    eager: true,
    import: 'default',
  }) as Record<string, string>
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
