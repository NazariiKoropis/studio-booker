import styles from './CallToAction.module.scss'
import Container from '../../common/container/Container'
import Button from '../../ui/button/Button'
import { useNavigate } from 'react-router-dom'

export default function CallToAction() {
  const navigate = useNavigate()

  return (
    <section className={styles.CallToAction}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Забронюй професійну фотостудію зараз</h2>
        <p className={styles.subtitle}>
          Сучасні інтер’єри, професійне світло, просте бронювання.
        </p>

        <Button
          variant="outline"
          fullWidth
          onClick={() => navigate('/studios')}
        >
          Переглянути студії
        </Button>
      </Container>
    </section>
  )
}
