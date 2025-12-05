import styles from './Studios.module.scss'
import Hero from '../../components/studios/hero/Hero'
import StudiosFilter from '../../components/studios/studiosFilter/StudiosFilter'
import StudiosList from '../../components/studios/studiosList/StudiosList'
import Container from '../../components/common/container/Container'
import { useState } from 'react'

export default function Studios() {
  const data = [
    {
      img: '1.jpg',
      slug: 'moon-studio-1',
      title: 'Moon Studio1',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: true,
      location: 'lviv',
      capacity: 3,
    },
    {
      img: '2.jpg',
      slug: 'moon-studio-2',
      title: 'Moon Studio2',
      price: 200,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
      location: 'kyiv',
      capacity: 5,
    },
    {
      img: '3.jpg',
      slug: 'moon-studio-3',
      title: 'Moon Studio3',
      price: 350,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
      location: 'odesa',
      capacity: 2,
    },
    {
      img: '1.jpg',
      slug: 'moon-studio-4',
      title: 'Moon Studio4',
      price: 150,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
      location: 'lviv',
      capacity: 8,
    },
  ]

  const [filteredData, setFilteredData] = useState(data)

  const applyFilters = (criteria) => {
    const { name, location, capacities, hotOnly, priceRange } = criteria

    let filtered = data

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
            {/* Передаємо applyFilters вниз */}
            <StudiosFilter onApply={applyFilters} />

            {/* Тепер StudiosList отримує filteredData */}
            <StudiosList data={filteredData} />
          </div>
        </Container>
      </section>
    </div>
  )
}
