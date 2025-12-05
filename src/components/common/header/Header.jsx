import styles from './Header.module.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../../assets/studio-booker-logo.png'
import Container from '../container/Container'
import Button from '../../ui/button/Button'
import { useState } from 'react'
import { useAuth } from '../../../contexts/authContext/AuthContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const isAdmin = user?.isAdmin

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    navigate('/')
  }

  const handleLoginClick = () => {
    setIsOpen(false)
    navigate('/login')
  }

  const userName = user?.displayName || user?.name || user?.email

  return (
    <header className={styles.header}>
      <Container className={styles.headerInner}>
        <div className={styles.headerLogo}>
          <img src={logo} alt="Логотип StudioBooker" />
        </div>

        <nav className={styles.navBar}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Головна
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studios"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Студії
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Про нас
              </NavLink>
            </li>
            {isAdmin && (
              <li>
                <NavLink
                  to="/admin"
                  className={({ isActive }) => (isActive ? styles.active : '')}
                >
                  Адмін
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <div className={styles.desktopLogin}>
          {user ? (
            <div className={styles.userBox}>
              <div className={styles.userName}>{userName}</div>
              <Button variant="dark" size="sm" onClick={handleLogout}>
                Вийти
              </Button>
            </div>
          ) : (
            <Button onClick={handleLoginClick}>Увійти</Button>
          )}
        </div>

        <button className={styles.burger} onClick={() => setIsOpen(true)}>
          ☰
        </button>
      </Container>

      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(false)}
      />

      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          ×
        </button>

        <NavLink to="/" onClick={() => setIsOpen(false)}>
          Головна
        </NavLink>
        <NavLink to="/studios" onClick={() => setIsOpen(false)}>
          Студії
        </NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)}>
          Про нас
        </NavLink>
        {isAdmin && (
          <NavLink to="/admin" onClick={() => setIsOpen(false)}>
            Адмін
          </NavLink>
        )}

        {user ? (
          <>
            <div className={styles.userBox}>
              <div className={styles.userName}>{userName}</div>
            </div>
            <Button fullWidth variant="dark" onClick={handleLogout}>
              Вийти
            </Button>
          </>
        ) : (
          <Button fullWidth onClick={handleLoginClick}>
            Увійти
          </Button>
        )}
      </div>
    </header>
  )
}
