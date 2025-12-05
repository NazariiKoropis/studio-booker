import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/authContext/AuthContext'

function LoadingFallback() {
  return <div style={{ padding: '40px 0', textAlign: 'center' }}>Завантаження...</div>
}

export function RequireAuth({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingFallback />
  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />

  return children
}

export function RequireAdmin({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return <LoadingFallback />

  if (!user)
    return <Navigate to="/login" replace state={{ from: location.pathname }} />

  if (!user.isAdmin) return <Navigate to="/" replace />

  return children
}
