import { useParams } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import {
  getStudioBySlug,
  getStudioReviews,
} from '../../services/studiosService'
import Gallery from '../../components/studioDetails/gallery/Gallery'
import StudioInfo from '../../components/studioDetails/studioInfo/StudioInfo'
import StudioFeatures from '../../components/studioDetails/studioFeatures/StudioFeatures'
import BookingForm from '../../components/studioDetails/bookingForm/BookingForm'
import Reviews from '../../components/studioDetails/reviews/Reviews'
import styles from './StudioDetails.module.scss'

export default function StudioDetails() {
  const { slug } = useParams()
  const [studio, setStudio] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  const formatLocation = useMemo(
    () => (city, address) => [city, address].filter(Boolean).join(', '),
    []
  )

  useEffect(() => {
    async function load() {
      setLoading(true)

      try {
        const s = await getStudioBySlug(slug)
        if (!s) {
          setStudio(null)
          setReviews([])
          return
        }

        const r = await getStudioReviews(s.id)

        const resolvedImages = (s.images || []).map(
          (img) =>
            new URL(`../../assets/studios/${s.slug}/${img}`, import.meta.url)
              .href
        )

        setStudio({
          ...s,
          images: resolvedImages,
          location: formatLocation(s.locationCity, s.locationAddress),
        })
        setReviews(r)
      } catch (error) {
        console.error('Не вдалося завантажити дані студії', error)
        setStudio(null)
        setReviews([])
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [slug, formatLocation])

  if (loading) return <p className={styles.loading}>Завантаження...</p>
  if (!studio) return <p className={styles.loading}>Студію не знайдено.</p>

  return (
    <div className={styles.page}>
      <Gallery images={studio.images} />
      <div className={styles.sections}>
        <StudioInfo studio={studio} />
        <StudioFeatures studio={studio} />
        <BookingForm studioId={studio.id} price={studio.pricePerHour} />
        <Reviews reviews={reviews} />
      </div>
    </div>
  )
}
