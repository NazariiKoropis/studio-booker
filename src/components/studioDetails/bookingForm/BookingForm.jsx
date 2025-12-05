import styles from './BookingForm.module.scss'
import Container from '../../common/container/Container'
import Button from '../../ui/button/Button'
import Input from '../../ui/input/Input'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext/AuthContext'
import { createBooking } from '../../../services/bookingService'

export default function BookingForm({ studioId, price }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [people, setPeople] = useState(1)
  const [note, setNote] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const totalPrice = Number(duration || 0) * Number(price || 0)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!user) {
      navigate('/login', { state: { from: location.pathname } })
      return
    }

    if (!date || !time || !studioId) {
      setError('Заповніть дату, час та оберіть студію.')
      return
    }

    setLoading(true)
    try {
      const booking = {
        userId: user.uid,
        studioId,
        customerPhone: user.phoneNumber || '',
        bookDate: date,
        startTime: time,
        durationHours: Number(duration) || 1,
        peopleCount: Number(people) || 1,
        totalPrice: totalPrice || 0,
        note,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }

      await createBooking(booking)
      setSuccess('Бронювання відправлено. Очікуйте підтвердження.')
      setDate('')
      setTime('')
      setDuration(1)
      setPeople(1)
      setNote('')
    } catch (err) {
      setError(err?.message || 'Не вдалося створити бронювання')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className={styles.booking}>
      <Container>
        <h2 className={styles.title}>Забронювати студію</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Дата"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <Input
            label="Час"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <Input
            label="Тривалість (години)"
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />

          <Input
            label="Кількість людей"
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            required
          />

          <Input
            label="Коментар / побажання"
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Опишіть деталі зйомки (необовʼязково)"
          />

          <div className={styles.total}>
            <span>Разом</span>
            <strong>{totalPrice || 0} ₴</strong>
          </div>

          {error && <div className={styles.error}>{error}</div>}
          {success && <div className={styles.success}>{success}</div>}

          <Button type="submit" variant="primary" size="md" disabled={loading}>
            {user ? 'Забронювати' : 'Увійти для бронювання'}
          </Button>
        </form>
      </Container>
    </section>
  )
}
