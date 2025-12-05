import { Link } from 'react-router-dom'
import styles from './StudioCard.module.scss'

export default function StudioCardLarge({
  image,
  slug,
  title,
  price,
  desc,
  isHotTopic = false,
}) {
  const hasImage = slug && image
  const imagePath = hasImage
    ? new URL(
        `../../../assets/studios/${slug}/${image}`,
        import.meta.url
      ).href
    : ''

  return (
    <Link to={`/studios/${slug}`} className={styles.cardLink}>
      <article className={styles.card}>
        {isHotTopic && <span className={styles.hotTopic}>🔥 Топ</span>}

        <div className={styles.imageWrapper}>
          {hasImage ? (
            <img src={imagePath} alt={title} loading="lazy" />
          ) : (
            <div className={styles.imagePlaceholder}>Фото буде додано</div>
          )}
        </div>

        <div className={styles.cardInfo}>
          <h3 className={styles.cardTitle}>{title}</h3>

          <p className={styles.cardDesc}>{desc}</p>

          <p className={styles.cardPrice}>${price} / годину</p>
        </div>

        <span className={styles.cardCta}>Переглянути →</span>
      </article>
    </Link>
  )
}
