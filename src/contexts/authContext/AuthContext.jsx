import { createContext, useContext, useEffect, useState } from 'react'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../../firebase/auth'
import { saveUserToDB, getUserFromDB } from '../../services/usersService'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const dbUser = await getUserFromDB(firebaseUser.uid)
        setUser({ ...firebaseUser, ...dbUser })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsub()
  }, [])

  const login = async (email, password) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password)
    return user
  }

  const register = async (name, email, password) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    await updateProfile(user, { displayName: name })

    await saveUserToDB(user.uid, {
      name,
      email,
      role: 'member',
      isAdmin: false,
      createdAt: new Date().toISOString(),
    })

    return user
  }

  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
