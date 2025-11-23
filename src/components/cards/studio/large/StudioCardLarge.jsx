import styles from './StudioCardLarge.module.scss'
import Button from '../../../ui/button/Button'

export default function StudioCard({
  image,
  title,
  price,
  desc,
  isHotTopic = false,
  onClick,
}) {
  return (
    <article className={styles.card} onClick={onClick}>
      {isHotTopic && <span className={styles.hotTopic}>🔥 Hot</span>}

      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.cardInfo}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{desc}</p>
        <p className={styles.cardPrice}>${price}.00</p>
      </div>

      <Button size="sm" fullWidth>
        Переглянути
      </Button>
    </article>
  )
}
