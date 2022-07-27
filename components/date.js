import { parseISO, format } from 'date-fns'

export default function Date({ dateString, dateClass, hideDay = false }) {
  const date = parseISO(dateString)
  let dateFormat = ''
  if (hideDay) {
    dateFormat = 'LLLL yyyy'
  } else {
    dateFormat = 'LLLL	d, yyyy'
  }
  return <time className={dateClass} dateTime={dateString}>{format(date, dateFormat)}</time>
}
