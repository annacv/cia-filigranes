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

  mobileDescarreguesImages: import.meta.glob('~/assets/images/mobile/descarregues/*.webp', {
    eager: false,
    import: 'default',
  }) as Record<string, () => Promise<string>>,

  desktopDescarreguesImages: import.meta.glob('~/assets/images/desktop/descarregues/*.webp', {
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
}
