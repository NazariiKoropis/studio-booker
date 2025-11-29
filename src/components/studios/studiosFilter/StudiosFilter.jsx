import styles from './StudiosFilter.module.scss'
import Container from '../../common/container/Container'
import Input from '../../ui/input/Input'
import ComboBox from '../../ui/comboBox/ComboBox'
import RangeControl from '../../ui/rangeControl/RangeControl'
import Button from '../../ui/button/Button'

import { useState } from 'react'

export default function StudiosFilter({ onApply }) {
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [capacitiesSelected, setCapacitiesSelected] = useState([])
  const [hotOnly, setHotOnly] = useState(false)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 9999 })

  const locations = [
    { value: 'lviv', label: 'Львів' },
    { value: 'kyiv', label: 'Київ' },
    { value: 'odesa', label: 'Одеса' },
  ]

  const capacities = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
  ]

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
    setPriceRange({ min: 0, max: 9999 })
  }

  const applyFilters = () => {
    if (onApply) {
      onApply({
        name,
        location,
        capacities: capacitiesSelected,
        hotOnly,
        priceRange,
      })
    }
  }

  return (
    <aside className={styles.studiosFilter}>
      <Container className={styles.inner}>
        <form>
          {/* ---- SEARCH ---- */}
          <Input
            label="Пошук"
            name="studiosName"
            type="text"
            placeholder="Назва студії"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />

          {/* ---- LOCATION ---- */}
          <ComboBox
            label="Локація студії"
            options={locations}
            value={location}
            onChange={setLocation}
            fullWidth
          />

          {/* ---- CAPACITY CHECKBOX GROUP ---- */}
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

          {/* ---- PRICE RANGE ---- */}
          <RangeControl min={0} max={9999} onChange={setPriceRange} />

          {/* ---- HOT STUDIOS ---- */}
          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={hotOnly}
              onChange={(e) => setHotOnly(e.target.checked)}
            />
            <span>HOT TOPIC</span>
          </label>

          {/* ---- BUTTONS ---- */}
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
        </form>
      </Container>
    </aside>
  )
}
