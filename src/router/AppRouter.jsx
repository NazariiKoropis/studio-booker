import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/common/header/Header'
import Home from '../pages/home/Home'
import Footer from '../components/common/footer/Footer'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  )
}
