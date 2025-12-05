import { useState, useEffect } from 'react'
import styles from './RangeControl.module.scss'
import clsx from 'clsx'

export default function RangeControl({ min, max, onChange }) {
  const [minPrice, setMinPrice] = useState(min)
  const [maxPrice, setMaxPrice] = useState(max)

  useEffect(() => {
    setMinPrice(min)
    setMaxPrice(max)
  }, [min, max])

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
  const clamp = (value) => Math.min(100, Math.max(0, value))

  useEffect(() => {
    if (onChange) {
      onChange({ min: minPrice, max: maxPrice })
    }
  }, [minPrice, maxPrice, onChange])

  return (
    <div className={styles.rangeControl}>
      <div className={styles.values}>
        <span>₴{minPrice}</span>
        <span>₴{maxPrice}</span>
      </div>

      <div className={styles.trackWrapper}>
        <div className={styles.track}></div>

        <div
          className={styles.activeTrack}
          style={{
            left: `${clamp(minPercent)}%`,
            right: `${clamp(100 - maxPercent)}%`,
          }}
        ></div>

        <input
          type="range"
          min={min}
          max={max}
          value={minPrice}
          onChange={onChangeLeft}
          className={clsx(styles.thumb, styles.thumbLeft)}
        />

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
