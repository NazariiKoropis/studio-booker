import Container from '../../common/container/Container'
import styles from './TopStudios.module.scss'
import StudioCard from '../../cards/studio/StudioCard'

export default function TopStudios() {
  const data = [
    {
      img: '1.jpg',
      slug: 'moon-studio',
      title: 'Moon Studio1',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: true,
    },
    {
      img: '2.jpg',
      slug: 'moon-studio',
      title: 'Moon Studio2',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
    },
    {
      img: '3.jpg',
      slug: 'moon-studio',
      title: 'Moon Studio3',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
    },
    {
      img: '1.jpg',
      slug: 'moon-studio',
      title: 'Moon Studio4',
      price: 100,
      desc: 'Modern photo studio with natural light.',
      isHotTopic: false,
    },
  ]

  //TODO add ANIMATION WITH USE EFFECT
  return (
    <section className={styles.topStudios}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Наші студії</h2>

        <div className={styles.studiosGrid}>
          {data.map(({ img, slug, title, price, desc, isHotTopic }, idx) => (
            <StudioCard
              key={idx}
              image={img}
              slug={slug}
              title={title}
              price={price}
              desc={desc}
              isHotTopic={isHotTopic}
              onClick={() => alert(`${title} is opening...`)}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
