import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/studio-booker-logo.png'
import Container from '../container/Container'
import Button from '../../ui/button/Button'
import { useState } from 'react'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className={styles.header}>
      <Container className={styles.headerInner}>
        <div className={styles.headerLogo}>
          <img src={logo} alt="studio-booker-logo" />
        </div>

        <nav className={styles.navBar}>
          <ul className={styles.navList}>
            <li>
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studios"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Studios
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles.desktopLogin}>
          <Button onClick={() => alert('login')}>Login</Button>
        </div>

        <button className={styles.burger} onClick={() => setIsOpen(true)}>
          ☰
        </button>
      </Container>

      {/* OVERLAY */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* MOBILE MENU */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          ×
        </button>

        <NavLink to="/" onClick={() => setIsOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/studios" onClick={() => setIsOpen(false)}>
          Studios
        </NavLink>
        <NavLink to="/about" onClick={() => setIsOpen(false)}>
          About
        </NavLink>
        <NavLink to="/admin" onClick={() => setIsOpen(false)}>
          Admin
        </NavLink>

        <Button fullWidth onClick={() => setIsOpen(false)}>
          Login
        </Button>
      </div>
    </header>
  )
}
