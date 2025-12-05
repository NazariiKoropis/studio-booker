// Підтягуємо локальні фото для студій за slug, щоб не зберігати назви у БД
const files = import.meta.glob('../assets/uploads/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
})

const imagesMap = Object.entries(files).reduce((acc, [path, url]) => {
  const match = path.match(/uploads\/([^/]+)\/[^/]+$/)
  if (!match) return acc
  const slug = match[1]
  if (!acc[slug]) acc[slug] = []
  acc[slug].push(url)
  return acc
}, {})

// Сортуємо за ім'ям файлу для передбачуваного порядку
Object.keys(imagesMap).forEach((slug) => {
  imagesMap[slug].sort((a, b) => a.localeCompare(b))
})

export function getImagesBySlug(slug) {
  return imagesMap[slug] || []
}

export function attachLocalImages(studios = []) {
  return studios.map((studio) => ({
    ...studio,
    images:
      (getImagesBySlug(studio.slug)?.length
        ? getImagesBySlug(studio.slug)
        : studio.images) || [],
  }))
}
