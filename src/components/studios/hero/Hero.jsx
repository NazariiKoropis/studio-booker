import styles from './Hero.module.scss'
import Container from '../../common/container/Container'
export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <h1 className={styles.title}>Наші фотостудії</h1>
        <p className={styles.subtitle}>
          {' '}
          Оберіть студію, яка підходить саме під ваш стиль і зйомку.
        </p>
      </Container>
    </section>
  )
}
