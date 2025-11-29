import { useState, useRef, useEffect } from 'react'
import styles from './ComboBox.module.scss'
import clsx from 'clsx'

export default function ComboBox({
  label,
  name,
  options = [],
  value,
  onChange,
  placeholder = 'Оберіть варіант',
  disabled = false,
  error = '',
  fullWidth = false,
  className = '',
}) {
  const [open, setOpen] = useState(false)

  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return (
    <div
      ref={ref}
      className={clsx(
        styles.wrapper,
        { [styles.fullWidth]: fullWidth },
        className
      )}
    >
      {label && <label className={styles.label}>{label}</label>}

      <div
        className={clsx(styles.select, {
          [styles.disabled]: disabled,
          [styles.errorInput]: error,
        })}
        onClick={() => !disabled && setOpen(!open)}
      >
        <span>
          {value ? options.find((o) => o.value === value)?.label : placeholder}
        </span>

        <div className={clsx(styles.arrow, { [styles.open]: open })}>▼</div>
      </div>

      {open && (
        <ul className={styles.options}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={clsx(styles.option, {
                [styles.selected]: opt.value === value,
              })}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  )
}
