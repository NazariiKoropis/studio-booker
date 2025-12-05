import styles from './Stats.module.scss'
import Container from '../../common/container/Container'

export default function Stats() {
  const stats = [
    { value: '15+', label: 'Фотостудій у каталозі' },
    { value: '500+', label: 'Успішних бронювань' },
    { value: '4.8', label: 'Середній рейтинг студій' },
    { value: '200+', label: 'Клієнтів щомісяця' },
  ]

  return (
    <section className={styles.stats}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Факти про StudioBooker</h2>

        <div className={styles.grid}>
          {stats.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <p className={styles.value}>{item.value}</p>
              <p className={styles.label}>{item.label}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
