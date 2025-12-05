import styles from './Input.module.scss'
import clsx from 'clsx'

export default function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  disabled = false,
  error = '',
  fullWidth = false,
  className = '',
  ...rest
}) {
  return (
    <div
      className={clsx(
        styles.wrapper,
        { [styles.fullWidth]: fullWidth },
        className
      )}
    >
      {label && (
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={clsx(styles.input, { [styles.errorInput]: error })}
        {...rest}
      />
    </div>
  )
}
