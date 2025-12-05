import styles from './Gallery.module.scss'

export default function Gallery({ images = [] }) {
  if (!images.length) return null

  return (
    <section className={styles.gallery}>
      <div className={styles.grid}>
        {/* Головне фото */}
        <div className={styles.main}>
          <img src={images[0]} alt="main studio" loading="lazy" />
        </div>

        {/* Інші фото */}
        <div className={styles.side}>
          {images.slice(1).map((img, idx) => (
            <img key={idx} src={img} alt={`studio-${idx}`} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  )
}
