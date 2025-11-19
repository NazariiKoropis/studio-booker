import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/studio-booker-logo.png'
import Container from '../container/Container'
import Button from '../../ui/button/Button'

export default function Header() {
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
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/studios"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Studios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) => (isActive ? 'active' : undefined)}
              >
                Admin
              </NavLink>
            </li>
          </ul>
        </nav>

        <Button>Login</Button>
      </Container>
    </header>
  )
}
