import styles from './Reviews.module.scss'
import Container from '../../common/container/Container'

export default function Reviews({ reviews }) {
  if (!reviews || !reviews.length) {
    return (
      <Container>
        <p className={styles.noReviews}>Відгуків ще немає.</p>
      </Container>
    )
  }

  return (
    <section className={styles.reviews}>
      <Container>
        <h2 className={styles.title}>Відгуки</h2>

        <div className={styles.list}>
          {reviews.map((r, idx) => (
            <div key={idx} className={styles.card}>
              <p className={styles.rating}>⭐ {r.rating}</p>
              <p className={styles.message}>{r.message}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
