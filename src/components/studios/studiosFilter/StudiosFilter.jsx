import styles from './StudiosFilter.module.scss'
import Container from '../../common/container/Container'
import Input from '../../ui/input/Input'
import ComboBox from '../../ui/comboBox/ComboBox'
import RangeControl from '../../ui/rangeControl/RangeControl'
import Button from '../../ui/button/Button'

import { useState, useEffect } from 'react'
import { getAllStudios } from '../../../services/studiosService'

export default function StudiosFilter({ onApply }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [capacitiesSelected, setCapacitiesSelected] = useState([])
  const [hotOnly, setHotOnly] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 })

  const [locations, setLocations] = useState([])
  const [capacities, setCapacities] = useState([])
  const [priceLimits, setPriceLimits] = useState({ min: 0, max: 9999 })

  useEffect(() => {
    async function loadFilterData() {
      const studios = await getAllStudios()

      const uniqueCities = [...new Set(studios.map((s) => s.locationCity))].map(
        (city) => ({
          value: city,
          label: city.charAt(0).toUpperCase() + city.slice(1),
        })
      )
      setLocations(uniqueCities)

      const uniqueCaps = [...new Set(studios.map((s) => s.capacity))].sort(
        (a, b) => a - b
      )
      const capObjects = uniqueCaps.map((c) => ({ value: c, label: `${c}` }))
      setCapacities(capObjects)

      const prices = studios.map((s) => s.pricePerHour)
      const minPrice = Math.min(...prices)
      const maxPrice = Math.max(...prices)

      setPriceLimits({ min: minPrice, max: maxPrice })
      setPriceRange({ min: minPrice, max: maxPrice })
    }

    loadFilterData()
  }, [])

  const toggleCapacity = (value) => {
    setCapacitiesSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const resetFilters = () => {
    setName('')
    setLocation('')
    setCapacitiesSelected([])
    setHotOnly(false)
    setPriceRange(priceLimits)

    onApply &&
      onApply({
        name: '',
        location: '',
        capacities: [],
        hotOnly: false,
        priceRange: priceLimits,
      })
  }

  const applyFilters = () => {
    onApply &&
      onApply({
        name,
        location,
        capacities: capacitiesSelected,
        hotOnly,
        priceRange,
      })
  }

  return (
    <aside className={styles.studiosFilter}>
      <Container className={styles.inner}>
        <Input
          label="Пошук"
          name="studiosName"
          type="text"
          placeholder="Назва студії"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <ComboBox
          label="Локація студії"
          options={locations}
          value={location}
          onChange={setLocation}
          fullWidth
        />

        <div className={styles.checkboxGroup}>
          <p className={styles.checkboxGroupTitle}>Вмістимість студії</p>

          {capacities.map((cap) => (
            <label key={cap.value} className={styles.checkbox}>
              <input
                type="checkbox"
                checked={capacitiesSelected.includes(cap.value)}
                onChange={() => toggleCapacity(cap.value)}
              />
              <span>{cap.label}</span>
            </label>
          ))}
        </div>

        <RangeControl
          min={priceLimits.min}
          max={priceLimits.max}
          onChange={setPriceRange}
        />

        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={hotOnly}
            onChange={(e) => setHotOnly(e.target.checked)}
          />
          <span>Лише гарячі пропозиції</span>
        </label>

        <div className={styles.buttons}>
          <Button
            variant="primary"
            size="md"
            type="button"
            onClick={applyFilters}
            fullWidth
          >
            Застосувати
          </Button>

          <Button
            variant="dark"
            size="md"
            type="button"
            onClick={resetFilters}
            fullWidth
          >
            Скинути
          </Button>
        </div>
      </Container>
    </aside>
  )
}
