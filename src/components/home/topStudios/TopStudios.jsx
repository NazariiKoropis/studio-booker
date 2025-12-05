import { useEffect, useState } from 'react'
import Container from '../../common/container/Container'
import styles from './TopStudios.module.scss'
import StudioCard from '../../cards/studio/StudioCard'
import { getAllStudios } from '../../../services/studiosService'

export default function TopStudios() {
  const [studios, setStudios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStudios() {
      try {
        const allStudios = await getAllStudios()

        const top = allStudios
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, 3)

        setStudios(top)
      } catch (error) {
        console.error('Помилка завантаження студій:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStudios()
  }, [])

  return (
    <section className={styles.topStudios}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Популярні студії</h2>

        {loading ? (
          <p className={styles.loading}>Завантаження...</p>
        ) : (
          <div className={styles.studiosGrid}>
            {studios.map(
              ({
                id,
                images,
                slug,
                name,
                pricePerHour,
                description,
                isHotTopic,
              }) => (
                <StudioCard
                  key={id}
                  image={images?.[0]}
                  slug={slug}
                  title={name}
                  price={pricePerHour}
                  desc={description}
                  isHotTopic={isHotTopic}
                />
              )
            )}
          </div>
        )}
      </Container>
    </section>
  )
}
