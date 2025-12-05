import { db } from '../firebase/db'
import { get, ref, set } from 'firebase/database'

export async function saveUserToDB(userId, userData) {
  if (!userId) throw new Error('Не знайдено ID користувача')

  const userRef = ref(db, `users/${userId}`)
  await set(userRef, userData)

  return { id: userId, ...userData }
}

export async function getUserFromDB(userId) {
  if (!userId) return null

  const userRef = ref(db, `users/${userId}`)
  const snapshot = await get(userRef)

  if (!snapshot.exists()) return null

  return { id: userId, ...snapshot.val() }
}

export async function getAllUsers() {
  const usersRef = ref(db, 'users')
  const snapshot = await get(usersRef)
  if (!snapshot.exists()) return []

  return Object.entries(snapshot.val()).map(([id, user]) => ({ id, ...user }))
}
