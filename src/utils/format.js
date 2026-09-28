const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/** Formatea un importe como "$32.00". */
export function formatPrice(amount) {
  return currencyFormatter.format(Number.isFinite(amount) ? amount : 0)
}

export function pluralize(count, singular, plural) {
  return `${count} ${count === 1 ? singular : plural}`
}
