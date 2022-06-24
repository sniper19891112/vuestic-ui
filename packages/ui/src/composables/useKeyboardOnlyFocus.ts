import { ref } from 'vue'

export default function useKeyboardOnlyFocus () {
  const hasKeyboardFocus = ref(false)
  let previouslyClicked = false

  const keyboardFocusListeners = {
    mousedown: () => {
      previouslyClicked = true
    },

    focus: () => {
      if (!previouslyClicked) {
        hasKeyboardFocus.value = true
      }

      previouslyClicked = false
    },

    blur: () => {
      hasKeyboardFocus.value = false
      previouslyClicked = false
    },
  }

  return {
    hasKeyboardFocus,
    keyboardFocusListeners,
  }
}
