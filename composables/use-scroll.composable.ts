import { ref, onMounted, onBeforeUnmount } from 'vue'

// Global scroll state
const isScrolled = ref(false)
const hasReachedBottom = ref(false)

let scrollListeners = 0

function onScroll() {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight

  isScrolled.value = scrollTop > 0
  hasReachedBottom.value = scrollTop + windowHeight >= documentHeight - 500
}

export function useScroll() {
  const addScrollListener = () => {
    if (scrollListeners === 0) {
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll() // Initial call
    }
    scrollListeners++
  }

  const removeScrollListener = () => {
    scrollListeners--
    if (scrollListeners === 0) {
      window.removeEventListener('scroll', onScroll)
    }
  }

  onMounted(() => {
    addScrollListener()
  })

  onBeforeUnmount(() => {
    removeScrollListener()
  })

  return {
    isScrolled: readonly(isScrolled),
    hasReachedBottom: readonly(hasReachedBottom)
  }
}
