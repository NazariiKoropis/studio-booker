import { useEffect, useState } from 'react'
import styles from './Studios.module.scss'

import Hero from '../../components/studios/hero/Hero'
import StudiosFilter from '../../components/studios/studiosFilter/StudiosFilter'
import StudiosList from '../../components/studios/studiosList/StudiosList'
import Container from '../../components/common/container/Container'

import { getAllStudios } from '../../services/studiosService'

export default function Studios() {
  const [studios, setStudios] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStudios() {
      try {
        const all = await getAllStudios()

        const normalized = all.map((s) => ({
          id: s.id,
          img: s.images?.[0],
          slug: s.slug,
          title: s.name,
          price: s.pricePerHour,
          desc: s.description,
          isHotTopic: s.isHotTopic,
          location: s.locationCity,
          capacity: s.capacity,
        }))

        setStudios(normalized)
        setFilteredData(normalized)
      } catch (error) {
        console.error('Помилка завантаження студій:', error)
      } finally {
        setLoading(false)
      }
    }

    loadStudios()
  }, [])

  const applyFilters = (criteria) => {
    const { name, location, capacities, hotOnly, priceRange } = criteria

    let filtered = studios

    if (name.trim()) {
      filtered = filtered.filter((s) =>
        s.title.toLowerCase().includes(name.toLowerCase())
      )
    }

    if (location) {
      filtered = filtered.filter((s) => s.location === location)
    }

    if (capacities.length) {
      filtered = filtered.filter((s) => capacities.includes(s.capacity))
    }

    if (hotOnly) {
      filtered = filtered.filter((s) => s.isHotTopic)
    }

    filtered = filtered.filter(
      (s) => s.price >= priceRange.min && s.price <= priceRange.max
    )

    setFilteredData(filtered)
  }

  return (
    <div className={styles.studios}>
      <Hero />

      <section className={styles.content}>
        <Container className={styles.inner}>
          <div className={styles.layout}>
            <StudiosFilter onApply={applyFilters} />

            {loading ? (
              <p className={styles.loading}>Завантаження студій...</p>
            ) : (
              <StudiosList data={filteredData} />
            )}
          </div>
        </Container>
      </section>
    </div>
  )
}
