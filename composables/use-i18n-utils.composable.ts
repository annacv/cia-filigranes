export const useI18nUtils = () => {
  const { t, tm, rt } = useI18n()

  /**
   * Transforms a key and a path into a translated string.
   *
   * @param item - The key to get translated.
   * @param rootPath - The root path in the translation tree.
   * @returns A translated string.
   */
  const getLocale = (item: string, rootPath: string): string => {
    return t(`${rootPath}.${item}`)
  }

  /**
   * Translates a list of items from a given key path using specified keys.
   *
   * @param keyPath - The path in the translation tree to fetch the list.
   * @param keys - The keys to translate for each item in the list.
   * @returns An array of translated items.
   */
  const getTranslatedList = <T extends Record<string, unknown>>(keyPath: string, keys: (keyof T)[]): Array<Partial<T>> => {
    const rawItems = tm(keyPath)
    if (!Array.isArray(rawItems)) return []
    return rawItems.map((item: T) => {
      const translatedItem: Partial<T> = {}
      for (const key of keys) {
        const value = item[key]
        if (typeof value === 'string') {
          translatedItem[key] = rt(value) as T[keyof T]
        } else {
          translatedItem[key] = '' as T[keyof T]
        }
      }
      return translatedItem
    })
  }

  return {
    getLocale,
    getTranslatedList
  }
};
