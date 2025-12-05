import styles from './StudioInfo.module.scss'
import Container from '../../common/container/Container'

export default function StudioInfo({ studio }) {
  if (!studio) return null

  return (
    <section className={styles.info}>
      <Container>
        <div className={styles.header}>
          <h1 className={styles.title}>{studio.name}</h1>

          {studio.isHotTopic && <span className={styles.hot}>HOT</span>}
        </div>

        <p className={styles.location}>
          {studio.location ||
            [studio.locationCity, studio.locationAddress]
              .filter(Boolean)
              .join(', ')}
        </p>

        <div className={styles.rating}>⭐ {studio.rating || 0}</div>

        <p className={styles.desc}>{studio.description}</p>
      </Container>
    </section>
  )
}
