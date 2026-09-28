import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// jsdom no implementa el desplazamiento de la ventana.
window.scrollTo = () => {}

afterEach(() => {
  cleanup()
  window.localStorage.clear()
})
