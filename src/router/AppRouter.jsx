import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/common/header/Header'
import Home from '../pages/home/Home'
import Studios from '../pages/studios/Studios'
import About from '../pages/about/About'
import StudioDetails from '../pages/studioDetails/StudioDetails'
import Footer from '../components/common/footer/Footer'
import Auth from '../pages/auth/Auth'
import Admin from '../pages/admin/Admin'
import { RequireAdmin } from './ProtectedRoutes'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studios" element={<Studios />} />
          <Route path="/about" element={<About />} />
          <Route path="/studios/:slug" element={<StudioDetails />} />
          <Route path="/login" element={<Auth initialMode="login" />} />
          <Route path="/register" element={<Auth initialMode="register" />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <Admin />
              </RequireAdmin>
            }
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
