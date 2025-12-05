import styles from './StudiosList.module.scss'
import StudioCard from '../../cards/studio/StudioCard'

export default function StudiosList({ data }) {
  if (!data || data.length === 0) {
    return (
      <section className={styles.empty}>
        <p>Студій не знайдено</p>
      </section>
    )
  }

  return (
    <section className={styles.studiosList}>
      {data.map(({ img, slug, title, price, desc, isHotTopic }) => (
        <StudioCard
          key={slug}
          image={img}
          slug={slug}
          title={title}
          price={price}
          desc={desc}
          isHotTopic={isHotTopic}
        />
      ))}
    </section>
  )
}
