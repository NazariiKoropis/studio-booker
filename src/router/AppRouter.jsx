import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/common/header/Header'
import Home from '../pages/home/Home'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
