import { ref, readonly } from 'vue'

const headerBackgroundColor = ref('transparent')

export const useHeader = () => {
  const setHeaderBackgroundColor = (color: string) => {
    const colorMap: Record<string, string> = {
      'bg-transparent': 'transparent',
      'bg-black': '#000',
      'bg-white': '#fff',
      'bg-primary-500': '#c80d0d'
    }
    
    headerBackgroundColor.value = colorMap[color] || color
  }

  const resetHeaderColor = () => {
    headerBackgroundColor.value = 'transparent'
  }

  return {
    headerBackgroundColor: readonly(headerBackgroundColor),
    setHeaderBackgroundColor,
    resetHeaderColor
  }
}
