import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import Container from '../../components/common/container/Container'
import Input from '../../components/ui/input/Input'
import Button from '../../components/ui/button/Button'
import { useAuth } from '../../contexts/authContext/AuthContext'
import styles from './Auth.module.scss'

export default function Auth({ initialMode = 'login' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const deriveMode = useMemo(
    () =>
      location.pathname.includes('register') ? 'register' : initialMode || 'login',
    [initialMode, location.pathname]
  )

  const [mode, setMode] = useState(deriveMode)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setMode(deriveMode)
    setError('')
    setFormData((prev) => ({ ...prev, password: '' }))
  }, [deriveMode])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    setError('')
    setFormData({ name: '', email: '', password: '' })
    navigate(nextMode === 'login' ? '/login' : '/register', { replace: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      if (mode === 'login') {
        await login(formData.email.trim(), formData.password)
      } else {
        await register(
          formData.name.trim(),
          formData.email.trim(),
          formData.password
        )
      }
      navigate('/')
    } catch (err) {
      setError(err?.message || 'Сталася помилка. Спробуйте ще раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const canSubmit =
    formData.email.trim() &&
    formData.password.trim() &&
    (mode === 'login' || formData.name.trim())

  return (
    <section className={styles.authSection}>
      <Container className={styles.authContainer}>
        <div className={styles.card}>
          <div className={styles.tabs}>
            <button
              type="button"
              className={clsx(styles.tab, mode === 'login' && styles.activeTab)}
              onClick={() => switchMode('login')}
              disabled={isSubmitting}
            >
              Увійти
            </button>
            <button
              type="button"
              className={clsx(
                styles.tab,
                mode === 'register' && styles.activeTab
              )}
              onClick={() => switchMode('register')}
              disabled={isSubmitting}
            >
              Зареєструватися
            </button>
          </div>

          <div className={styles.heading}>
            <h1>{mode === 'login' ? 'Повертаєтесь?' : 'Створіть акаунт'}</h1>
            <p>
              {mode === 'login'
                ? 'Увійдіть, щоб бронювати студії та керувати своїми записами.'
                : 'Заповніть форму нижче, щоб бронювати студії та залишати відгуки.'}
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {mode === 'register' && (
              <Input
                label="Імʼя"
                name="name"
                placeholder="Ваше імʼя"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                autoComplete="name"
              />
            )}

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              fullWidth
              autoComplete="email"
            />

            <Input
              label="Пароль"
              name="password"
              type="password"
              placeholder="Мінімум 6 символів"
              value={formData.password}
              onChange={handleChange}
              required
              fullWidth
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />

            {error && <div className={styles.error}>{error}</div>}

            <Button
              type="submit"
              fullWidth
              disabled={!canSubmit || isSubmitting}
              size="lg"
            >
              {mode === 'login' ? 'Увійти' : 'Зареєструватися'}
            </Button>
          </form>

          <div className={styles.helper}>
            {mode === 'login' ? (
              <>
                <span>Ще немає акаунту?</span>
                <button type="button" onClick={() => switchMode('register')}>
                  Зареєструйтесь
                </button>
              </>
            ) : (
              <>
                <span>Вже маєте акаунт?</span>
                <button type="button" onClick={() => switchMode('login')}>
                  Увійти
                </button>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
