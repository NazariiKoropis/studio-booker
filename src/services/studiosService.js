import { db } from '../firebase/db'
import { ref, get, set, update, remove, push } from 'firebase/database'

export async function getAllStudios() {
  const studiosRef = ref(db, 'studios')
  const snapshot = await get(studiosRef)

  if (!snapshot.exists()) return []

  const data = snapshot.val()

  return Object.entries(data).map(([id, studio]) => ({
    id,
    ...studio,
  }))
}

export async function getStudioBySlug(slug) {
  const studios = await getAllStudios()
  return studios.find((s) => s.slug === slug) || null
}

export async function getStudioReviews(studioId) {
  if (!studioId) return []

  const reviewsRef = ref(db, 'reviews')
  const snapshot = await get(reviewsRef)

  if (!snapshot.exists()) return []

  const data = snapshot.val()

  return Object.entries(data)
    .map(([id, review]) => ({ id, ...review }))
    .filter((review) => review.studioId === studioId)
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
}

export async function createStudio(studioData) {
  const studiosRef = ref(db, 'studios')
  const newStudioRef = push(studiosRef)

  await set(newStudioRef, studioData)

  return {
    id: newStudioRef.key,
    ...studioData,
  }
}

export async function updateStudio(id, updates) {
  const studioRef = ref(db, `studios/${id}`)
  await update(studioRef, updates)
}

export async function deleteStudio(id) {
  const studioRef = ref(db, `studios/${id}`)
  await remove(studioRef)
}
