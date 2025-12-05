import { useEffect, useMemo, useState } from 'react'
import Container from '../../components/common/container/Container'
import Button from '../../components/ui/button/Button'
import {
  getAllStudios,
  updateStudio,
  createStudio,
} from '../../services/studiosService'
import { getAllBookings, updateBooking } from '../../services/bookingService'
import { getAllUsers } from '../../services/usersService'
import { getAllReviews } from '../../services/reviewsService'
import styles from './Admin.module.scss'

const statusOptions = ['pending', 'confirmed', 'cancelled']

export default function Admin() {
  const [studios, setStudios] = useState([])
  const [bookings, setBookings] = useState([])
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const [newStudio, setNewStudio] = useState({
    name: '',
    locationCity: '',
    locationAddress: '',
    pricePerHour: '',
    capacity: '',
    rating: '',
    isHotTopic: false,
    description: '',
    email: '',
    phone: '',
    slug: '',
  })
  const [editStudioId, setEditStudioId] = useState('')
  const [editStudioData, setEditStudioData] = useState(null)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const [studiosData, bookingsData, usersData, reviewsData] =
          await Promise.all([
            getAllStudios(),
            getAllBookings(),
            getAllUsers(),
            getAllReviews(),
          ])
        setStudios(studiosData)
        setBookings(bookingsData)
        setUsers(usersData)
        setReviews(reviewsData)
      } catch (err) {
        setError(err?.message || 'Не вдалося завантажити дані')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const usersMap = useMemo(
    () =>
      users.reduce((acc, u) => {
        acc[u.id] = u
        return acc
      }, {}),
    [users]
  )

  const studiosMap = useMemo(
    () =>
      studios.reduce((acc, s) => {
        acc[s.id] = s
        return acc
      }, {}),
    [studios]
  )

  const stats = useMemo(
    () => [
      { label: 'Студії', value: studios.length },
      { label: 'Бронювання', value: bookings.length },
      { label: 'Користувачі', value: users.length },
      { label: 'Відгуки', value: reviews.length },
    ],
    [studios, bookings, users, reviews]
  )

  const handleToggleHot = async (studio) => {
    setSaving(true)
    try {
      await updateStudio(studio.id, { isHotTopic: !studio.isHotTopic })
      setStudios((prev) =>
        prev.map((s) =>
          s.id === studio.id ? { ...s, isHotTopic: !s.isHotTopic } : s
        )
      )
    } catch (err) {
      setError(err?.message || 'Не вдалося оновити студію')
    } finally {
      setSaving(false)
    }
  }

  const handleStatusChange = async (bookingId, status) => {
    setSaving(true)
    try {
      await updateBooking(bookingId, { status })
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status } : b))
      )
    } catch (err) {
      setError(err?.message || 'Не вдалося оновити бронювання')
    } finally {
      setSaving(false)
    }
  }

  const sortedBookings = useMemo(
    () =>
      [...bookings].sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      ),
    [bookings]
  )

  const topStudios = useMemo(
    () =>
      [...studios]
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 5),
    [studios]
  )

  const makeSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-zа-яіїєґ0-9\s-]/gi, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

  const handleCreateStudio = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    const payload = {
      ...newStudio,
      pricePerHour: Number(newStudio.pricePerHour) || 0,
      capacity: Number(newStudio.capacity) || 0,
      rating: Number(newStudio.rating) || 0,
      slug: newStudio.slug || makeSlug(newStudio.name),
      isHotTopic: Boolean(newStudio.isHotTopic),
      images: [],
    }

    try {
      const created = await createStudio(payload)
      setStudios((prev) => [...prev, created])
      setNewStudio({
        name: '',
        locationCity: '',
        locationAddress: '',
        pricePerHour: '',
        capacity: '',
        rating: '',
        isHotTopic: false,
        description: '',
        email: '',
        phone: '',
        slug: '',
      })
    } catch (err) {
      setError(err?.message || 'Не вдалося створити студію')
    } finally {
      setSaving(false)
    }
  }

  const handleSelectStudio = (id) => {
    setEditStudioId(id)
    const studio = studios.find((s) => s.id === id)
    if (studio) {
      setEditStudioData({
        ...studio,
        pricePerHour: studio.pricePerHour || '',
        capacity: studio.capacity || '',
        rating: studio.rating || '',
      })
    } else {
      setEditStudioData(null)
    }
  }

  const handleUpdateStudio = async (e) => {
    e.preventDefault()
    if (!editStudioId || !editStudioData) return
    setSaving(true)
    setError('')

    const updates = {
      ...editStudioData,
      pricePerHour: Number(editStudioData.pricePerHour) || 0,
      capacity: Number(editStudioData.capacity) || 0,
      rating: Number(editStudioData.rating) || 0,
      slug: editStudioData.slug || makeSlug(editStudioData.name),
      isHotTopic: Boolean(editStudioData.isHotTopic),
    }

    try {
      await updateStudio(editStudioId, updates)
      setStudios((prev) =>
        prev.map((s) => (s.id === editStudioId ? { ...s, ...updates } : s))
      )
    } catch (err) {
      setError(err?.message || 'Не вдалося оновити студію')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className={styles.adminSection}>
      <Container className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={styles.eyebrow}>Адмін-панель</p>
            <h1>Керування StudioBooker</h1>
            <p className={styles.subhead}>
              Огляд студій, бронювань та користувачів. Дані синхронізовані з
              Firebase Realtime Database.
            </p>
          </div>
          <Button
            variant="dark"
            disabled={loading || saving}
            onClick={() => window.location.reload()}
          >
            Оновити
          </Button>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <p>{stat.label}</p>
              <h3>{stat.value}</h3>
            </div>
          ))}
        </div>

        {loading ? (
          <div className={styles.loader}>Завантаження...</div>
        ) : (
          <>
            <div className={styles.panels}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Бронювання</h2>
                  <span>{bookings.length}</span>
                </div>
                <div className={styles.table}>
                  <div className={styles.tableHead}>
                    <span>Студія</span>
                    <span>Клієнт</span>
                    <span>Дата</span>
                    <span>Час</span>
                    <span>Статус</span>
                  </div>
                  {sortedBookings.map((booking) => {
                    const studio = studiosMap[booking.studioId]
                    const user = usersMap[booking.userId]
                    return (
                      <div key={booking.id} className={styles.tableRow}>
                        <span>{studio?.name || booking.studioId}</span>
                        <span>{user?.name || user?.email || booking.userId}</span>
                        <span>{booking.bookDate}</span>
                        <span>
                          {booking.startTime} · {booking.durationHours} год
                        </span>
                        <span>
                          <select
                            value={booking.status || 'pending'}
                            onChange={(e) =>
                              handleStatusChange(booking.id, e.target.value)
                            }
                            disabled={saving}
                          >
                            {statusOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Студії</h2>
                  <span>{studios.length}</span>
                </div>
                <div className={styles.table}>
                  <div className={styles.tableHead}>
                    <span>Назва</span>
                    <span>Місто</span>
                    <span>Ціна/год</span>
                    <span>Рейтинг</span>
                    <span>Hot</span>
                  </div>
                  {studios.map((studio) => (
                    <div key={studio.id} className={styles.tableRow}>
                      <span>{studio.name}</span>
                      <span>{studio.locationCity}</span>
                      <span>{studio.pricePerHour}₴</span>
                      <span>{studio.rating || '—'}</span>
                      <span>
                        <Button
                          size="sm"
                          variant={studio.isHotTopic ? 'dark' : 'primary'}
                          disabled={saving}
                          onClick={() => handleToggleHot(studio)}
                        >
                          {studio.isHotTopic ? 'Викл' : 'Вкл'}
                        </Button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.panels}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Додати студію</h2>
                </div>
                <form className={styles.form} onSubmit={handleCreateStudio}>
                  <div className={styles.formGrid}>
                    <label>
                      Назва
                      <input
                        required
                        value={newStudio.name}
                        onChange={(e) =>
                          setNewStudio((p) => ({ ...p, name: e.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Місто
                      <input
                        required
                        value={newStudio.locationCity}
                        onChange={(e) =>
                          setNewStudio((p) => ({
                            ...p,
                            locationCity: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <label>
                      Адреса
                      <input
                        required
                        value={newStudio.locationAddress}
                        onChange={(e) =>
                          setNewStudio((p) => ({
                            ...p,
                            locationAddress: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <label>
                      Ціна за год
                      <input
                        type="number"
                        min="0"
                        required
                        value={newStudio.pricePerHour}
                        onChange={(e) =>
                          setNewStudio((p) => ({
                            ...p,
                            pricePerHour: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <label>
                      Вмістимість
                      <input
                        type="number"
                        min="1"
                        required
                        value={newStudio.capacity}
                        onChange={(e) =>
                          setNewStudio((p) => ({ ...p, capacity: e.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Рейтинг
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={newStudio.rating}
                        onChange={(e) =>
                          setNewStudio((p) => ({ ...p, rating: e.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Email
                      <input
                        type="email"
                        value={newStudio.email}
                        onChange={(e) =>
                          setNewStudio((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Телефон
                      <input
                        value={newStudio.phone}
                        onChange={(e) =>
                          setNewStudio((p) => ({ ...p, phone: e.target.value }))
                        }
                      />
                    </label>
                    <label>
                      Slug
                      <input
                        value={newStudio.slug}
                        placeholder="auto з назви"
                        onChange={(e) =>
                          setNewStudio((p) => ({ ...p, slug: e.target.value }))
                        }
                      />
                    </label>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        checked={newStudio.isHotTopic}
                        onChange={(e) =>
                          setNewStudio((p) => ({ ...p, isHotTopic: e.target.checked }))
                        }
                      />
                      Hot topic
                    </label>
                  </div>
                  <label>
                    Опис
                    <textarea
                      rows="3"
                      value={newStudio.description}
                      onChange={(e) =>
                        setNewStudio((p) => ({ ...p, description: e.target.value }))
                      }
                    />
                  </label>
                  <Button type="submit" disabled={saving}>
                    Створити студію
                  </Button>
                </form>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Редагувати студію</h2>
                </div>
                <div className={styles.form}>
                  <label>
                    Оберіть студію
                    <select
                      value={editStudioId}
                      onChange={(e) => handleSelectStudio(e.target.value)}
                    >
                      <option value="">—</option>
                      {studios.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  {editStudioData && (
                    <form className={styles.form} onSubmit={handleUpdateStudio}>
                      <div className={styles.formGrid}>
                        <label>
                          Назва
                          <input
                            required
                            value={editStudioData.name}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                name: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Місто
                          <input
                            required
                            value={editStudioData.locationCity}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                locationCity: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Адреса
                          <input
                            required
                            value={editStudioData.locationAddress}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                locationAddress: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Ціна за год
                          <input
                            type="number"
                            min="0"
                            required
                            value={editStudioData.pricePerHour}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                pricePerHour: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Вмістимість
                          <input
                            type="number"
                            min="1"
                            required
                            value={editStudioData.capacity}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                capacity: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Рейтинг
                          <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            value={editStudioData.rating}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                rating: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Email
                          <input
                            type="email"
                            value={editStudioData.email || ''}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                email: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Телефон
                          <input
                            value={editStudioData.phone || ''}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                phone: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label>
                          Slug
                          <input
                            value={editStudioData.slug || ''}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                slug: e.target.value,
                              }))
                            }
                          />
                        </label>
                        <label className={styles.checkbox}>
                          <input
                            type="checkbox"
                            checked={!!editStudioData.isHotTopic}
                            onChange={(e) =>
                              setEditStudioData((p) => ({
                                ...p,
                                isHotTopic: e.target.checked,
                              }))
                            }
                          />
                          Hot topic
                        </label>
                      </div>
                      <label>
                        Опис
                        <textarea
                          rows="3"
                          value={editStudioData.description || ''}
                          onChange={(e) =>
                            setEditStudioData((p) => ({
                              ...p,
                              description: e.target.value,
                            }))
                          }
                        />
                      </label>
                      <Button type="submit" disabled={saving}>
                        Зберегти зміни
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.panels}>
              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Користувачі</h2>
                  <span>{users.length}</span>
                </div>
                <div className={styles.list}>
                  {users.map((u) => (
                    <div key={u.id} className={styles.listItem}>
                      <div>
                        <p className={styles.itemTitle}>{u.name || u.email}</p>
                        <p className={styles.itemSub}>{u.email}</p>
                      </div>
                      <span
                        className={`${styles.badge} ${
                          u.isAdmin ? styles.badgeAdmin : styles.badgeUser
                        }`}
                      >
                        {u.isAdmin ? 'Admin' : 'Member'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <h2>Топ студій</h2>
                  <span>{topStudios.length}</span>
                </div>
                <div className={styles.list}>
                  {topStudios.map((studio) => (
                    <div key={studio.id} className={styles.listItem}>
                      <div>
                        <p className={styles.itemTitle}>{studio.name}</p>
                        <p className={styles.itemSub}>
                          {studio.locationCity} · {studio.pricePerHour}₴/год
                        </p>
                      </div>
                      <span className={styles.badge}>{studio.rating || '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </section>
  )
}
