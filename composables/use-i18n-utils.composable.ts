const { $i18n } = useNuxtApp();
const t = $i18n.t;

/**
 * Transforms a key and a path in translated string.
 * 
 * @param item - The key to get translated.
 * @param rootPath - The root path in the translations tree.
 *  @returns A translated string.
 */
export const getLocale = (item: string, rootPath: string): string => {
  return t(`${rootPath}.${item}`);
}