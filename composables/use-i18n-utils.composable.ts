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
  const getTranslatedList = (keyPath: string, keys: string[]) => {
    const rawItems = (tm(keyPath))
    if (!Array.isArray(rawItems)) return []
    return rawItems.map((item: Record<string, any>) => {
      const translatedItem: Record<string, any> = {}
      for (const key of keys) {
        translatedItem[key] = item[key] ? rt(item[key]) : ''
      }
      return translatedItem
    })
  }

  return {
    getLocale,
    getTranslatedList
  }
};
