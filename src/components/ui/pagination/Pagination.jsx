import styles from './Pagination.module.scss'
import clsx from 'clsx'

export default function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className={styles.pagination}>
      <button
        className={clsx(styles.btn, { [styles.disabled]: currentPage === 1 })}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={clsx(styles.btn, {
            [styles.active]: currentPage === page,
          })}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className={clsx(styles.btn, {
          [styles.disabled]: currentPage === totalPages,
        })}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
      >
        &gt;
      </button>
    </div>
  )
}
