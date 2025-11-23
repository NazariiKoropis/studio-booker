import styles from './Benefits.module.scss'
import Container from '../../common/container/Container'
import Icon1 from './icons/icon1.svg'
import Icon2 from './icons/icon2.svg'
import Icon3 from './icons/icon3.svg'
import Icon4 from './icons/icon4.svg'

export default function Benefits() {
  const data = [
    {
      icon: Icon1,
      alt: 'Professional equipment',
      title: 'Професійне обладнання',
      text: 'Освітлення, фони, реквізит — все, що потрібно для зйомки.',
    },
    {
      icon: Icon2,
      alt: 'Easy booking',
      title: 'Просте бронювання',
      text: 'Обери студію, дату та час за кілька кліків.',
    },
    {
      icon: Icon3,
      alt: 'Affordable rates',
      title: 'Доступні тарифи',
      text: 'Фіксована погодинна оплата без прихованих платежів.',
    },
    {
      icon: Icon4,
      alt: 'Flexible working hours',
      title: 'Гнучкий графік роботи',
      text: 'Студії доступні з ранку до пізнього вечора.',
    },
  ]

  return (
    <section className={styles.benefits}>
      <Container className={styles.benefitsInner}>
        <div className={styles.benefitsGrid}>
          {data.map(({ icon, alt, title, text }, idx) => (
            <div key={idx} className={styles.card}>
              <img src={icon} alt={alt} className={styles.cardIcon} />
              <h3 className={styles.cardTitle}>{title}</h3>
              <p className={styles.cardText}>{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
