import Container from '../../common/container/Container'
import styles from './TopStudios.module.scss'
import demoImage from '../../../assets/studio-booker-logo.png'
import StudioCardLarge from '../../cards/studio/large/StudioCardLarge'

export default function TopStudios() {
  const data = [
    {
      img: demoImage,
      title: 'Moon Studio1',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: true,
    },
    {
      img: demoImage,
      title: 'Moon Studio2',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
    },
    {
      img: demoImage,
      title: 'Moon Studio3',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
    },
    {
      img: demoImage,
      title: 'Moon Studio4',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
    },
  ]

  return (
    <section className={styles.topStudios}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Наші студії</h2>

        <div className={styles.studiosGrid}>
          {data.map(({ img, title, price, desc, isHotTopic }, idx) => (
            <StudioCardLarge
              key={idx}
              image={img}
              title={title}
              price={price}
              desc={desc}
              isHotTopic={isHotTopic}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
