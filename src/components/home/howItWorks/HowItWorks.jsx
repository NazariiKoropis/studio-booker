import styles from './HowItWorks.module.scss'
import Container from '../../common/container/Container'
export default function HowItWorks() {
  const steps = [
    {
      index: 1,
      title: 'Обери студію',
      text: 'Переглянь доступні фотостудії та вибери найкращу для зйомки.',
    },
    {
      index: 2,
      title: 'Вкажи дату та час',
      text: 'Оберіть день, тривалість та кількість учасників.',
    },
    {
      index: 3,
      title: 'Підтверди бронювання',
      text: 'Залиши свої дані та отримай підтвердження бронювання.',
    },
    {
      index: 4,
      title: 'Приходь на зйомку',
      text: 'Студія буде підготовлена до твого приходу.',
    },
  ]

  return (
    <section className={styles.howItWorks}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Як це працює?</h2>

        <p className={styles.subtitle}>
          Бронювання фотостудії займає всього кілька хвилин. Обери локацію, час
          зйомки та підтверди бронювання — усе просто, швидко й зручно.
        </p>

        <div className={styles.steps}>
          {steps.map(({ index, title, text }) => (
            <div key={index} className={styles.item}>
              <div className={styles.index}>{index}</div>
              <h3 className={styles.itemTitle}>{title}</h3>
              <p className={styles.itemText}>{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
