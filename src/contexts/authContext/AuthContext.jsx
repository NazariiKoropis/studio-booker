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

const adminEmailList = (import.meta.env.VITE_ADMIN_EMAILS || '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean)

const isAdminEmail = (email) =>
  !!email && adminEmailList.includes(email.toLowerCase())

const buildProfileFromAuth = (firebaseUser) => {
  const adminFlag = isAdminEmail(firebaseUser?.email)

  return {
    name: firebaseUser?.displayName || firebaseUser?.email || 'Користувач',
    email: firebaseUser?.email || '',
    role: adminFlag ? 'admin' : 'member',
    isAdmin: adminFlag,
    createdAt: new Date().toISOString(),
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initializing, setInitializing] = useState(true)

  const enrichUser = (firebaseUser, dbUser) => {
    if (!firebaseUser) return null
    const baseProfile = dbUser || buildProfileFromAuth(firebaseUser)
    const role =
      dbUser?.role ||
      (isAdminEmail(firebaseUser.email) ? 'admin' : firebaseUser.role) ||
      baseProfile.role ||
      'member'
    const isAdmin = dbUser?.isAdmin ?? role === 'admin'
    const name =
      baseProfile.name || firebaseUser.displayName || firebaseUser.email
    return { ...firebaseUser, ...baseProfile, role, isAdmin, name }
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)
      try {
        if (firebaseUser) {
          const dbUser = await getUserFromDB(firebaseUser.uid)
          let profile = enrichUser(firebaseUser, dbUser)

          if (!dbUser) {
            const profileToSave = buildProfileFromAuth(firebaseUser)
            await saveUserToDB(firebaseUser.uid, profileToSave)
            profile = enrichUser(firebaseUser, profileToSave)
          }

          setUser(profile)
        } else {
          setUser(null)
        }
      } finally {
        setLoading(false)
        setInitializing(false)
      }
    })

    return () => unsub()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      const dbUser = await getUserFromDB(user.uid)
      let mergedUser = enrichUser(user, dbUser)

      if (!dbUser) {
        const profileToSave = buildProfileFromAuth(user)
        await saveUserToDB(user.uid, profileToSave)
        mergedUser = enrichUser(user, profileToSave)
      }

      setUser(mergedUser)
      return mergedUser
    } finally {
      setLoading(false)
    }
  }

  const register = async (name, email, password) => {
    setLoading(true)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(user, { displayName: name })

      const userData = {
        name,
        email,
        role: isAdminEmail(email) ? 'admin' : 'member',
        isAdmin: isAdminEmail(email),
        createdAt: new Date().toISOString(),
      }

      await saveUserToDB(user.uid, userData)

      const mergedUser = enrichUser(user, userData)
      setUser(mergedUser)
      return mergedUser
    } finally {
      setLoading(false)
    }
  }

  // 🚪 LOGOUT
  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!initializing && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
