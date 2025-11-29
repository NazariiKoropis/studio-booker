import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/common/header/Header'
import Home from '../pages/home/Home'
import Footer from '../components/common/footer/Footer'
import Studios from '../pages/Studios/Studios'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/studios" element={<Studios />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}
