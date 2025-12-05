import { db } from '../firebase/db'
import { get, ref, remove, update } from 'firebase/database'

export async function getAllReviews() {
  const reviewsRef = ref(db, 'reviews')
  const snapshot = await get(reviewsRef)
  if (!snapshot.exists()) return []

  return Object.entries(snapshot.val()).map(([id, review]) => ({
    id,
    ...review,
  }))
}

export async function updateReview(id, updates) {
  if (!id) throw new Error('Review ID is required')
  const reviewRef = ref(db, `reviews/${id}`)
  await update(reviewRef, updates)
}

export async function deleteReview(id) {
  if (!id) throw new Error('Review ID is required')
  const reviewRef = ref(db, `reviews/${id}`)
  await remove(reviewRef)
}
