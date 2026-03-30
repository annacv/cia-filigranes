/**
 * Composable for formatting calendar event dates.
 * Handles both all-day events and timed events with proper localization.
 */
export const useDateFormat = () => {
  const { locale } = useI18n()

  const getIntlLocale = (): string => {
    const localeMap: Record<string, string> = {
      ca: 'ca-ES',
      es: 'es-ES',
      en: 'en-GB'
    }
    return localeMap[locale.value] || 'ca-ES'
  }

  const formatEventTime = (dateString: string): string => {
    const date = new Date(dateString)
    const hours = date.getHours()
    const minutes = date.getMinutes()

    // Display hours without leading zero (e.g. "8" instead of "08")
    const hoursStr = hours.toString()

    let baseTime: string
    if (minutes === 0) {
      baseTime = hoursStr
    } else {
      const minutesStr = minutes.toString().padStart(2, '0')
      baseTime = `${hoursStr}:${minutesStr}`
    }
    return `${baseTime}h`
  }
  
  const getScheduleParts = (dateString: string) => {
    const intlLocale = getIntlLocale()
    const date = new Date(dateString)

    const month = date.toLocaleDateString(intlLocale, {
      month: 'short'
    }).slice(0, 3)

    const day = date.getDate().toString()
    const year = date.getFullYear().toString()

    return { month, day, year }
  }

  return {
    getScheduleParts,
    formatEventTime
  }
}
