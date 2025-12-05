import styles from './Hero.module.scss'
import Container from '../../common/container/Container'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>
          Ми робимо бронювання фотостудій простим
        </h2>
        <p className={styles.subtitle}>
          StudioBooker — це онлайн-платформа для швидкого пошуку, перегляду та
          бронювання професійних фотостудій у кілька кліків.
        </p>
      </Container>
    </section>
  )
}
