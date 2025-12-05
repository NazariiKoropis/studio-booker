import styles from './StudioFeatures.module.scss'
import Container from '../../common/container/Container'

export default function StudioFeatures({ studio }) {
  if (!studio) return null

  const features = [
    {
      label: 'Ціна за годину',
      value: studio.pricePerHour ? `${studio.pricePerHour} грн` : '—',
    },
    {
      label: 'Вмістимість',
      value: studio.capacity ? `${studio.capacity} осіб` : '—',
    },
    { label: 'Телефон', value: studio.phone || '—' },
    { label: 'Email', value: studio.email || '—' },
    {
      label: 'Адреса',
      value:
        studio.location ||
        [studio.locationCity, studio.locationAddress]
          .filter(Boolean)
          .join(', ') ||
        '—',
    },
  ]

  return (
    <section className={styles.features}>
      <Container>
        <h2 className={styles.title}>Характеристики студії</h2>

        <div className={styles.list}>
          {features.map((f, idx) => (
            <div key={idx} className={styles.item}>
              <span className={styles.label}>{f.label}</span>
              <span className={styles.value}>{f.value}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
