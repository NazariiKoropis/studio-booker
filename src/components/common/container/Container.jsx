import styles from './Container.module.scss'

export default function Container({ children, className }) {
  return (
    <div className={`${styles.container} ${className}`.trim()}>{children}</div>
  )
}
