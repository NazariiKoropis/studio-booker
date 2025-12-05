import Container from '../../common/container/Container'
import Button from '../../ui/button/Button'
import styles from './Hero.module.scss'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.heroContainer}>
        <h1 className={styles.heroTitle}>
          Професійні фотостудії для фото та відео зйомок
        </h1>
        <p className={styles.heroSubtitle}>
          Знаходь і бронюй професійні студії для фото та відео зйомок у кілька
          кліків.
        </p>
        <Button
          variant="outline--light"
          onClick={() => alert('Сторінка студій готується')}
        >
          Забронювати студію
        </Button>
      </Container>
    </section>
  )
}
