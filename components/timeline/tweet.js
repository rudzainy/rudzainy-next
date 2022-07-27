import Date from '../date'
import TweetEmbed from 'react-tweet-embed'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '../../node_modules/@fortawesome/fontawesome-svg-core/import.macro'


export default function Tweet({ id, date }) {
  return (                
    <li className="mb-10 ml-6">
      <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-sky-500 rounded-full ring-8 ring-white">
        <FontAwesomeIcon icon={solid('dove')} className="w-3 text-white" />
      </span>
      <Date dateString={date} dateClass="block pt-1 mb-2 text-sm font-normal leading-none text-gray-400" />
      <TweetEmbed tweetId={id} options={{conversation: 'none', cards: 'hidden'}} />
    </li>
  )
}
