import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import logo from '../../../assets/studio-booker-logo.png'
import Container from '../container/Container'
import Button from '../../ui/button/Button'

export default function Header() {
  return (
    <header>
      <Container>
        <div className="headerLogo">
          <img src={logo} alt="studio-booker-logo" />
        </div>
        <nav className="navBar">
          <ul className="navList">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/studies">Studies</NavLink>
            </li>
            <li>
              <NavLink to="/">About</NavLink>
            </li>
            <li>
              <NavLink to="/admin">Admin</NavLink>
            </li>
          </ul>
        </nav>

        <Button>Login</Button>
      </Container>
    </header>
  )
}
