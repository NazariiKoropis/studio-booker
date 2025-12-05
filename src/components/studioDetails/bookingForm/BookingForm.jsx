import styles from './BookingForm.module.scss'
import Container from '../../common/container/Container'
import Button from '../../ui/button/Button'
import Input from '../../ui/input/Input'

import { useState } from 'react'

export default function BookingForm({ studioId, price }) {
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [people, setPeople] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Бронювання буде реалізоване пізніше (Firebase)')
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
          />
          <Input
            label="Час"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <Input
            label="Тривалість (години)"
            type="number"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <Input
            label="Кількість людей"
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />

          <Button type="submit" variant="primary" size="md">
            Забронювати
          </Button>
        </form>
      </Container>
    </section>
  )
}
