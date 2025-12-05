import styles from './WhyUs.module.scss'
import Container from '../../common/container/Container'

import iconFast from '../../../assets/about/fast.svg'
import iconVerified from '../../../assets/about/verified.svg'
import iconFilters from '../../../assets/about/filters.svg'
import iconPrices from '../../../assets/about/prices.svg'
import iconReviews from '../../../assets/about/reviews.svg'
import iconSupport from '../../../assets/about/support.svg'

export default function WhyUs() {
  const items = [
    {
      icon: iconFast,
      title: 'Швидке бронювання',
      desc: 'Бронюйте фотостудію за кілька кліків — без дзвінків і зайвих переписок.',
    },
    {
      icon: iconVerified,
      title: 'Перевірені студії',
      desc: 'Усі студії мають реальні фото, опис та підтверджену інформацію.',
    },
    {
      icon: iconFilters,
      title: 'Зручні фільтри',
      desc: 'Обирайте студії за локацією, ціною, вмістимістю та типом зйомки.',
    },
    {
      icon: iconPrices,
      title: 'Доступні ціни',
      desc: 'Відображаємо прозору вартість за годину без прихованих платежів.',
    },
    {
      icon: iconReviews,
      title: 'Реальні відгуки',
      desc: 'Клієнти залишають чесні оцінки та коментарі після зйомок.',
    },
    {
      icon: iconSupport,
      title: 'Підтримка 24/7',
      desc: 'Ми завжди на звʼязку — допоможемо у будь-який момент.',
    },
  ]

  return (
    <section className={styles.whyUs}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Чому StudioBooker?</h2>

        <div className={styles.grid}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.card}>
              <img src={item.icon} alt={item.title} className={styles.icon} />
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
