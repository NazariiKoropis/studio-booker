import styles from './StudioCard.module.scss'
import Button from '../../ui/button/Button'

export default function StudioCardLarge({
  image,
  imageFolder,
  slug,
  title,
  price,
  desc,
  isHotTopic = false,
  onClick,
}) {
  const baseFolder = imageFolder || slug
  const imagePath = new URL(
    `../../../assets/studios/${baseFolder}/${image}`,
    import.meta.url
  ).href

  return (
    <article className={styles.card} onClick={onClick}>
      {isHotTopic && <span className={styles.hotTopic}>🔥 Hot</span>}

      <div className={styles.imageWrapper}>
        <img src={imagePath} alt={title} />
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>

        <p className={styles.cardDesc}>{desc}</p>

        <p className={styles.cardPrice}>${price}.00 / Годину</p>
      </div>

      <Button size="sm" fullWidth>
        Переглянути
      </Button>
    </article>
  )
}
