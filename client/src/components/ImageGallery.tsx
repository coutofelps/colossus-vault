import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './ImageGallery.module.css'

interface Props {
  images: string[]
  autoInterval?: number
}

export default function ImageGallery({ images, autoInterval = 4000 }: Props) {
  const [current, setCurrent] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [paused, setPaused] = useState(false)
  const thumbsRef = useRef<HTMLDivElement>(null)

  const prev = useCallback(() =>
    setCurrent(c => (c - 1 + images.length) % images.length), [images.length])

  const next = useCallback(() =>
    setCurrent(c => (c + 1) % images.length), [images.length])

  const openLightbox  = useCallback(() => setLightbox(true),  [])
  const closeLightbox = useCallback(() => setLightbox(false), [])

  // Auto-slide (pausa no lightbox e no hover)
  useEffect(() => {
    if (lightbox || paused || images.length <= 1) return
    const id = setInterval(next, autoInterval)
    return () => clearInterval(id)
  }, [lightbox, paused, next, autoInterval, images.length])

  // Scroll thumbnail ativo para visível
  useEffect(() => {
    const el = thumbsRef.current?.children[current] as HTMLElement | undefined
    el?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' })
  }, [current])

  // Teclado global
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')            { prev(); return }
      if (e.key === 'ArrowRight')           { next(); return }
      if (e.key === 'f' || e.key === 'F')  { setLightbox(l => !l); return }
      if (e.key === 'Escape')              { closeLightbox() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, closeLightbox])

  // Scroll-lock quando lightbox aberto (usa dataset para não conflitar com Navbar)
  useEffect(() => {
    if (lightbox) {
      document.documentElement.dataset.scrollLockGallery = '1'
    } else {
      delete document.documentElement.dataset.scrollLockGallery
    }
    return () => { delete document.documentElement.dataset.scrollLockGallery }
  }, [lightbox])

  return (
    <div
      className={styles.gallery}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Imagem principal */}
      <div className={styles.mainWrap} onClick={openLightbox} title="Clique para ampliar">
        <img
          key={images[current]}
          src={images[current]}
          alt={`Foto ${current + 1}`}
          className={styles.mainImg}
          draggable={false}
        />
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Foto anterior"
            >‹</button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Próxima foto"
            >›</button>
          </>
        )}
        <span className={styles.counter}>{current + 1} / {images.length}</span>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className={styles.thumbs} ref={thumbsRef}>
          {images.map((src, i) => (
            <button
              key={src}
              className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Foto ${i + 1}`}
            >
              <img src={src} alt="" draggable={false} />
            </button>
          ))}
        </div>
      )}

      {/* Legenda */}
      <p className={styles.legend}>← → navegar · F tela cheia</p>

      {/* Lightbox */}
      {lightbox && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <img
              key={`lb-${images[current]}`}
              src={images[current]}
              alt={`Foto ${current + 1}`}
              className={styles.lightboxImg}
              draggable={false}
            />
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Fechar">✕</button>
            {images.length > 1 && (
              <>
                <button
                  className={`${styles.lightboxArrow} ${styles.lightboxArrowLeft}`}
                  onClick={prev}
                  aria-label="Foto anterior"
                >‹</button>
                <button
                  className={`${styles.lightboxArrow} ${styles.lightboxArrowRight}`}
                  onClick={next}
                  aria-label="Próxima foto"
                >›</button>
              </>
            )}
            <span className={styles.lightboxCounter}>{current + 1} / {images.length}</span>
          </div>
        </div>
      )}
    </div>
  )
}
