import { useState } from 'react'
import placeholder from './assets/plant-placeholder.svg'

/**
 * Imagen de producto con carga diferida y una ilustración local de respaldo
 * si la URL externa no responde, para no mostrar nunca un icono roto.
 */
function PlantImage({ src, alt, className, width = 400, height = 300 }) {
  const [failedSrc, setFailedSrc] = useState(null)
  const showFallback = !src || failedSrc === src

  return (
    <img
      src={showFallback ? placeholder : src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (!showFallback) setFailedSrc(src)
      }}
    />
  )
}

export default PlantImage
