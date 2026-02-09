export function formatDate( isoDate: string,locale: string = 'cs-CZ'): string {
  return new Date(isoDate).toLocaleDateString(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}