import styles from './Mission.module.scss'
import Container from '../../common/container/Container'

export default function Mission() {
  return (
    <section className={styles.mission}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Наша місія</h2>

        <p className={styles.text}>
          Ми створили StudioBooker для того, щоб фотографи, моделі, команди та
          контент-креатори могли знаходити ідеальні фотостудії швидко, зручно та
          без зайвих складнощів.
        </p>

        <p className={styles.text}>
          Жодних хаотичних переписок, десятків дзвінків чи пошуку інформації по
          різних сайтах — у нас усе зібрано в одному місці: ціни, фото,
          доступність, локація, відгуки та можливість забронювати студію у
          кілька кліків.
        </p>

        <p className={styles.text}>
          Ми прагнемо зробити процес бронювання максимально простим, прозорим і
          сучасним, щоб кожен міг зосередитися на творчості, а не на
          організації.
        </p>
      </Container>
    </section>
  )
}
