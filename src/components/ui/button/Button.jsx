import styles from './Button.module.scss'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) {
  const classNames = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth ? styles[`button--full`] : ``,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classNames} {...props}>
      {children}
    </button>
  )
}
