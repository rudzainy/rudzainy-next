import { parseISO, format } from 'date-fns'

export default function Date({ dateString, dateClass }) {
  const date = parseISO(dateString)
  return <time className={dateClass} dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
