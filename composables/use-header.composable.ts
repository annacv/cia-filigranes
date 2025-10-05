import { ref, readonly } from 'vue'

const headerBackgroundColor = ref('bg-transparent')

export const useHeader = () => {
  const setHeaderBackgroundColor = (color: string) => {
    headerBackgroundColor.value = color
  }

  const resetHeaderColor = () => {
    headerBackgroundColor.value = 'bg-transparent'
  }

  return {
    headerBackgroundColor: readonly(headerBackgroundColor),
    setHeaderBackgroundColor,
    resetHeaderColor
  }
}
