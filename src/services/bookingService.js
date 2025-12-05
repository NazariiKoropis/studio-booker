import { db } from '../firebase/db'
import { get, ref, update, remove, push, set } from 'firebase/database'

export async function getAllBookings() {
  const bookingsRef = ref(db, 'bookings')
  const snapshot = await get(bookingsRef)
  if (!snapshot.exists()) return []

  return Object.entries(snapshot.val()).map(([id, booking]) => ({
    id,
    ...booking,
  }))
}

export async function createBooking(bookingData) {
  const bookingsRef = ref(db, 'bookings')
  const newBookingRef = push(bookingsRef)
  await set(newBookingRef, bookingData)
  return { id: newBookingRef.key, ...bookingData }
}

export async function updateBooking(id, updates) {
  if (!id) throw new Error('Booking ID is required')
  const bookingRef = ref(db, `bookings/${id}`)
  await update(bookingRef, updates)
}

export async function deleteBooking(id) {
  if (!id) throw new Error('Booking ID is required')
  const bookingRef = ref(db, `bookings/${id}`)
  await remove(bookingRef)
}
