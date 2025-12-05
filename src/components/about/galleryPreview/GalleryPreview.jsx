import styles from './GalleryPreview.module.scss'
import Container from '../../common/container/Container'

import img1 from '../../../assets/studios/moon-studio/1.jpg'
import img2 from '../../../assets/studios/moon-studio/2.jpg'
import img3 from '../../../assets/studios/moon-studio/3.jpg'

export default function GalleryPreview() {
  const images = [img1, img2, img3]

  return (
    <section className={styles.gallery}>
      <Container className={styles.inner}>
        <h2 className={styles.title}>Наші фотостудії</h2>

        <div className={styles.grid}>
          {images.map((src, idx) => (
            <div key={idx} className={styles.item}>
              <img src={src} alt={`studio-${idx}`} loading="lazy" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
