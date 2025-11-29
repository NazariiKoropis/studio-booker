import { useState, useEffect } from 'react'
import styles from './RangeControl.module.scss'
import clsx from 'clsx'

export default function RangeControl({ min, max, onChange }) {
  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)

  const onChangeLeft = (e) => {
    const newValue = Number(e.target.value)
    if (newValue < maxPrice) setMinPrice(newValue)
  }

  const onChangeRight = (e) => {
    const newValue = Number(e.target.value)
    if (newValue > minPrice) setMaxPrice(newValue)
  }

  const minPercent = ((minPrice - min) / (max - min)) * 100
  const maxPercent = ((maxPrice - min) / (max - min)) * 100

  useEffect(() => {
    if (onChange) {
      onChange({ min: minPrice, max: maxPrice })
    }
  }, [minPrice, maxPrice])

  return (
    <div className={styles.rangeControl}>
      {/* Показ значень */}
      <div className={styles.values}>
        <span>Min: {minPrice}</span>
        <span>Max: {maxPrice}</span>
      </div>

      {/* Контейнер з треком */}
      <div className={styles.trackWrapper}>
        {/* Лінія треку */}
        <div className={styles.track}></div>

        {/* Активний сегмент */}
        <div
          className={styles.activeTrack}
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Ліва ручка */}
        <input
          type="range"
          min={min}
          max={max}
          value={minPrice}
          onChange={onChangeLeft}
          className={clsx(styles.thumb, styles.thumbLeft)}
        />

        {/* Права ручка */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxPrice}
          onChange={onChangeRight}
          className={clsx(styles.thumb, styles.thumbRight)}
        />
      </div>
    </div>
  )
}
