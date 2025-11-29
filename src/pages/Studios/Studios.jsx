import styles from './Studios.module.scss'
import Hero from '../../components/studios/hero/Hero'
import StudiosFilter from '../../components/studios/studiosFilter/StudiosFilter'
import Container from '../../components/common/container/Container'

export default function Studios() {
  return (
    <div className={styles.studios}>
      <Hero />
      <section className={styles.content}>
        <Container>
          <div className="layout">
            <StudiosFilter />
          </div>
        </Container>
      </section>
    </div>
  )
}
